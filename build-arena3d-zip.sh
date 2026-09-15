#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
PKG="bazino-arena3d-package"
OUT="bazino-arena3d.zip"
node -e "var j=require('./$PKG/theme.json');if(j.id!=='bazino-arena3d'||j.version!=='1.0.0')throw Error('manifest identity mismatch')"
node -e "new Function(require('fs').readFileSync('./$PKG/theme.js','utf8'))"
rm -f "$OUT" "client/public/$OUT"
(cd "$PKG" && zip -q -r -D "../$OUT" theme.json theme.css theme.js assets)
cp "$OUT" "client/public/$OUT"
echo "Built $OUT ($(du -h "$OUT" | cut -f1))"
