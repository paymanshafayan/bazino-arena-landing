#!/usr/bin/env bash
# Build bazino-hub-theme.zip from hub-package/
set -euo pipefail
cd "$(dirname "$0")"
ROOT=$(pwd)
STAGE=$(mktemp -d /tmp/hub-stage.XXXXXX)
trap 'rm -rf "$STAGE"' EXIT

mkdir -p "$STAGE/assets"
cp hub-package/theme.json hub-package/theme.css hub-package/CHANGELOG.md "$STAGE/"
cp -R hub-package/assets/. "$STAGE/assets/"

VER=$(node -p "require('./hub-package/theme.json').version")

# Minify ES5
npx --yes terser hub-package/theme.js --ecma 5 -c passes=2 -m -o "$STAGE/theme.js"
printf '/* Bazino Hub Neon Theme v%s - theme.js (minified) */\n%s\n' "$VER" "$(cat "$STAGE/theme.js")" > "$STAGE/theme.js.tmp" && mv "$STAGE/theme.js.tmp" "$STAGE/theme.js"

# Validation
node -e "
const fs = require('fs');
const js = fs.readFileSync(process.argv[1], 'utf8');
new Function(js);
if (!/BazinoThemeSDK/.test(js)) throw new Error('BazinoThemeSDK marker lost');
console.log('minified hub theme.js OK');
" "$STAGE/theme.js"

(cd "$STAGE" && rm -f "$ROOT/bazino-hub-theme.zip" && zip -q -r -D "$ROOT/bazino-hub-theme.zip" theme.json theme.css theme.js CHANGELOG.md assets -x "*.gitkeep")
<<<<<<< HEAD
echo "built bazino-hub-theme.zip v$VER:"
=======
mkdir -p "$ROOT/client/public"
cp "$ROOT/bazino-hub-theme.zip" "$ROOT/client/public/bazino-hub-theme.zip"
echo "built bazino-hub-theme.zip v$VER and synced to client/public:"
>>>>>>> 97e1797 (fix(packages): sync public theme zip files with root releases and ensure build scripts auto-sync)
unzip -l "$ROOT/bazino-hub-theme.zip" | tail -4
