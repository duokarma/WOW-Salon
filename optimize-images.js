import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');

async function optimizeImages() {
  const files = fs.readdirSync(publicDir);
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

  console.log(`Found ${imageFiles.length} images to optimize.`);

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(publicDir, `${basename}.webp`);

    try {
      const metadata = await sharp(inputPath).metadata();
      
      let pipeline = sharp(inputPath);
      
      // Resize oversized images
      if (metadata.width > 1920) {
        pipeline = pipeline.resize(1920, null, { withoutEnlargement: true });
      }

      await pipeline
        .webp({ quality: 80, effort: 4 })
        .toFile(outputPath);
      
      console.log(`Optimized: ${file} -> ${basename}.webp`);
      
      // Remove original file
      fs.unlinkSync(inputPath);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
  console.log('Image optimization complete.');
}

optimizeImages();
