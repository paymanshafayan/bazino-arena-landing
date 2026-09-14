#!/usr/bin/env bash
# Build bazino-hub-theme.zip from THIS folder (hub-theme/).
set -euo pipefail
cd "$(dirname "$0")"
DIR=$(pwd)
STAGE=$(mktemp -d /tmp/hub-stage.XXXXXX)
trap 'rm -rf "$STAGE"' EXIT

mkdir -p "$STAGE/assets"
cp theme.json theme.css "$STAGE/"
cp -R assets/. "$STAGE/assets/"
# drop duplicate root-level copies (CSS loads assets/fonts/*)
rm -f "$STAGE/assets/"*.woff2 "$STAGE/assets/fc26.png" "$STAGE/assets/mk1.png" "$STAGE/assets/tekken8.png" "$STAGE/assets/ufc5.png"

VER=$(node -p "require('./theme.json').version")

if [ -x ../node_modules/.bin/terser ]; then
  ../node_modules/.bin/terser theme.js --ecma 5 -c passes=2 -m -o "$STAGE/theme.js"
else
  cp theme.js "$STAGE/theme.js"
fi
printf '/* Bazino Hub Neon Theme v%s */\n%s\n' "$VER" "$(cat "$STAGE/theme.js")" > "$STAGE/theme.js.tmp" && mv "$STAGE/theme.js.tmp" "$STAGE/theme.js"

node -e "
const fs = require('fs');
const js = fs.readFileSync(process.argv[1], 'utf8');
new Function(js);
if (!/BazinoThemeSDK/.test(js)) throw new Error('BazinoThemeSDK marker lost');
console.log('hub theme.js OK');
" "$STAGE/theme.js"

(cd "$STAGE" && rm -f "$DIR/bazino-hub-theme.zip" && zip -q -r -D "$DIR/bazino-hub-theme.zip" theme.json theme.css theme.js assets -x "*.gitkeep")
echo "built $DIR/bazino-hub-theme.zip v$VER:"
unzip -l "$DIR/bazino-hub-theme.zip" | tail -4
