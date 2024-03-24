#!/bin/bash

# Run client and server concurrently
concurrently "cd client && npm start" "cd server && npm start"