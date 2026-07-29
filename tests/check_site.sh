#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
fail=0

check() {
  if ! grep -qF -- "$1" "$2"; then
    echo "FAIL: expected to find '$1' in $2"
    fail=1
  fi
}

check_count() {
  local n
  n=$(grep -oF -- "$1" "$2" | wc -l | tr -d ' ')
  if [ "$n" -ne "$3" ]; then
    echo "FAIL: expected $3 occurrences of '$1' in $2, found $n"
    fail=1
  fi
}

# Task 1: shell + tokens
check '<div class="project-grid" id="project-grid">' index.html
check '<ul class="stack-list' index.html
check '--signal:#D9A441' style.css
check '--font-mono' style.css

# Task 2: project data
check_count 'github: "https://github.com/YashuLanki/' script.js 6
check 'function renderProjects' script.js
check 'function renderStack' script.js

# Task 3: animation
check 'function initReveal' script.js
check 'IntersectionObserver' script.js

# Task 4: favicon + README
check '<rect' assets/favicon.svg
check '# Portfolio' README.md

if [ "$fail" -eq 0 ]; then
  echo "ALL CHECKS PASSED"
else
  exit 1
fi
