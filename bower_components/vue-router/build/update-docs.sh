cd docs
rm -rf _book
gitbook install
gitbook build
cp assets/circle.yml _book/circle.yml
cp assets/CNAME _book/CNAME
cd _book
git init
git add -A
git commit -m 'update book'
git push -f git@github.com:vuejs/vue-router.git master:gh-pages
