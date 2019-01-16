git merge HEAD &> /dev/null
result=$?

if [ $result -ne 0 ]
then
    echo "Merge in progress. Skipping all pre-commit checks."
else
    # Run linters on staged files only
    lint-staged
fi

