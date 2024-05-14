#!/bin/bash

if [ $# -eq 0 ]; then
	echo "No arguments supplied"
else
	for arg in $@; do
		mkdir "ex$arg" && echo "ex$arg created" || $(echo "ex$arg already exists" && continue)
	done
fi
