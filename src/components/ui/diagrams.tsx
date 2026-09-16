export function SplitPath() {
  return <svg className="split-path" viewBox="0 0 1000 100" fill="none" aria-hidden="true" preserveAspectRatio="none">
    <path className="split-base" d="M500 0V28Q500 46 482 46H260Q240 46 240 66V100M500 28Q500 46 518 46H740Q760 46 760 66V100" />
    <path className="split-highlight" data-draw d="M500 0V28Q500 46 482 46H260Q240 46 240 66V100M500 28Q500 46 518 46H740Q760 46 760 66V100" />
  </svg>;
}

export function ValueIcon({ index }: { index: number }) {
  const paths = [
    <g key="pipeline"><circle cx="17" cy="16" r="7" /><path d="M6 42v-3a11 11 0 0 1 22 0v3" /><rect x="30" y="8" width="18" height="14" rx="3" /><path d="m35 13 3 2-3 2M40 17h4" /></g>,
    <g key="case"><path d="M20 8a11 11 0 0 1 6 20v4h-12v-4a11 11 0 0 1 6-20ZM15 38h10" /><rect x="34" y="12" width="12" height="9" rx="2" /><rect x="34" y="28" width="12" height="9" rx="2" /><path d="M27 20h7M27 30h7" /></g>,
    <g key="brand"><path d="M10 10h20v16H18l-6 6v-6h-2V10Z" /><path d="m30 30 14 6-6 2-2 6-6-14Z" /><path d="M40 12v6M44 15h-6" /></g>,
  ];
  return <svg aria-hidden="true" viewBox="0 0 54 54" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[index]}</svg>;
}
