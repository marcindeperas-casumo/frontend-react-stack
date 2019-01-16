git merge HEAD &> /dev/null
result=$?

if [ $result -ne 0 ]
then
    echo "Merge in progress. Skipping all pre-commit checks."
else
    # NOTE!
    # If you are running any automatic changes on the code here
    # bear in mind that it will run on staged, unstaged and untracked
    # code as well.

    # Run linters on staged files only
    lint-staged
fi

