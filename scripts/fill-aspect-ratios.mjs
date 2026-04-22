#!/usr/bin/env node
/**
 * Reads every image under assets/ (skipping assets/Portfolio/) and emits a
 * JSON map { "assets/path/to/file.jpg": 1.777 } to stdout.
 *
 * Usage (run from repo root):
 *   node scripts/fill-aspect-ratios.mjs
 *   node scripts/fill-aspect-ratios.mjs > aspect-ratios.json
 *
 * No npm dependencies — uses only Node built-ins.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);
const ASSETS_ROOT = 'assets';

// ── Dimension parsers ─────────────────────────────────────────────────────────

function parsePng(buf) {
  // Signature: 8 bytes. IHDR data: offset 16 = width (4 BE), 20 = height (4 BE).
  if (buf.length < 24) return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

function parseGif(buf) {
  // Header: 6 bytes. Logical screen: offset 6 = width (2 LE), 8 = height (2 LE).
  if (buf.length < 10) return null;
  return { w: buf.readUInt16LE(6), h: buf.readUInt16LE(8) };
}

function parseWebp(buf) {
  // RIFF(4) + size(4) + WEBP(4) + chunk FourCC(4) = 20 bytes minimum before data.
  if (buf.length < 30) return null;
  const chunk = buf.slice(12, 16).toString('ascii');

  if (chunk === 'VP8 ') {
    // Lossy VP8 bitstream. After 10-byte VP8 chunk header:
    // offset 26–27: width-with-scale (LE 16-bit, bits 0–13 = display width)
    // offset 28–29: height-with-scale (LE 16-bit, bits 0–13 = display height)
    return {
      w: buf.readUInt16LE(26) & 0x3FFF,
      h: buf.readUInt16LE(28) & 0x3FFF,
    };
  }

  if (chunk === 'VP8L') {
    // Lossless. Byte 20 = 0x2F signature. Bytes 21–24: packed bits.
    // bits 0–13 = width - 1, bits 14–27 = height - 1.
    const bits = buf.readUInt32LE(21);
    return { w: (bits & 0x3FFF) + 1, h: ((bits >> 14) & 0x3FFF) + 1 };
  }

  if (chunk === 'VP8X') {
    // Extended. Bytes 24–26: canvas width - 1 (24-bit LE).
    //           Bytes 27–29: canvas height - 1 (24-bit LE).
    const w = (buf[24] | (buf[25] << 8) | (buf[26] << 16)) + 1;
    const h = (buf[27] | (buf[28] << 8) | (buf[29] << 16)) + 1;
    return { w, h };
  }

  return null;
}

function parseJpeg(buf) {
  if (buf.length < 2 || buf[0] !== 0xFF || buf[1] !== 0xD8) return null;

  let i = 2;
  while (i < buf.length - 1) {
    if (buf[i] !== 0xFF) { i++; continue; }
    while (i < buf.length && buf[i] === 0xFF) i++; // skip padding FFs
    if (i >= buf.length) break;

    const marker = buf[i++];

    if (marker === 0xD9) break; // EOI
    if (marker === 0xD8 || (marker >= 0xD0 && marker <= 0xD7)) continue; // standalone

    if (i + 2 > buf.length) break;
    const segLen = buf.readUInt16BE(i); // includes these 2 bytes

    // SOF markers: C0–CF, excluding DHT(C4), JPG(C8), DAC(CC)
    if (marker >= 0xC0 && marker <= 0xCF &&
        marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC) {
      // i+2 = precision, i+3..i+4 = height, i+5..i+6 = width
      if (i + 7 > buf.length) break;
      return { w: buf.readUInt16BE(i + 5), h: buf.readUInt16BE(i + 3) };
    }

    i += segLen;
  }
  return null;
}

function getDimensions(filePath) {
  const ext = extname(filePath).toLowerCase();
  try {
    const buf = readFileSync(filePath);
    if (ext === '.png')                    return parsePng(buf);
    if (ext === '.gif')                    return parseGif(buf);
    if (ext === '.webp')                   return parseWebp(buf);
    if (ext === '.jpg' || ext === '.jpeg') return parseJpeg(buf);
  } catch {
    // fall through
  }
  return null;
}

// ── File walker ───────────────────────────────────────────────────────────────

function walk(dir, isRoot = false) {
  const results = [];
  for (const entry of readdirSync(dir).sort()) {
    if (isRoot && entry === 'Portfolio') continue; // skip legacy dump
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walk(full));
    } else if (IMAGE_EXTS.has(extname(entry).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

// ── Main ──────────────────────────────────────────────────────────────────────

const files = walk(ASSETS_ROOT, true);
const output = {};

for (const file of files) {
  const dims = getDimensions(file);
  if (dims && dims.w > 0 && dims.h > 0) {
    const key = file.replace(/\\/g, '/');
    output[key] = Math.round((dims.w / dims.h) * 1000) / 1000;
  } else {
    process.stderr.write(`WARN: could not read dimensions for ${file}\n`);
  }
}

process.stdout.write(JSON.stringify(output, null, 2) + '\n');
