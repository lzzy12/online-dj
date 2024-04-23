#!/bin/sh
npm build && node build/src/index.js &
python3 JioSaavn/app.py