#!/bin/sh
#git remote add upstream git@github.com:coranos/neo-bip39-recovery.git
git fetch upstream
git checkout master
git merge upstream/master -m "-"
git push
