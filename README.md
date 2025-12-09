# Response Pages

## Purpose
Static error pages for use with Traefik or any reverse proxy. Designed for easy integration and quick deployment.

## Usage with Traefik
Configure Traefik to serve these static HTML error pages for custom error handling.

[See integration guide](PLACEHOLDER-LINK)

## Development
- Local development: Edit React components in `pages/app/`
- Build process: Run `npm run build` in the `pages` directory to generate static HTML files in `pages/public/`
- To replace the logo: Update the SVG or image in the React component (`ErrorPage.tsx`)

## Deployment
- Use nginx to serve the static HTML files from `pages/public/`
- Docker image and `docker-compose.yml` provided for easy deployment

## Contribution
Contributions are welcome via forks and pull requests.

## License
MIT. Go crazy!

