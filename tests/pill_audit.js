// In-page audit of the header (string spliced into page.evaluate): every title block with a status pill —
// the pill on the title row only beside a whole title, its label whole or its dot alone (≤ 200 px: dot alone),
// nothing of the title block below the banner's ground strip or outside the banner.
const pillAudit = (r, width, pillSel, nameSel, groundSel, bannerSel = ".banner") => {
  const res = [];
  const shown = (e) => e && e.getClientRects().length && getComputedStyle(e).visibility !== "hidden";
  const cut = (e) => [e, ...e.querySelectorAll("*")].some((x) => shown(x) && x.clientWidth > 1 && getComputedStyle(x).overflow !== "visible" && x.scrollWidth > x.clientWidth + 1);
  const pills = [...r.querySelectorAll(pillSel)].filter(shown);
  if (!pills.length) return ["no pill"];
  for (const pill of pills) {
    const pb = pill.getBoundingClientRect();
    const dot = pb.width < 30;
    if (width <= 200 && !dot) res.push(`pill "${pill.textContent.trim()}" not a dot at ${width}px`);
    if (!dot && cut(pill)) res.push(`pill "${pill.textContent.trim()}" label cut`);
    const name = pill.parentElement.querySelector(nameSel) || pill.closest(".titles")?.querySelector(nameSel);
    if (shown(name)) {
      const nb = name.getBoundingClientRect();
      const onRow = Math.abs(pb.top + pb.height / 2 - (nb.top + nb.height / 2)) < nb.height / 2;
      const range = document.createRange();
      range.selectNodeContents(name);
      if (onRow && range.getBoundingClientRect().width > nb.width + 0.01) res.push(`title "${name.textContent.trim()}" ellipsised beside the pill`);
    }
    const banner = pill.closest(bannerSel);
    if (!banner) continue;
    const bb = banner.getBoundingClientRect();
    const floor = banner.querySelector(groundSel)?.getBoundingClientRect().top ?? bb.bottom;
    const block = pill.closest(".titles") || pill.parentElement;
    for (const x of [block, ...block.children, ...block.querySelectorAll(":scope > .trow > *")]) {
      if (!shown(x)) continue;
      const xb = x.getBoundingClientRect();
      if (!xb.width || !xb.height) continue;
      if (xb.bottom > floor + 0.5 || xb.top < bb.top - 0.5 || xb.right > bb.right + 0.5 || xb.left < bb.left - 0.5) {
        res.push(`${x.className || x.tagName} outside the banner above its ground strip`);
        break;
      }
    }
  }
  return res;
};
