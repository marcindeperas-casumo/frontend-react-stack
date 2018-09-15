#!/usr/bin/env bash

# This script checks for .only, console.log and debugger statements in all the js/jsx files and prevent
# committing them.

if git rev-parse --verify HEAD >/dev/null 2>&1
then
	against=HEAD
else
	# Initial commit: diff against an empty tree object
	against=4b825dc642cb6eb9a060e54bf8d69288fbee4904
fi

STAGED_FILES=$(git diff --diff-filter=d --cached --name-only | grep -E '\.(js|jsx)$')

if [[ "$STAGED_FILES" = "" ]]; then
  exit 0
fi

PASS=true

echo -e "\nValidating Javascript files\n"

for FILE in $STAGED_FILES
do
	grep -n '\.only\|console.log\|debugger' $FILE
	if [ $? -eq 0 ]; then
		echo "-----------------------------------------------"
		echo -e "the line above ☝🏻, inside \033[1m$FILE\033[0m contains a forbidden statement, aborted commit. Shame! 👀"
		exit 1
	fi

done

exit
