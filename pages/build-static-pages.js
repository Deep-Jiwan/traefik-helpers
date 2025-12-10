#!/usr/bin/env node
/**
 * Build script to generate standalone static HTML files for each error code
 * React Router's prerender already creates /404/index.html, /500/index.html, etc.
 * This script copies them to the root as 404.html, 500.html, etc. for easy access
 * and maintains backward compatibility with direct file serving.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Error codes to generate pages for
const ERROR_CODES = ['401', '403', '404', '405', '500', '502', '503'];
const BUILD_DIR = path.join(__dirname, 'build', 'client');

/**
 * Copy prerendered page to root as standalone file
 */

function copyErrorPage(errorCode) {
  try {
    const sourceDir = path.join(BUILD_DIR, errorCode);
    const sourceFile = path.join(sourceDir, 'index.html');
    const targetFile = path.join(BUILD_DIR, `${errorCode}.html`);

    if (!fs.existsSync(sourceFile)) {
      throw new Error(`Prerendered page not found: ${sourceFile}`);
    }

    let html = fs.readFileSync(sourceFile, 'utf-8');

    // Inject error code into window object for JavaScript compatibility
    // This ensures if React Router hydration doesn't work, we still have the code
    const injection = `
      <script>
        window.__ERROR_CODE__ = '${errorCode}';
      </script>
    `;

    // Insert before closing body tag
    html = html.replace('</body>', injection + '\n</body>');

    fs.writeFileSync(targetFile, html, 'utf-8');
    console.log(`✓ Generated ${errorCode}.html from prerendered page`);

  } catch (error) {
    console.error(`✗ Failed to process ${errorCode}:`, error.message);
    throw error;
  }
}

/**
 * Copy root index.html as index.html (for /)
 */
function copyRootIndex() {
  try {
    const sourceFile = path.join(BUILD_DIR, 'index.html');
    const targetFile = path.join(BUILD_DIR, 'index.html');
    if (!fs.existsSync(sourceFile)) {
      throw new Error(`Root index.html not found: ${sourceFile}`);
    }
    // Optionally, you could modify the HTML here if needed
    fs.copyFileSync(sourceFile, targetFile);
    console.log('✓ Copied root index.html');
  } catch (error) {
    console.error('✗ Failed to copy root index.html:', error.message);
    throw error;
  }
}

/**
 * Main build function
 */
async function buildStaticPages() {
  console.log('📄 Generating standalone error page files...\n');

  try {
    // Verify build directory exists
    if (!fs.existsSync(BUILD_DIR)) {
      throw new Error(`Build directory not found: ${BUILD_DIR}`);
    }


    // Copy root index.html
    copyRootIndex();

    // Copy each prerendered error page to root as {code}.html
    for (const code of ERROR_CODES) {
      copyErrorPage(code);
    }

    console.log(`\n✅ Successfully generated index.html and ${ERROR_CODES.length} standalone error files`);
    console.log(`📁 Output directory: ${BUILD_DIR}`);
    console.log(`\nStandalone error pages created:`);
    ERROR_CODES.forEach(code => {
      console.log(`   - /${code}.html`);
    });
    console.log(`\nPrerendered directory pages (for SPA routing):`);
    ERROR_CODES.forEach(code => {
      console.log(`   - /${code}/index.html`);
    });

  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run the build
buildStaticPages();

