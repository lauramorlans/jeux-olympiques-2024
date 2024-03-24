#!/bin/bash

# Run client build
concurrently "cd client && npm run build"