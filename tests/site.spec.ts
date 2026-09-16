import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

// contrast is judged on the settled page, not on a frame of an entrance animation
async function settle(page: Page) {
  await page.evaluate(() => Promise.all(document.getAnimations()
    .filter(animation => animation.effect?.getComputedTiming().iterations !== Infinity)
    .map(animation => animation.finished.catch(() => undefined))));
}

const routes = [{ locale:"en",path:"/" }, {locale:"kk",path:"/kk/"}, {locale:"ru",path:"/ru/"}];
for (const route of routes) {
  test(route.locale + " renders accessible complete content", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto(route.path);
    await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
    await expect(page.locator("h1")).toContainText("Datathon");
    await expect(page.locator(".track-card")).toHaveCount(2);
    await expect(page.locator(".days li")).toHaveCount(3);
    await expect(page.locator("details")).toHaveCount(4);
    await expect(page.locator(".gallery-rail li")).toHaveCount(5);
    await expect(page.locator(".past-partners img")).toHaveCount(7);
    await expect(page.locator("form")).toHaveCount(0);
    for (const summary of await page.locator("summary").all()) await summary.click();
    await settle(page);
    const audit = await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();
    expect(audit.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}
test("the photo rail follows page scroll when motion is allowed", async ({ page }, info) => {
  test.skip(info.project.name === "mobile", "touch screens keep the swipeable rail");
  await page.emulateMedia({reducedMotion:"no-preference"});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/");
  const shift = () => page.locator(".gallery-rail ul").evaluate(el => Math.round(parseFloat(getComputedStyle(el).translate) || 0));
  await page.locator("#community").scrollIntoViewIfNeeded();
  await expect(page.locator(".gallery-rail")).toHaveAttribute("data-linked","true");
  await expect(page.locator(".gallery-controls")).toHaveCount(0);
  const before = await shift();
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect.poll(shift).toBeLessThan(before);
});
test("touch screens can swipe the photo rail", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "needs a touch device");
  await page.emulateMedia({reducedMotion:"no-preference"});
  await page.goto("/");
  const rail = page.locator(".gallery-rail");
  await rail.scrollIntoViewIfNeeded();
  await expect(rail).not.toHaveAttribute("data-linked");
  await rail.evaluate(el => el.scrollBy({left: 400, behavior: "instant"}));
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeGreaterThan(100);
});
test("phones step through the languages with one button", async ({ page }) => {
  await page.setViewportSize({width:360,height:780});
  await page.goto("/");
  await expect(page.locator(".language-switcher")).toBeHidden();
  const button = page.locator(".language-cycle");
  for (const [label, next] of [["EN","/kk/"],["ҚАЗ","/ru/"],["РУС","/"]] as const) {
    await expect(button).toHaveText(label);
    await button.click();
    await expect.poll(() => new URL(page.url()).pathname).toBe(next);
  }
});
test("section labels ship scrambled and decode when the section arrives", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"no-preference"});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/");
  const label = page.locator("#value .eyebrow");
  // the screen-reader copy always carries the real label, whatever the visible text is doing
  await expect(label.locator(".sr-only")).toHaveText("01 / WHAT YOU GET");
  expect(await label.locator("[aria-hidden]").textContent()).not.toBe("01 / WHAT YOU GET");
  await page.locator("#value").scrollIntoViewIfNeeded();
  await expect.poll(() => label.textContent()).toBe("01 / WHAT YOU GET");
});
test("reduced motion leaves section labels alone", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  await expect(page.locator("#value .eyebrow")).toHaveText("01 / WHAT YOU GET");
  await expect(page.locator("#value .eyebrow .sr-only")).toHaveCount(0);
});
test("every photograph has a localized description", async ({ page }) => {
  await page.goto("/ru/");
  const alts = await page.locator(".gallery-rail img, .team-shot img").evaluateAll(els => els.map(el => (el as HTMLImageElement).alt));
  expect(alts.length).toBe(6);
  for (const alt of alts) expect(alt.trim().length).toBeGreaterThan(8);
});
test("the photo rail advances and rewinds when motion is reduced", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/");
  const rail = page.locator(".gallery-rail");
  await expect(rail).toHaveJSProperty("scrollLeft", 0);
  await page.getByRole("button", {name:"Next photos"}).click();
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeGreaterThan(200);
  await page.getByRole("button", {name:"Previous photos"}).click();
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBe(0);
});
test("language links open the translated page at the top", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/#packages");
  await page.locator("header").getByRole("link", {name:"Қазақша",exact:true}).click();
  await expect(page).toHaveURL(/\/kk\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang","kk");
  expect(await page.evaluate(() => Math.round(window.scrollY))).toBe(0);
  await page.locator("header").getByRole("link", {name:"Русский",exact:true}).click();
  await expect(page).toHaveURL(/\/ru\/$/);
});
test("both marks ease back to rest when the cursor leaves", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"no-preference"});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/");
  for (const [target, part, prop] of [["header .mark","i","translate"],[".hero-mark",".gdg-pulse","scale"]] as const) {
    const mark = page.locator(target);
    const box = (await mark.boundingBox())!;
    const read = () => mark.locator(part).first().evaluate((el, key) => ({
      value: getComputedStyle(el)[key as never] as string, running: el.getAnimations().length,
    }), prop);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await expect.poll(() => mark.evaluate(el => el.dataset.spin)).toBe("true");
    await page.waitForTimeout(1400);
    await page.mouse.move(box.x + 600, box.y + 420);
    // the loop is off but a short animation is still carrying it home
    await expect.poll(() => mark.evaluate(el => el.dataset.spin)).toBeUndefined();
    expect((await read()).running).toBeGreaterThan(0);
    await expect.poll(async () => (await read()).running, {timeout: 3000}).toBe(0);
    expect((await read()).value).toBe("none");
  }
});
test("the cursor can knock a drifting shape out of its place", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"no-preference"});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/");
  const shape = page.locator(".drifters span").first();
  const at = () => shape.evaluate(el => el.getBoundingClientRect().left);
  await expect.poll(at).toBeGreaterThan(0);
  const before = await at();
  const box = (await shape.boundingBox())!;
  for (let i = 0; i < 12; i++) await page.mouse.move(box.x - 40 + i * 8, box.y + box.height / 2);
  await expect.poll(at, {timeout: 4000}).toBeGreaterThan(before + 12);
});
test("the header keeps its width when the language changes", async ({ page }) => {
  await page.setViewportSize({width:1440,height:1000});
  const box = async (path: string) => {
    await page.goto(path);
    return page.locator(".header-cta").evaluate(el => Math.round(el.getBoundingClientRect().width));
  };
  const widths = [await box("/"), await box("/kk/"), await box("/ru/")];
  expect(new Set(widths).size).toBe(1);
});
test("navigation lands the section heading just under the sticky header", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/");
  const header = await page.locator(".site-header").evaluate(el => Math.round(el.getBoundingClientRect().height));
  for (const id of ["value","event","packages","community"]) {
    await page.locator(`.primary-nav a[href="#${id}"]`).click();
    // the heading is what the reader looks for, not the section box and its top padding
    const top = await page.locator(`#${id} .eyebrow`).first()
      .evaluate(el => Math.round(el.getBoundingClientRect().top));
    expect(top, `${id} heading below header`).toBeGreaterThanOrEqual(header);
    expect(top, `${id} heading close to header`).toBeLessThan(header + 50);
  }
});
test("the wordmark returns to the very top of the page", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 3000));
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(3000);
  await page.locator("header .wordmark").click();
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(0);
});
test("keyboard can skip navigation and operate packages", async ({ page, browserName }) => {
  await page.goto("/");
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  const summary = page.locator("summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open","");
  await page.keyboard.press("Space");
  await expect(page.locator("details").first()).not.toHaveAttribute("open","");
});
test("reduced motion and no-JavaScript preserve the whole experience", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled:false, reducedMotion:"reduce" });
  const page = await context.newPage();
  await page.goto(baseURL + "/kk/");
  await expect(page.locator("html")).toHaveAttribute("lang","kk");
  await expect(page.locator(".days li").last()).toBeVisible();
  await expect(page.locator(".gallery-rail li").first()).toBeVisible();
  await page.locator("summary").first().click();
  await expect(page.locator(".package-content").first()).toBeVisible();
  await expect(page.locator("footer .footer-contacts a").first()).toBeVisible();
  await expect(page.locator(".drifters span")).toHaveCount(15);
  await context.close();
});
test("reduced motion stops animations and smooth scrolling", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  const result = await page.evaluate(() => ({
    scroll:getComputedStyle(document.documentElement).scrollBehavior,
    running:document.getAnimations().filter(a=>a.playState==="running").length,
  }));
  expect(result).toEqual({scroll:"auto",running:0});
});
test("native scrolling advances the programme and plays entrance motion", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"no-preference"});
  await page.goto("/");
  await page.locator("#event").scrollIntoViewIfNeeded();
  await expect(page.locator(".track-diagram")).toHaveAttribute("data-visible","true");
  await page.locator("#packages").scrollIntoViewIfNeeded();
  await expect(page.locator(".days li").last()).toHaveAttribute("data-active","true");
});
test("all locales fit narrow, tablet, and desktop screens", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "viewport sweep runs once");
  await page.emulateMedia({reducedMotion:"reduce"});
  for (const {path,locale} of routes) {
    for (const width of [320,390,768,1024,1440]) {
      await page.setViewportSize({width,height:1000});
      await page.goto(path);
      for (const summary of await page.locator("summary").all()) await summary.click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), `${locale} at ${width}px`).toBeLessThanOrEqual(0);
      const clipped = await page.locator("h1,h2,h3,p,summary,.button,.text-link").evaluateAll(els => els.filter(el => el.clientWidth && el.scrollWidth > el.clientWidth + 2).map(el=>el.textContent));
      expect(clipped, `${locale} at ${width}px`).toEqual([]);
      if (width === 390 || width === 1440) {
        await page.locator("summary").evaluateAll(els => els.forEach(el=>el.parentElement?.removeAttribute("open")));
        await page.screenshot({path:info.outputPath(locale+"-"+width+".png"),fullPage:true});
      }
    }
  }
});
test("security headers and static endpoints enforce the intended boundary", async ({ request }) => {
  const response = await request.get("/");
  const headers = response.headers();
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["content-security-policy"]).toContain("form-action 'none'");
  const scriptPolicy = headers["content-security-policy"].split(";").find(item=>item.trim().startsWith("script-src"))!;
  expect(scriptPolicy).toContain("'sha256-");
  expect(scriptPolicy).not.toContain("'unsafe-inline'");
  expect(scriptPolicy).not.toContain("'unsafe-eval'");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect((await request.post("/")).status()).toBe(405);
  expect((await request.get("/.env")).status()).toBe(404);
  expect((await request.get("/missing-page/")).status()).toBe(404);
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect((await request.get("/og.png")).headers()["content-type"]).toBe("image/png");
  expect((await request.get("/events/team.webp")).headers()["content-type"]).toBe("image/webp");
});
