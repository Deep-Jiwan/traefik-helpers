import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  }
};

const template = (errorCode, data) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${errorCode} - ${data.title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #081727;
            color: white;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        
        header {
            position: absolute;
            top: 0;
            right: 0;
            padding: 2rem;
        }
        
        header svg {
            width: 48px;
            height: 48px;
        }
        
        main {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        
        .error-card {
            max-width: 42rem;
            width: 100%;
            background-color: #1e2b39;
            border-radius: 0.75rem;
            border: 1px solid #2f3d4d;
            padding: 1.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .error-code {
            font-size: 8rem;
            line-height: 1;
            color: #2aa2c1;
            font-weight: bold;
            text-align: center;
            margin-bottom: 1rem;
        }
        
        .error-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
            text-align: center;
            margin-bottom: 0.5rem;
        }
        
        .error-description {
            font-size: 0.875rem;
            color: hsla(0, 0%, 100%, 0.74);
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .troubleshooting-section {
            margin-top: 2rem;
            border-top: 1px solid #2f3d4d;
            padding-top: 1.5rem;
        }
        
        .troubleshooting-button {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 1.125rem;
            font-weight: 600;
            color: #2aa2c1;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            transition: color 0.2s;
        }
        
        .troubleshooting-button:hover {
            color: #238a9f;
        }
        
        .troubleshooting-button:focus {
            outline: none;
        }
        
        .arrow {
            display: inline-block;
            transition: transform 0.2s;
        }
        
        .arrow.rotated {
            transform: rotate(180deg);
        }
        
        .troubleshooting-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.2s ease-out;
        }
        
        .troubleshooting-content.show {
            max-height: 400px;
            margin-top: 1rem;
        }
        
        .troubleshooting-list {
            list-style: none;
            padding: 0;
        }
        
        .troubleshooting-list li {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            font-size: 0.875rem;
            color: hsla(0, 0%, 100%, 0.74);
            margin-bottom: 0.75rem;
        }
        
        .troubleshooting-list li::before {
            content: "•";
            color: #2aa2c1;
            font-weight: bold;
            flex-shrink: 0;
            margin-top: 0.25rem;
        }
    </style>
</head>
<body>
    <header>
        <svg width="48" height="48" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="55" stroke="#2aa2c1" stroke-width="3" fill="none"/>
            <path d="M60 25 L60 65 M60 75 L60 80" stroke="#2aa2c1" stroke-width="6" stroke-linecap="round"/>
            <circle cx="60" cy="60" r="35" stroke="#2aa2c1" stroke-width="2" fill="none" opacity="0.3"/>
            <text x="60" y="95" text-anchor="middle" fill="#2aa2c1" font-family="Arial, sans-serif" font-size="14" font-weight="bold">LOGO</text>
        </svg>
    </header>
    
    <main>
        <div class="error-card">
            <div class="error-code">${errorCode}</div>
            <h2 class="error-title">${data.title}</h2>
            <p class="error-description">${data.description}</p>
            
            <div class="troubleshooting-section">
                <button class="troubleshooting-button" onclick="toggleTroubleshooting()">
                    <span>Troubleshooting</span>
                    <span class="arrow" id="arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </span>
                </button>
                
                <div class="troubleshooting-content" id="content">
                    <ul class="troubleshooting-list">
${data.troubleshooting.map(tip => `                        <li>${tip}</li>`).join('\n')}
                    </ul>
                </div>
            </div>
        </div>
    </main>
    
    <script>
        function toggleTroubleshooting() {
            const content = document.getElementById('content');
            const arrow = document.getElementById('arrow');
            content.classList.toggle('show');
            arrow.classList.toggle('rotated');
        }
    </script>
</body>
</html>`;

// Generate HTML files
const publicDir = path.join(__dirname, 'public');

Object.entries(errors).forEach(([code, data]) => {
  const html = template(code, data);
  const filename = path.join(publicDir, `${code}.html`);
  fs.writeFileSync(filename, html);
  console.log(`✓ Generated ${code}.html`);
});

// Also create index.html as 404
fs.copyFileSync(
  path.join(publicDir, '404.html'),
  path.join(publicDir, 'index.html')
);
console.log('✓ Created index.html');

console.log('\nAll error pages generated successfully!');
