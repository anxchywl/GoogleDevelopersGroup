import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { copy } from "../src/content/copy";

// contrast is judged on the settled page, not on a frame of an entrance animation
async function settle(page: Page) {
  await page.evaluate(() => Promise.all(document.getAnimations()
    .filter(animation => animation.effect?.getComputedTiming().iterations !== Infinity)
    .map(animation => animation.finished.catch(() => undefined))));
}
async function expectChapterBrand(page: Page) {
  await expect(page.locator("header .wordmark-text b")).toHaveText("GDG on Campus");
  await expect(page.locator("header .wordmark-text small")).toHaveText("Nazarbayev University, Astana");
}

const datathonRoutes = [{ locale:"en",path:"/datathon/" }, {locale:"kk",path:"/kk/datathon/"}, {locale:"ru",path:"/ru/datathon/"}] as const;
const routes = [{ locale:"en",path:"/" }, {locale:"kk",path:"/kk/"}, {locale:"ru",path:"/ru/"}] as const;
const jamsRoutes = [{ locale:"en",path:"/jams/" }, {locale:"kk",path:"/kk/jams/"}, {locale:"ru",path:"/ru/jams/"}] as const;
for (const route of datathonRoutes) {
  test(route.locale + " renders accessible complete content", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto(route.path);
    await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
    await expectChapterBrand(page);
    await expect(page.locator("h1")).toContainText("Datathon");
    await expect(page.locator(".track-card")).toHaveCount(2);
    await expect(page.locator(".days li")).toHaveCount(2);
    await expect(page.locator(".dot-0")).toHaveText(/1\s?024/u);
    await expect(page.locator(".dot-1")).toHaveText("987");
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
const eventsRoutes = routes.map((route) => ({ ...route, event:`${route.path}datathon/`, jams:`${route.path}jams/` }));
for (const route of eventsRoutes) {
  test(route.locale + " event hub links to both event pages", async ({ page }) => {
    await page.goto(route.path);
    await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
    await expectChapterBrand(page);
    await expect(page.locator("header .wordmark")).toHaveAttribute("href", "#top");
    await expect(page.locator("header .primary-nav")).toHaveCount(0);
    await expect(page.locator(".hub-card")).toHaveCount(2);
    await expect(page.locator(".hub-card-datathon")).toHaveAttribute("href", route.event);
    await expect(page.locator(".hub-card-jams")).toHaveAttribute("href", route.jams);
    const archiveLabel = page.locator(".history-head .eyebrow");
    await expect.poll(() => archiveLabel.textContent()).toBe(copy[route.locale].hub.history.eyebrow);
    await expect(page.locator(".history-head")).toHaveAttribute("data-visible", "true");
    const titleOverlapsCards = await page.evaluate(() => {
      if (!window.matchMedia("(min-width: 961px)").matches) return false;
      const title = document.querySelector(".hub-intro h1");
      const cards = document.querySelector(".hub-list");
      if (!title || !cards) return true;
      const range = document.createRange();
      range.selectNodeContents(title);
      const textRight = Math.max(...Array.from(range.getClientRects(), rect => rect.right));
      return textRight > cards.getBoundingClientRect().left;
    });
    expect(titleOverlapsCards).toBe(false);
    await settle(page);
    const audit = await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();
    expect(audit.violations).toEqual([]);
    await page.locator("header .wordmark").click();
    await expect(page).toHaveURL(route.path);
  });
}

test("event history shows the full archive and its controls move the rail", async ({ page }) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/");
  const rail = page.locator(".history-rail");
  const cards = rail.locator(".history-card");
  await expect(cards).toHaveCount(10);
  await expect(cards.locator("img")).toHaveCount(10);
  await expect(cards.locator("img").first()).toHaveAttribute("alt", /.+/);
  await expect(page.getByRole("heading", {name:"Moments from our events"})).toBeVisible();
  await expectChapterBrand(page);
  await expect(page.locator(".history-controls")).toBeVisible();
  const before = await rail.evaluate(el => el.scrollLeft);
  await page.getByRole("button", {name:"Next events"}).click();
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeGreaterThan(before);
});

test("channel actions use a compact Telegram label in every language", async ({ page }) => {
  for (const route of eventsRoutes) {
    await page.goto(route.path);
    const action = page.locator(".header-cta-channel");
    await expect(action).toHaveText("Telegram");
    await expect(action.locator(".brand-icon")).toHaveCount(0);
    await expect(action).toHaveAttribute("aria-label", copy[route.locale].hub.headerCta);
    expect(await action.evaluate(element => element.getBoundingClientRect().width)).toBeLessThan(180);
  }
  for (const route of jamsRoutes) {
    await page.goto(route.path);
    const action = page.locator(".header-cta-channel");
    await expect(action).toHaveText("Telegram");
    await expect(action.locator(".brand-icon")).toHaveCount(0);
    await expect(action).toHaveAttribute("aria-label", copy[route.locale].jams.headerCta);
    expect(await action.evaluate(element => element.getBoundingClientRect().width)).toBeLessThan(180);
  }
});

test("the event hub remains within the viewport on phones", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "viewport overflow is already covered in the mobile project");
  await page.goto("/");
  await expect(page.locator(".history-card")).toHaveCount(10);
  await expect(page.locator(".site-header")).toHaveCSS("border-bottom-width", "0px");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});

