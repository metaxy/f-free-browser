git commit -am "deploy"
gulp build
git checkout gh-pages
cp dist/* ./ -R
git add *
rsync -az --force --delete --progress /home/paul/coding/f-free/data_benchmarks/ data_benchmarks/
rsync -az --force --delete --progress -e ssh /home/paul/coding/f-free/model/ model/
git add data_benchmarks/ -f
git add model/ -f
git commit -am "deploy"
git push origin gh-pages
git checkout master


