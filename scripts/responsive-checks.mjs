import { chromium, devices } from 'playwright';
import fs from 'fs';

const VIEWPORTS = [
  { name: 'desktop-1440',   width: 1440, height: 900  },
  { name: 'tablet-land',    width: 1024, height: 768  },
  { name: 'tablet-port',    width: 820,  height: 1180 },
  { name: 'phone-large',    width: 414,  height: 896  },
  { name: 'phone-mid',      width: 390,  height: 844  },
  { name: 'phone-small',    width: 360,  height: 800  },
];

const URL = process.env.URL || 'http://localhost:8080';
const OUT = 'screenshots';

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${OUT}/${vp.name}-landing.png`, fullPage: true });

  // Scroll into the first project to capture the project layout too
  await page.evaluate(() => document.querySelector('section')?.scrollIntoView());
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/${vp.name}-project.png`, fullPage: false });

  await ctx.close();
  console.log(`✓ ${vp.name}`);
}
await browser.close();