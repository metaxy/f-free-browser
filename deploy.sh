gulp build

rsync -az --force --delete --progress -e ssh ./dist/ ecg:free.ecg-berlin.de/
rsync -az --force --delete --progress /home/paul/coding/f-free/data_benchmarks/ ecg:free.ecg-berlin.de/data_benchmarks/
rsync -az --force --delete --progress -e ssh /home/paul/coding/f-free/model/ ecg:free.ecg-berlin.de/model/


