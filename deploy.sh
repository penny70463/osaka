#!/usr/bin/env sh

# 發生錯誤時執行終止指令
set -e

# 打包編譯
npm run build

# 移動到打包資料夾下，若你有調整的話打包後的資料夾請務必調整
cd dist

# 部署到自定義網域
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# 以這個專案來講就要改成這樣以下這樣
#Your identification has been saved in /Users/penny_kuo/.ssh/id_rsa.
#Your public key has been saved in /Users/penny_kuo/.ssh/id_rsa.pub.
#The key fingerprint is:
#SHA256:b10Mc+bjkCgyCSitgSl/D5KKSIp6YjSjIDFc4/zi60o penny70463@gmail.com
#The key's randomart image is:
#+---[RSA 4096]----+
#|                 |
#|.o +             |
#|B * o       o o  |
#|+* + . .   . O   |
#|.++ + + S . o =  |
#|O= + + o o . + . |
#|@E+ . .   o . .  |
#|=...     .       |
#|o+oo.            |
#+----[SHA256]-----+
git push -f git@github.com:penny70463/osaka.git master:gh-pages

cd -