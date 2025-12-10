import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Error codes to generate
const errorCodes = ['401', '403', '404', '405', '500', '502', '503'];

// Error data
const errors = {
  '404': {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist or has been moved.',
    troubleshooting: [
      'Check the URL for typos or mistakes',
      'Verify that the service is running and properly registered with Traefik',
      'Check your router configuration to ensure the path matches the request',
      'Review Traefik logs for routing decisions',
      'Ensure the backend service is healthy and responding'
    ]
  },
  '405': {
    title: 'Method Not Allowed',
    description: 'The HTTP method used is not supported for this endpoint.',
    troubleshooting: [
      'Verify you are using the correct HTTP method (GET, POST, PUT, DELETE, etc.)',
      'Check the API documentation for allowed methods',
      'Review your router configuration for method restrictions',
      'Ensure middleware is not blocking the request method',
      'Check if CORS settings are properly configured'
    ]
  },
  '500': {
    title: 'Internal Server Error',
    description: 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
    troubleshooting: [
      'Check backend service logs for error details',
      'Verify the backend service is running and healthy',
      'Review Traefik logs for any middleware errors',
      'Check for resource constraints (memory, CPU, disk space)',
      'Verify database connections and external dependencies'
    ]
  },
  '502': {
    title: 'Bad Gateway',
    description: 'Traefik received an invalid response from the upstream server.',
    troubleshooting: [
      'Verify the backend service is running',
      'Check if the backend service is listening on the correct port',
      'Review backend service health checks',
      'Ensure network connectivity between Traefik and backend',
      'Check for timeout configurations that may be too short'
    ]
  },
  '503': {
    title: 'Service Unavailable',
    description: 'The service is temporarily unavailable, possibly due to maintenance or overload.',
    troubleshooting: [
      'Check if the service is under maintenance',
      'Verify backend service availability and health',
      'Review rate limiting and circuit breaker configurations',
      'Check if maximum connection limits have been reached',
      'Monitor service load and scale if necessary'
    ]
  },
  '401': {
    title: 'Unauthorized',
    description: 'Authentication is required and has failed or has not been provided.',
    troubleshooting: [
      'Verify authentication credentials are correct',
      'Check if authentication tokens have expired',
      'Review authentication middleware configuration',
      'Ensure proper headers are being sent (Authorization, API keys, etc.)',
      'Check if the authentication service is reachable'
    ]
  },
  '403': {
    title: 'Forbidden',
    description: 'You do not have permission to access this resource.',
    troubleshooting: [
      'Verify you have the necessary permissions',
      'Check authorization middleware configuration',
      'Review access control lists (ACLs) and IP whitelist/blacklist',
      'Ensure your role or group has proper access rights',
      'Check for CORS policy restrictions'
    ]
  }
};

// Read the built assets
const buildDir = path.join(__dirname, 'build/client');
const publicDir = path.join(__dirname, 'public');

async function getBuiltAssets() {
  const assetsDir = path.join(buildDir, 'assets');
  
  let cssContent = '';
  
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    
    // Read CSS only
    const cssFile = files.find(f => f.endsWith('.css'));
    if (cssFile) {
      cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8');
    }
  }
  
  return { cssContent };
}

function generateHTML(errorCode, cssContent) {
  const errorData = errors[errorCode] || errors['404'];
  
  const troubleshootingHTML = errorData.troubleshooting
    .map(tip => `<li class="flex items-start gap-3 text-sm" style="color: hsla(0, 0%, 100%, 0.74);">
      <span class="mt-1 flex-shrink-0 text-[#2aa2c1] font-bold">•</span>
      <span>${tip}</span>
    </li>`)
    .join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${errorCode} Error</title>
    <meta name="description" content="Error ${errorCode} response page" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" />
    <style>
      ${cssContent}
    </style>
  </head>
  <body>
    <div class="min-h-screen flex flex-col bg-[#081727]">
      <!-- Header with Logo -->
      <header class="absolute top-0 right-0 p-8">
        <svg width="48" height="48" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="55" stroke="#2aa2c1" stroke-width="3" fill="none"/>
          <path d="M60 25 L60 65 M60 75 L60 80" stroke="#2aa2c1" stroke-width="6" stroke-linecap="round"/>
          <circle cx="60" cy="60" r="35" stroke="#2aa2c1" stroke-width="2" fill="none" opacity="0.3"/>
          <text x="60" y="95" text-anchor="middle" fill="#2aa2c1" font-family="Arial, sans-serif" font-size="14" font-weight="bold">LOGO</text>
        </svg>
      </header>

      <!-- Main Content -->
      <main class="flex-1 flex items-center justify-center px-4">
        <div class="max-w-2xl w-full bg-[#1e2b39] rounded-xl border border-[#2f3d4d] p-6 shadow-md">
          <!-- Error Code - Big and Centered -->
          <div class="text-center mb-6">
            <h1 
              class="font-bold mb-4 text-[#2aa2c1]"
              style="font-size: 8rem; line-height: 1"
            >
              ${errorCode}
            </h1>
            <h2 class="text-2xl font-bold text-white mb-2">
              ${errorData.title}
            </h2>
            <p class="text-sm" style="color: hsla(0, 0%, 100%, 0.74)">
              ${errorData.description}
            </p>
          </div>

          <!-- Troubleshooting Section -->
          <div class="mt-8 border-t border-[#2f3d4d] pt-6">
            <button
              id="troubleshoot-toggle"
              class="w-full flex items-center justify-center gap-2 text-lg font-semibold text-[#2aa2c1] transition-colors hover:text-[#238a9f] focus:outline-none"
            >
              <span>Troubleshooting</span>
              <span id="arrow" class="w-5 h-5 transition-transform duration-200">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
            </button>

            <!-- Troubleshooting List -->
            <div
              id="content"
              class="overflow-hidden transition-all duration-200 max-h-0"
            >
              <ul class="space-y-3">
                ${troubleshootingHTML}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>

    <script>
      (function() {
        function toggleTroubleshooting() {
          var content = document.getElementById('content');
          var arrow = document.getElementById('arrow');
          if (content.style.maxHeight && content.style.maxHeight !== '0px') {
            content.style.maxHeight = '0px';
            content.style.marginTop = '0px';
            arrow.style.transform = 'rotate(0deg)';
          } else {
            content.style.maxHeight = '24rem';
            content.style.marginTop = '1rem';
            arrow.style.transform = 'rotate(180deg)';
          }
        }
        var button = document.getElementById('troubleshoot-toggle');
        if (button) {
          button.addEventListener('click', toggleTroubleshooting);
        }
      })();
    </script>
  </body>
</html>`;
  return html;
}

async function main() {
  console.log('📦 Generating static HTML files...');
  
  // Ensure output directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const { cssContent } = await getBuiltAssets();
  
  if (!cssContent) {
    console.error('❌ CSS assets not found. Run npm run build:react first.');
    process.exit(1);
  }
  
  // Generate error code pages
  for (const code of errorCodes) {
    const html = generateHTML(code, cssContent);
    fs.writeFileSync(path.join(publicDir, `${code}.html`), html);
    console.log(`✅ Generated public/${code}.html`);
  }
  
  // Generate index.html (same as 404.html)
  const indexHTML = generateHTML('404', cssContent);
  fs.writeFileSync(path.join(publicDir, 'index.html'), indexHTML);
  console.log(`✅ Generated public/index.html`);
  
  console.log('\n🎉 All static HTML files generated successfully!');
  console.log(`Generated files: index.html, ${errorCodes.map(c => `${c}.html`).join(', ')}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
