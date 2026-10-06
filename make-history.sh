#!/bin/bash
# Run from the folder that contains quicknotes-app/ :  bash make-history.sh
# Uses YOUR git identity (git config user.name / user.email must be set).
set -e
cd quicknotes-app
mkdir -p /tmp/qn && cp index.html style.css script.js README.md /tmp/qn/
git init -b main
strip_js() { sed -e '/T4 START/,/T4 END/d' -e '/T5 START/,/T5 END/d' -e '/\/\/ T5$/d' -e '/BONUS START/,/BONUS END/d' /tmp/qn/script.js; }
rm -f index.html style.css script.js README.md

sed '/BONUS/d' /tmp/qn/index.html > index.html
git add index.html && git commit -m "Add page structure"

cp /tmp/qn/style.css style.css
git add style.css && git commit -m "Style layout and note cards"

sed -e '/T4 START/,/T4 END/d' -e '/T5 START/,/T5 END/d' -e '/\/\/ T5$/d' -e '/BONUS START/,/BONUS END/d' /tmp/qn/script.js > script.js
git add script.js && git commit -m "Add notes with categories"

sed -e '/T5 START/,/T5 END/d' -e '/\/\/ T5$/d' -e '/BONUS START/,/BONUS END/d' -e '/T4 START/d' -e '/T4 END/d' /tmp/qn/script.js > script.js
git add script.js && git commit -m "Add validation, delete and count"

sed -e '/BONUS START/,/BONUS END/d' -e 's#\s*// T[45] \(START\|END\)##' -e 's#\s*// T5$##' /tmp/qn/script.js > script.js
git add script.js && git commit -m "Add localStorage and search"

sed '/BONUS/d' /tmp/qn/README.md > README.md
git add README.md && git commit -m "Add README"

cp /tmp/qn/index.html /tmp/qn/script.js /tmp/qn/README.md .
git add -A && git commit -m "Add Clear all button (bonus)"
git log --oneline
