git merge HEAD &> /dev/null
result=$?

if [ $result -ne 0 ]
then
    echo "Merge in progress. Skipping all pre-commit checks."
else
    # source: https://github.com/okonet/lint-staged/issues/62#issuecomment-411964870
    # precommit.sh
    message="precommit_on_$(git log -1 --format=%H)"
    git stash -k -m$message

    # because git stash always succeeds
    # we need to check if we have stashed successfully
    lastStash=$(git stash list -1)
    if [[ $lastStash == *$message* ]]; then
        # If stashed, git stash pop when exit
        trap 'git stash pop' EXIT
    fi

    # Here's what we intend to run
    lint-staged
fi

