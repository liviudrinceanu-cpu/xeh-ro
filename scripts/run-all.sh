#!/bin/bash

# RM Gastro & REDFOX Product Scraping Pipeline
# Runs all scraping scripts in the correct order

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

echo -e "${BLUE}"
echo "=============================================="
echo "  RM Gastro & REDFOX Product Scraper"
echo "=============================================="
echo -e "${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}Node.js version: $(node --version)${NC}"
echo ""

# Check for required packages
cd "$PROJECT_ROOT"

if [ ! -d "node_modules/cheerio" ]; then
    echo -e "${YELLOW}Installing required dependencies...${NC}"
    npm install cheerio --save-dev
fi

# Create necessary directories
echo -e "${BLUE}Creating directories...${NC}"
mkdir -p "$PROJECT_ROOT/data"
mkdir -p "$PROJECT_ROOT/public/images/products"

# Step 1: Run scraper
echo ""
echo -e "${BLUE}=============================================="
echo "  Step 1: Scraping products from websites"
echo "=============================================="
echo -e "${NC}"

if [ -f "$PROJECT_ROOT/data/scraped-products.json" ]; then
    echo -e "${YELLOW}Existing scraped data found.${NC}"
    read -p "Do you want to re-scrape? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        node "$SCRIPT_DIR/scraper.js"
    else
        echo "Skipping scraping, using existing data."
    fi
else
    node "$SCRIPT_DIR/scraper.js"
fi

# Check if scraping was successful
if [ ! -f "$PROJECT_ROOT/data/scraped-products.json" ]; then
    echo -e "${RED}Error: Scraping failed - no output file created${NC}"
    exit 1
fi

# Step 2: Download images
echo ""
echo -e "${BLUE}=============================================="
echo "  Step 2: Downloading product images"
echo "=============================================="
echo -e "${NC}"

read -p "Do you want to download images? (Y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    node "$SCRIPT_DIR/download-images.js"
else
    echo "Skipping image download."
fi

# Step 3: Import to TypeScript
echo ""
echo -e "${BLUE}=============================================="
echo "  Step 3: Converting to TypeScript"
echo "=============================================="
echo -e "${NC}"

node "$SCRIPT_DIR/import-products.js"

# Done
echo ""
echo -e "${GREEN}=============================================="
echo "  Pipeline Complete!"
echo "=============================================="
echo -e "${NC}"

echo "Generated files:"
echo "  - data/scraped-products.json"
echo "  - src/data/products.ts"
echo "  - public/images/products/"
echo ""
echo "Next steps:"
echo "  1. Review the generated products in src/data/products.ts"
echo "  2. Run 'npm run dev' to test the site"
echo "  3. Run 'npm run build' to check for TypeScript errors"
echo ""
