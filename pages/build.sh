#!/bin/sh
set -e

echo "Building React app..."
npm run build

echo "Build complete. Static files are in build/client/"

# List the generated files
echo "Generated files:"
ls -lh build/client/
