/* global _:false */
export function GraphResultsModelScatterService(
  ColorService
) {"ngInject";
  
  this.options = {
    chart: {
      type: 'scatterChart',
      height: 450,
      x: (d) => d.x,
      y: (d) => d.y,
      scatter: {
        onlyCircles: false
      },
      showDistX: true,
      showDistY: true
      
    }
  };
  this.calculate = (models, models_key, results, results_key) => {
    var ret = [];
    var progCount = 0;
    var values = {};
     _.each(results.config.progs, (prog) => {
       values[prog] = []; //initalize
     });
    _.each(results.results, (runs, graph) => {
      _.each(runs, (run) => {
        values[run.prog].push({x: models[graph][models_key], y: run[results_key]});
      });
    });
    
    _.each(results.config.progs, (prog) => {
      ret.push({
        values: _.sortBy(_.sortBy(values[prog], 'y'), 'x'),
        key: prog,
        color: ColorService.getColor(progCount, 0)
      });
      progCount++;
    });
    return ret;
  }
}

