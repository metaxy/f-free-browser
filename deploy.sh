gulp build
cd ../f-free-browser-data
cp ../browser-free/dist/* ./ -R
git add *
rsync -az --delete --progress /home/paul/coding/f-free/data_benchmarks/ data_benchmarks/
rsync -az --delete --progress -e ssh /home/paul/coding/f-free/model/ model/
git add data_benchmarks/
git add model/
git commit -am "deploy"
git push origin gh-pages
cd ../browser-free