for (const route of jamsRoutes) {
  test(route.locale + " jams page renders accessible complete content", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto(route.path);
    await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
    await expectChapterBrand(page);
    await expect(page.locator("h1")).toContainText("Google Jams");
    await expect(page.locator(".jam-hero-where")).toContainText(copy[route.locale].jams.nextAnnouncement);
    await expect(page.locator(".jam-hero-where")).not.toContainText("Last jam");
    await expect(page.locator("#next .ticket-completed .ticket-status")).toHaveText(copy[route.locale].jams.completed);
    await expect(page.locator("#next .ticket-completed .ticket-day")).toHaveText("22");
    await expect(page.locator("#next .ticket-completed .ticket-month")).toContainText("2026");
    await expect(page.locator("#next .ticket-completed")).not.toContainText("18:00");
    await expect(page.locator("#next .ticket-upcoming .ticket-tba")).toHaveText("TBA");
    await expect(page.locator("#next .ticket-upcoming .ticket-status")).toHaveText(copy[route.locale].jams.upcomingLabel);
    await expect(page.locator("#next .ticket-upcoming")).toContainText(copy[route.locale].jams.nextBody);
    await expect(page.locator(".timebar > div")).toHaveCount(4);
    await expect(page.locator(".jury-sheet tbody tr")).toHaveCount(5);
    await expect(page.locator(".bingo input[type=checkbox]")).toHaveCount(9);
    await expect(page.locator(".ticket")).toHaveCount(2);
    await expect(page.locator(".jam-ticker, .case-file, .rules")).toHaveCount(0);
    await expect(page.locator("header .wordmark .gdg-mark, footer .wordmark .gdg-mark, .split-badge .gdg-mark")).toHaveCount(3);
    await expect(page.locator(".compare tbody tr")).toHaveCount(4);
    await expect(page.locator("#students, #professors")).toHaveCount(2);
    await expect(page.locator("form")).toHaveCount(0);
    await settle(page);
    const audit = await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();
    expect(audit.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}
test("language links keep the reader on the jams page", async ({ page }) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/jams/");
  await page.locator("header").getByRole("link", {name:"Русский",exact:true}).click();
  await expect(page).toHaveURL(/\/ru\/jams\/$/);
  await expect(page.locator("h1")).toContainText("Google Jams");
  await page.locator("footer").getByRole("link", {name:"Google Datathon"}).click();
  await expect(page).toHaveURL(/\/ru\/datathon\/$/);
});
test("jams nav and hero buttons land on their sections", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/jams/");
  const header = await page.locator(".site-header").evaluate(el => Math.round(el.getBoundingClientRect().height));
  for (const id of ["about","format","join","next"]) {
    await page.locator(`.primary-nav a[href="#${id}"]`).click();
    const top = await page.locator(`#${id} .eyebrow`).first().evaluate(el => Math.round(el.getBoundingClientRect().top));
    expect(top, `${id} heading below header`).toBeGreaterThanOrEqual(header);
    expect(top, `${id} heading close to header`).toBeLessThan(header + 50);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator(".hero-actions a[href='#professors']").click();
  const card = await page.locator("#professors").evaluate(el => Math.round(el.getBoundingClientRect().top));
  expect(card).toBeGreaterThanOrEqual(header);
});
test("without javascript the bingo card still calls a line and the puzzle shows the finished function", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled:false, reducedMotion:"reduce" });
  const page = await context.newPage();
  await page.goto(baseURL + "/kk/jams/");
  await expect(page.locator(".bingo-win")).toHaveCSS("opacity", "0");
  for (const i of [0, 4, 8]) await page.locator(`.bingo-cell.b${i}`).click();
  await expect(page.locator(".bingo-cell.b4 input")).toBeChecked();
  await expect(page.locator(".bingo-win")).toHaveCSS("opacity", "1");
  await expect(page.locator(".puzzle-board .puzzle-line")).toHaveCount(6);
  await expect(page.locator(".puzzle-board .puzzle-line").first()).toHaveText("def count_vowels(text):");
  await context.close();
});
test("section labels decode cleanly on the jams page", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"no-preference"});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/jams/");
  for (const id of ["about","format","join","next"]) {
    const label = page.locator(`#${id} .eyebrow`).first();
    await label.evaluate(el => el.scrollIntoView({ block: "center" }));
    await expect.poll(() => label.textContent()).toBe(await label.getAttribute("data-text"));
  }
});
test("the header and footer carry the chapter mark on both pages", async ({ page }) => {
  for (const path of ["/datathon/", "/jams/"]) {
    await page.goto(path);
    await expect(page.locator("header .wordmark .gdg-mark")).toHaveCount(1);
    await expect(page.locator("footer .wordmark .gdg-mark")).toHaveCount(1);
    await expect(page.locator("footer")).not.toContainText("Next jam");
  }
  await page.goto("/datathon/");
  await expect(page.locator(".hero .gdg-mark.hero-mark")).toHaveCount(1);
});
test("blocks below the fold wait hidden and the time bar grows from empty", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"no-preference"});
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/jams/");
  const bar = page.locator(".timebar");
  await expect(bar).toHaveAttribute("data-pending", "true");
  await expect(bar).toHaveCSS("opacity", "0");
  await bar.scrollIntoViewIfNeeded();
  await expect(bar).toHaveAttribute("data-arrive", "true");
  // the first segment must start small, not flash full before it grows
  const scale = await bar.locator(".timebar-seg").first().evaluate(el => getComputedStyle(el).scale);
  expect(scale).not.toMatch(/^(none|1)$/);
  await expect.poll(() => bar.locator(".timebar-seg").last().evaluate(el => getComputedStyle(el).scale), {timeout: 4000}).toMatch(/^(none|1)$/);
  await expect(bar).toHaveCSS("opacity", "1");
});
test("section links leave the address alone so a reload stays in place", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/jams/");
  await page.locator('.primary-nav a[href="#format"]').click();
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBeGreaterThan(500);
  expect(new URL(page.url()).hash).toBe("");
  await page.evaluate(() => window.scrollBy(0, 700));
  const before = await page.evaluate(() => Math.round(window.scrollY));
  await page.reload();
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(before);
});
test("an old section hash neither steals a reload nor stays in the address", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/jams/#format");
  // an arrival link still lands on its section, then the hash is dropped
  await expect.poll(() => page.locator("#format .eyebrow").first().evaluate(el => Math.round(el.getBoundingClientRect().top))).toBeLessThan(200);
  await expect.poll(() => new URL(page.url()).hash).toBe("");
  await page.evaluate(() => window.scrollTo({ top: 3200, behavior: "instant" }));
  await page.reload();
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(3200);
  // a tab that still carries a hash from before keeps its place on reload too
  await page.evaluate(() => history.replaceState(null, "", "#format"));
  await page.evaluate(() => window.scrollTo({ top: 2400, behavior: "instant" }));
  await page.reload();
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(2400);
});
test("the two warm-up cards share one height on wide screens", async ({ page }) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/jams/");
  const heights = await page.locator(".game").evaluateAll(els => els.map(el => Math.round(el.getBoundingClientRect().height)));
  expect(new Set(heights).size).toBe(1);
});
test("the code puzzle only accepts the next line and says when it runs", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/jams/");
  const pool = page.locator(".puzzle-pool button");
  await expect(pool).toHaveCount(6);
  await pool.filter({ hasText: "return total" }).click();
  await expect(page.locator(".puzzle-board .placed")).toHaveCount(0);
  for (const line of ["def count_vowels(text):", "total = 0", "for ch in text.lower():", "if ch in \"aeiou\":", "total += 1", "return total"]) {
    await pool.filter({ hasText: line }).first().click();
  }
  await expect(page.locator(".puzzle")).toHaveAttribute("data-solved", "true");
  await expect(page.locator(".puzzle-foot .micro")).toHaveText("It runs.");
  await page.getByRole("button", { name: "Shuffle again" }).click();
  await expect(pool).toHaveCount(6);
});
test("the photo rail follows page scroll when motion is allowed", async ({ page }, info) => {
  test.skip(info.project.name === "mobile", "touch screens keep the swipeable rail");
  await page.emulateMedia({reducedMotion:"no-preference"});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/datathon/");
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
  await page.goto("/datathon/");
  const rail = page.locator(".gallery-rail");
  await rail.scrollIntoViewIfNeeded();
  await expect(rail).not.toHaveAttribute("data-linked");
  await rail.evaluate(el => el.scrollBy({left: 400, behavior: "instant"}));
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeGreaterThan(100);
});
test("phones keep the shapes in the opening section and let a finger carry one", async ({ browser, baseURL }, info) => {
  test.skip(info.project.name !== "desktop", "raw touch input needs Chromium; runs once");
  const context = await browser.newContext({ viewport:{width:360,height:780}, hasTouch:true, isMobile:true, reducedMotion:"no-preference" });
  const page = await context.newPage();
  await page.goto(baseURL + "/datathon/");
  const shapes = page.locator(".drifters span:visible");
  await expect(shapes).toHaveCount(9);
  const top = () => shapes.first().evaluate(el => el.getBoundingClientRect().top + window.scrollY);
  const home = await top();
  await page.evaluate(() => window.scrollTo(0, 2000));
  // the shape scrolls away with the page instead of following the screen
  await expect.poll(top).toBeLessThan(home + 60);
  await page.evaluate(() => window.scrollTo(0, 0));
  const box = (await shapes.first().boundingBox())!;
  const x = box.x + box.width / 2, y = box.y + box.height / 2;
  const client = await context.newCDPSession(page);
  const touch = (type: "touchStart" | "touchMove" | "touchEnd", px: number, py: number) => client.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x: px, y: py }] });
  await touch("touchStart", x, y);
  for (let i = 1; i <= 10; i++) { await touch("touchMove", x + i * 4, y + i * 30); await page.waitForTimeout(16); }
  await page.waitForTimeout(100);
  expect(await page.evaluate(() => window.scrollY)).toBeLessThan(40);
  expect(await top()).toBeGreaterThan(home + 150);
  await touch("touchEnd", 0, 0);
  await context.close();
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
  await page.goto("/datathon/");
  const label = page.locator("#value .eyebrow");
  // the screen-reader copy always carries the real label, whatever the visible text is doing
  await expect(label.locator(".sr-only")).toHaveText("01 / WHAT YOU GET");
  expect(await label.locator("[aria-hidden]").textContent()).not.toBe("01 / WHAT YOU GET");
  await page.locator("#value").scrollIntoViewIfNeeded();
  await expect.poll(() => label.textContent()).toBe("01 / WHAT YOU GET");
});
test("reduced motion leaves section labels alone", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/datathon/");
  await expect(page.locator("#value .eyebrow")).toHaveText("01 / WHAT YOU GET");
  await expect(page.locator("#value .eyebrow .sr-only")).toHaveCount(0);
});
test("every photograph has a localized description", async ({ page }) => {
  await page.goto("/ru/datathon/");
  const alts = await page.locator(".gallery-rail img, .team-shot img").evaluateAll(els => els.map(el => (el as HTMLImageElement).alt));
  expect(alts.length).toBe(6);
  for (const alt of alts) expect(alt.trim().length).toBeGreaterThan(8);
});
test("the photo rail advances and rewinds when motion is reduced", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/datathon/");
  const rail = page.locator(".gallery-rail");
  await expect(rail).toHaveJSProperty("scrollLeft", 0);
  await page.getByRole("button", {name:"Next photos"}).click();
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeGreaterThan(200);
  await page.getByRole("button", {name:"Previous photos"}).click();
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBe(0);
});
test("language links open the translated page at the top", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/datathon/#packages");
  await page.locator("header").getByRole("link", {name:"Қазақша",exact:true}).click();
  await expect(page).toHaveURL(/\/kk\/datathon\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang","kk");
  expect(await page.evaluate(() => Math.round(window.scrollY))).toBe(0);
  await page.locator("header").getByRole("link", {name:"Русский",exact:true}).click();
  await expect(page).toHaveURL(/\/ru\/datathon\/$/);
});
test("both marks ease back to rest when the cursor leaves", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"no-preference"});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/datathon/");
  for (const [target, part, prop] of [["header .gdg-mark",".gdg-pulse","scale"],[".hero-mark",".gdg-pulse","scale"]] as const) {
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
  await page.goto("/datathon/");
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
test("the Datathon header uses a compact localized email action", async ({ page }) => {
  await page.setViewportSize({width:1440,height:1000});
  for (const route of datathonRoutes) {
    await page.goto(route.path);
    const action = page.locator(".header-cta-email");
    await expect(action).toHaveText(copy[route.locale].emailCta);
    await expect(action).toHaveAttribute("href", /^mailto:/);
    const size = await action.evaluate(element => ({
      width: Math.round(element.getBoundingClientRect().width),
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
    }));
    expect(size.width).toBeGreaterThanOrEqual(148);
    expect(size.scrollWidth).toBeLessThanOrEqual(size.clientWidth);
    expect(size.scrollHeight).toBeLessThanOrEqual(size.clientHeight);
  }
});
test("language controls use text without a filled background", async ({ page }) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/");
  await expect(page.locator(".language-switcher")).toHaveCSS("border-width", "0px");
  await expect(page.locator(".language-switcher a[aria-current=page]")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await page.setViewportSize({width:390,height:844});
  await expect(page.locator(".language-cycle")).toHaveCSS("border-width", "0px");
  await expect(page.locator(".language-cycle")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
});
test("navigation lands the section heading just under the sticky header", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto("/datathon/");
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
test("the event page wordmark returns to the event hub", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/datathon/");
  await page.evaluate(() => window.scrollTo(0, 3000));
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(3000);
  await page.locator("header .wordmark").click();
  await expect(page).toHaveURL("/");
  await expect(page.locator("h1")).toContainText("GDG");
});
test("the chapter identity stays visible in the sticky header", async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto("/datathon/");
  await expectChapterBrand(page);
  await page.evaluate(() => window.scrollTo(0, 1200));
  await expect.poll(() => page.locator(".site-header").evaluate(element => Math.round(element.getBoundingClientRect().top))).toBe(0);
  await expect(page.locator(".site-header .wordmark-text b")).toBeVisible();
});
test("keyboard can skip navigation and operate packages", async ({ page, browserName }) => {
  await page.goto("/datathon/");
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
  await page.goto(baseURL + "/kk/datathon/");
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
  await page.goto("/datathon/");
  const result = await page.evaluate(() => ({
    scroll:getComputedStyle(document.documentElement).scrollBehavior,
    running:document.getAnimations().filter(a=>a.playState==="running").length,
  }));
  expect(result).toEqual({scroll:"auto",running:0});
});
test("native scrolling advances the programme and plays entrance motion", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"no-preference"});
  await page.goto("/datathon/");
  await page.locator("#event").scrollIntoViewIfNeeded();
  await expect(page.locator(".track-diagram")).toHaveAttribute("data-visible","true");
  await page.locator("#packages").scrollIntoViewIfNeeded();
  await expect(page.locator(".days li").last()).toHaveAttribute("data-active","true");
});
test("all locales fit narrow, tablet, and desktop screens", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "viewport sweep runs once");
  await page.emulateMedia({reducedMotion:"reduce"});
  for (const {path,locale} of [...routes, ...datathonRoutes, ...jamsRoutes]) {
    for (const width of [320,390,768,1024,1440]) {
      await page.setViewportSize({width,height:1000});
      await page.goto(path);
      for (const summary of await page.locator("summary").all()) await summary.click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), `${locale} at ${width}px`).toBeLessThanOrEqual(0);
      const clipped = await page.locator("h1,h2,h3,p,summary,.button,.text-link").evaluateAll(els => els.filter(el => el.clientWidth && el.scrollWidth > el.clientWidth + 2).map(el=>el.textContent));
      expect(clipped, `${locale} at ${width}px`).toEqual([]);
      if (width === 390 || width === 1440) {
        await page.locator("summary").evaluateAll(els => els.forEach(el=>el.parentElement?.removeAttribute("open")));
        await page.screenshot({path:info.outputPath(path.replaceAll("/","_")+"-"+width+".png"),fullPage:true});
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
