/**
 * convert-to-webp.mjs
 *
 * Converts all PNG/JPG images under public/images/ to WebP.
 * - Backs up originals to public/images/_originals/ (preserving directory structure)
 * - Uses lossless WebP by default; falls back to lossy q90 if lossless is larger
 * - Deletes the original raster file after successful conversion
 *
 * Usage:  node scripts/convert-to-webp.mjs
 */

import sharp from 'sharp';
import { readdir, stat, mkdir, copyFile, unlink, access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(PROJECT_ROOT, 'public', 'images');
const BACKUP_DIR = path.join(IMAGES_DIR, '_originals');

const EXTENSIONS = /\.(png|jpe?g)$/i;
const LOSSY_QUALITY = 90;

// ── Helpers ─────────────────────────────────────────────────────────

async function findImages(dir) {
    const results = [];
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === '_originals') continue; // skip backup dir
            results.push(...await findImages(full));
        } else if (EXTENSIONS.test(entry.name)) {
            results.push(full);
        }
    }
    return results;
}

async function ensureDir(dir) {
    await mkdir(dir, { recursive: true });
}

async function fileExists(p) {
    try { await access(p); return true; } catch { return false; }
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
    const images = await findImages(IMAGES_DIR);

    if (images.length === 0) {
        console.log('No PNG/JPG images found under public/images/.');
        return;
    }

    console.log(`Found ${images.length} raster images.\n`);
    console.log(
        'File'.padEnd(50),
        'Original'.padEnd(12),
        'WebP'.padEnd(12),
        'Method'.padEnd(10),
        'Saving'
    );
    console.log('-'.repeat(100));

    let totalOriginal = 0;
    let totalWebp = 0;
    let converted = 0;
    let skipped = 0;
    const warnings = [];

    for (const imgPath of images) {
        const rel = path.relative(IMAGES_DIR, imgPath);
        const webpPath = imgPath.replace(EXTENSIONS, '.webp');

        // Skip if .webp already exists (idempotent re-runs)
        if (await fileExists(webpPath)) {
            console.log(`  SKIP  ${rel} (webp already exists)`);
            skipped++;
            continue;
        }

        const origStat = await stat(imgPath);
        const origSize = origStat.size;

        // 1. Back up original (only if not already backed up)
        const backupPath = path.join(BACKUP_DIR, rel);
        if (!await fileExists(backupPath)) {
            await ensureDir(path.dirname(backupPath));
            await copyFile(imgPath, backupPath);
        }

        // 2. Try lossless first
        const losslessBuf = await sharp(imgPath).webp({ lossless: true }).toBuffer();

        let finalBuf, method;

        if (losslessBuf.length <= origSize) {
            finalBuf = losslessBuf;
            method = 'lossless';
        } else {
            finalBuf = await sharp(imgPath).webp({ quality: LOSSY_QUALITY }).toBuffer();
            method = `lossy q${LOSSY_QUALITY}`;
        }

        // 3. Write .webp file
        await sharp(finalBuf).toFile(webpPath);

        // 4. Delete original (graceful — warn on failure, don't crash)
        try {
            await unlink(imgPath);
        } catch (err) {
            warnings.push(`Could not delete ${rel}: ${err.code} (file may be locked)`);
        }

        const saving = ((1 - finalBuf.length / origSize) * 100).toFixed(1);
        const origKB = (origSize / 1024).toFixed(1);
        const webpKB = (finalBuf.length / 1024).toFixed(1);

        console.log(
            rel.padEnd(50),
            `${origKB} KB`.padEnd(12),
            `${webpKB} KB`.padEnd(12),
            method.padEnd(10),
            `${saving}%`
        );

        totalOriginal += origSize;
        totalWebp += finalBuf.length;
        converted++;
    }

    console.log('-'.repeat(100));
    if (converted > 0) {
        const totalOrigKB = (totalOriginal / 1024).toFixed(1);
        const totalWebpKB = (totalWebp / 1024).toFixed(1);
        const totalSaving = ((1 - totalWebp / totalOriginal) * 100).toFixed(1);
        console.log(
            'TOTAL'.padEnd(50),
            `${totalOrigKB} KB`.padEnd(12),
            `${totalWebpKB} KB`.padEnd(12),
            ''.padEnd(10),
            `${totalSaving}%`
        );
    }

    console.log(`\n✅ Converted: ${converted}  |  Skipped: ${skipped}  |  Originals in public/images/_originals/`);

    if (warnings.length > 0) {
        console.log('\n⚠ Warnings:');
        warnings.forEach(w => console.log(`  ${w}`));
        console.log('  → You can manually delete these after stopping the dev server.');
    }
}

main().catch(err => {
    console.error('❌ Conversion failed:', err);
    process.exit(1);
});
