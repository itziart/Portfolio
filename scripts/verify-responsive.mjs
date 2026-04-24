/**
 * Responsive verification script.
 * 1. No horizontal scroll at any viewport
 * 2. Key tap targets meet HIG 44×44 minimum on mobile
 */
import { chromium } from 'playwright';

const VIEWPORTS = [
  { name: 'desktop-1440',   width: 1440, height: 900  },
  { name: 'tablet-land',    width: 1024, height: 768  },
  { name: 'tablet-port',    width: 820,  height: 1180 },
  { name: 'phone-large',    width: 414,  height: 896  },
  { name: 'phone-mid',      width: 390,  height: 844  },
  { name: 'phone-small',    width: 360,  height: 800  },
];

const MOBILE_SELECTORS = [
  { sel: '.site-nav__link', label: 'nav link', checkHeight: true },
  { sel: '.back-to-top',    label: 'back-to-top btn', checkWidth: true, checkHeight: true },
  // Hero tool pills are hidden on phones (display:none) to avoid overlapping
  // the Show More button; they remain visible on tablet/desktop.
];

const URL = process.env.URL || 'http://localhost:8080';

const browser = await chromium.launch();
let allPassed = true;

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });

  // 1. Horizontal scroll check
  const hScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  if (hScroll) {
    const overflowW = await page.evaluate(() => document.documentElement.scrollWidth);
    console.error(`❌ [${vp.name}] Horizontal overflow: scrollWidth=${overflowW} > innerWidth=${vp.width}`);
    allPassed = false;
  } else {
    console.log(`✓ [${vp.name}] No horizontal scroll`);
  }

  // 2. Touch-target audit (only on viewports ≤ 767px)
  if (vp.width <= 767) {
    // Scroll into first project section to ensure hero tools are rendered
    await page.evaluate(() => document.querySelector('main section')?.scrollIntoView());
    await page.waitForTimeout(300);

    for (const { sel, label, checkWidth = true, checkHeight = true } of MOBILE_SELECTORS) {
      const targets = await page.$$(sel);
      if (targets.length === 0) {
        console.warn(`  ⚠ [${vp.name}] No elements found for "${sel}" (${label})`);
        continue;
      }
      // Check the first visible element
      for (const el of targets) {
        const box = await el.boundingBox();
        if (!box) continue; // invisible
        const wOk = !checkWidth  || box.width  >= 44;
        const hOk = !checkHeight || box.height >= 44;
        if (!wOk || !hOk) {
          console.error(`  ❌ [${vp.name}] ${label} (${sel}) too small: ${box.width.toFixed(0)}×${box.height.toFixed(0)}`);
          allPassed = false;
        } else {
          console.log(`  ✓ [${vp.name}] ${label}: ${box.width.toFixed(0)}×${box.height.toFixed(0)}`);
        }
        break; // check only first match per selector
      }
    }
  }

  await ctx.close();
}

await browser.close();

if (allPassed) {
  console.log('\n✅ All checks passed.');
  process.exit(0);
} else {
  console.log('\n❌ Some checks failed — see above.');
  process.exit(1);
}
