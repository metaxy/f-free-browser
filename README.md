Browser for f-free benchmarks

# Install
```
npm install -g bower gulp
npm install
bower install
```

create symlink in .tmp/serve to data_benchmarks

From USB:

```bash
ln -s /media/removable/Transcend/backup/f-free/data_benchmarks/ .tmp/serve/
ln -s /media/removable/Transcend/backup/f-free/model/ .tmp/serve/
```

From Local
```bash
ln -s /home/paul/coding/f-free/data_benchmarks/ .tmp/serve/
ln -s /home/paul/coding/f-free/model/ .tmp/serve/
```

to run local server `gulp serve` or to build html file `gulp build`