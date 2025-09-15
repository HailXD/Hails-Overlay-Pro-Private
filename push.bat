set /p MYVAR="Commit Message: "
git pull
git add .
git commit -m "%MYVAR%"
git push