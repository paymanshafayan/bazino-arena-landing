#!/usr/bin/env bash
# Build bazino-3d-theme.zip from dimension-package/
set -euo pipefail
cd "$(dirname "$0")"
ROOT=$(pwd)
STAGE=$(mktemp -d /tmp/dimension-stage.XXXXXX)
trap 'rm -rf "$STAGE"' EXIT

mkdir -p "$STAGE/assets"
cp dimension-package/theme.json dimension-package/theme.css dimension-package/CHANGELOG.md dimension-package/bazino-3d.html "$STAGE/"
cp -R dimension-package/assets/. "$STAGE/assets/"

VER=$(node -p "require('./dimension-package/theme.json').version")

# Minify ES5 with terser
npx --yes terser dimension-package/theme.js --ecma 5 -c passes=2 -m -o "$STAGE/theme.js"
printf '/* Bazino 3D Dimension Theme v%s - theme.js (minified) */\n%s\n' "$VER" "$(cat "$STAGE/theme.js")" > "$STAGE/theme.js.tmp" && mv "$STAGE/theme.js.tmp" "$STAGE/theme.js"

# Validation
node -e "
const fs = require('fs');
const js = fs.readFileSync(process.argv[1], 'utf8');
new Function(js);
if (!/BazinoThemeSDK/.test(js)) throw new Error('BazinoThemeSDK marker lost');
console.log('minified 3D theme.js OK');
" "$STAGE/theme.js"

# Build zip without folder entries
(cd "$STAGE" && rm -f "$ROOT/bazino-3d-theme.zip" && zip -q -r -D "$ROOT/bazino-3d-theme.zip" theme.json theme.css theme.js CHANGELOG.md bazino-3d.html assets -x "*.gitkeep")

# Sync to client/public
mkdir -p "$ROOT/client/public"
cp "$ROOT/bazino-3d-theme.zip" "$ROOT/client/public/bazino-3d-theme.zip"

echo "built bazino-3d-theme.zip v$VER and synced to client/public:"
unzip -l "$ROOT/bazino-3d-theme.zip" | head -n 25
