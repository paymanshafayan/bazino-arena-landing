#!/usr/bin/env bash
# Build bazino-arena-theme.zip from theme-package/
# - theme.js is minified (ES5, terser via npx) into the ZIP; readable source stays in the repo
# - theme.css / theme.json / CHANGELOG.md / assets are copied verbatim
# Requires: zip, node, npx (terser fetched from the npm registry on first run)
set -euo pipefail
cd "$(dirname "$0")"
ROOT=$(pwd)
STAGE=$(mktemp -d /tmp/theme-stage.XXXXXX)
trap 'rm -rf "$STAGE"' EXIT

mkdir -p "$STAGE/assets"
cp theme-package/theme.json theme-package/theme.css theme-package/CHANGELOG.md "$STAGE/"
cp theme-package/assets/hero-arena.mp4 theme-package/assets/hero-poster.webp theme-package/assets/hero-poster-small.webp "$STAGE/assets/"

VER=$(node -p "require('./theme-package/theme.json').version")

# minify ES5 (comments stripped by default; plain /* */ headers do not match license patterns)
npx --yes terser theme-package/theme.js --ecma 5 -c passes=2 -m -o "$STAGE/theme.js"
printf '/* Bazino Arena of Legends v%s - theme.js (minified; source: bazino-arena-landing/theme-package/theme.js) */\n%s\n' "$VER" "$(cat "$STAGE/theme.js")" > "$STAGE/theme.js.tmp" && mv "$STAGE/theme.js.tmp" "$STAGE/theme.js"

# sanity: parse + SDK/region markers must survive minification
node -e "
const fs = require('fs');
const js = fs.readFileSync(process.argv[1], 'utf8');
new Function(js);
if (!/BazinoThemeSDK/.test(js)) throw new Error('BazinoThemeSDK marker lost');
const regions = Array.from(js.matchAll(/\.registerComponent\s*\(\s*['\"]([a-zA-Z0-9_.-]+)['\"]/g)).map(m => m[1]);
if (!regions.includes('home')) throw new Error('home region marker lost: ' + regions);
if (/setInterval\s*\(/.test(js)) throw new Error('setInterval appeared');
console.log('minified theme.js OK — regions: ' + regions.join(','));
" "$STAGE/theme.js"

(cd "$STAGE" && rm -f "$ROOT/bazino-arena-theme.zip" && zip -q -r "$ROOT/bazino-arena-theme.zip" theme.json theme.css theme.js CHANGELOG.md assets)
echo "built bazino-arena-theme.zip v$VER:"
unzip -l "$ROOT/bazino-arena-theme.zip" | tail -4
