#!/bin/bash

if [ $# -eq 0 ]; then
	echo "No arguments supplied"
else
	for ((i = 1; i <= $#; i++)); do
		if [ $i -le 3 ]; then
			echo "${!i}"
		fi
	done
fi
