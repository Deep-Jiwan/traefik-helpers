import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface ErrorData {
  title: string;
  description: string;
  troubleshooting: string[];
}

const errors: Record<string, ErrorData> = {
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

interface ErrorPageProps {
  errorCode?: string;
}

export default function ErrorPage({ errorCode = '404' }: ErrorPageProps) {
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const errorData = errors[errorCode] || errors['404'];

  // Detect if running in static build (no window, no React events)
  const isStatic = typeof window === 'undefined';

  return (
    <div className="min-h-screen flex flex-col bg-[#081727]">
      {/* Header with Logo */}
      <header className="absolute top-0 right-0 p-8">
        <svg width="48" height="48" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="55" stroke="#2aa2c1" strokeWidth="3" fill="none"/>
          <path d="M60 25 L60 65 M60 75 L60 80" stroke="#2aa2c1" strokeWidth="6" strokeLinecap="round"/>
          <circle cx="60" cy="60" r="35" stroke="#2aa2c1" strokeWidth="2" fill="none" opacity="0.3"/>
          <text x="60" y="95" textAnchor="middle" fill="#2aa2c1" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold">LOGO</text>
        </svg>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-[#1e2b39] rounded-xl border border-[#2f3d4d] p-6 shadow-md">
          {/* Error Code - Big and Centered */}
          <div className="text-center mb-6">
            <h1 
              className="font-bold mb-4 text-[#2aa2c1]"
              style={{ fontSize: '8rem', lineHeight: '1' }}
            >
              {errorCode}
            </h1>
            <h2 className="text-2xl font-bold text-white mb-2">
              {errorData.title}
            </h2>
            <p className="text-sm" style={{ color: 'hsla(0, 0%, 100%, 0.74)' }}>
              {errorData.description}
            </p>
          </div>

          {/* Troubleshooting Section */}
          <div className="mt-8 border-t border-[#2f3d4d] pt-6">
            <button
              id="troubleshoot-toggle"
              onClick={isStatic ? undefined : () => setShowTroubleshooting(!showTroubleshooting)}
              className="w-full flex items-center justify-center gap-2 text-lg font-semibold text-[#2aa2c1] transition-colors hover:text-[#238a9f] focus:outline-none"
            >
              <span>Troubleshooting</span>
              <span id="arrow" className={`w-5 h-5 transition-transform duration-200 ${isStatic ? '' : (showTroubleshooting ? 'rotate-180' : '')}`}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
            </button>

            {/* Troubleshooting List */}
            <div
              id="content"
              className={`overflow-hidden transition-all duration-200 ${isStatic ? 'max-h-0' : (showTroubleshooting ? 'max-h-96 mt-4' : 'max-h-0')}`}
            >
              <ul className="space-y-3">
                {errorData.troubleshooting.map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: 'hsla(0, 0%, 100%, 0.74)' }}
                  >
                    <span className="mt-1 flex-shrink-0 text-[#2aa2c1] font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Inline JavaScript for static HTML */}
      {isStatic && (
        <script dangerouslySetInnerHTML={{
          __html: `
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
                button.onclick = toggleTroubleshooting;
              }
            })();
          `
        }} />
      )}
    </div>
  );
}
