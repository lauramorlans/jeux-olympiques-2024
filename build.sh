#!/bin/bash

# Run client and server build
concurrently "cd client && npm run build" "cd server && npm run build"