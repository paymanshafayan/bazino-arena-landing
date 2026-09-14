#!/usr/bin/env bash
# Build bazino-hub-theme.zip from hub-theme/ (v2 Hub layout)
set -euo pipefail
cd "$(dirname "$0")"
ROOT=$(pwd)
STAGE=$(mktemp -d /tmp/hub-stage.XXXXXX)
trap 'rm -rf "$STAGE"' EXIT

mkdir -p "$STAGE/assets"
cp hub-theme/theme.json hub-theme/theme.css "$STAGE/"
cp -R hub-theme/assets/. "$STAGE/assets/"
# drop duplicate root-level copies (CSS loads assets/fonts/*)
rm -f "$STAGE/assets/"*.woff2 "$STAGE/assets/fc26.png" "$STAGE/assets/mk1.png" "$STAGE/assets/tekken8.png" "$STAGE/assets/ufc5.png"

VER=$(node -p "require('./hub-theme/theme.json').version")

# Keep ES5 source as-is (already ES5). Minify only if terser is local.
if command -v npx >/dev/null 2>&1 && [ -x node_modules/.bin/terser ]; then
  npx terser hub-theme/theme.js --ecma 5 -c passes=2 -m -o "$STAGE/theme.js"
else
  cp hub-theme/theme.js "$STAGE/theme.js"
fi
printf '/* Bazino Hub Neon Theme v%s */\n%s\n' "$VER" "$(cat "$STAGE/theme.js")" > "$STAGE/theme.js.tmp" && mv "$STAGE/theme.js.tmp" "$STAGE/theme.js"

# Validation
node -e "
const fs = require('fs');
const js = fs.readFileSync(process.argv[1], 'utf8');
new Function(js);
if (!/BazinoThemeSDK/.test(js)) throw new Error('BazinoThemeSDK marker lost');
console.log('minified hub theme.js OK');
" "$STAGE/theme.js"

(cd "$STAGE" && rm -f "$ROOT/bazino-hub-theme.zip" && zip -q -r -D "$ROOT/bazino-hub-theme.zip" theme.json theme.css theme.js assets -x "*.gitkeep")
echo "built bazino-hub-theme.zip v$VER:"
unzip -l "$ROOT/bazino-hub-theme.zip" | tail -4
