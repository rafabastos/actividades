#!/bin/bash

	watchman watch-del-all &&
	rm -rf ios/build && 
	rm -rf node_modules && yarn cache clean --force && yarn install && cd ios && pod install && cd ..
