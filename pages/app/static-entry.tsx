// Static entry point - renders just the error page without React Router
import React from 'react';
import { createRoot } from 'react-dom/client';
import ErrorPage from './components/ErrorPage';

export function renderStaticErrorPage(errorCode: string) {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <ErrorPage errorCode={errorCode} />
        </body>
      </html>
    );
  }
}

export default renderStaticErrorPage;
