/* global _:false */

/**
 * Used in CompareController
 */
export function GraphResultsModelService(
  ColorService
) {"ngInject";
  
  //this.options and this.options bar are using the same data but only displaying it differently
  this.options = {
    chart: {
      type: 'lineChart',
      height: 450,
      x: (d) => d.x,
      y: (d) => d.y,
      showControls: true,
      showValues: true,
      transitionDuration: 0,
      "useInteractiveGuideline": true,
      xAxis: {
        showMaxMin: false
      },
      yAxis: {
        axisLabel: 'Values'
      },
      margin : {
        top: 20,
        right: 20,
        bottom: 60,
        left: 65
      },
      zoom: {
        enabled: false
      }
    }
  };
  
  this.optionsBar = {
    chart: {
      type: 'multiBarChart',
      height: 450,
      x: (d) => d.x,
      y: (d) => d.y,
      showControls: true,
      showValues: true,
      transitionDuration: 0,
      "useInteractiveGuideline": true,
      xAxis: {
        showMaxMin: false
      },
      yAxis: {
        axisLabel: 'Values'
      },
      margin : {
        top: 20,
        right: 20,
        bottom: 60,
        left: 65
      },
      zoom: {
        enabled: true
      }
    }
  };
  /**
   * models :: object -- List of models, from $INSTANCES/graph_info.json
   * models_key :: string -- (x-axis) every models has a property by wich we will analyze it
   * results :: object -- Complete results
   * results_key :: string -- (y-axis) which key from the result we want to analyze
   */
  this.calculate = (models, models_key, results, results_key) => {
    var ret = [];
    var progCount = 0;
    var values = {};
    
     _.each(results.config.progs, (prog) => {
       values[prog] = []; //initalize
     });
     
    _.each(results.results, (runs, graph) => {
      _.each(runs, (run) => {
        values[run.prog].push({x: models[graph][models_key], y: run.metrics[results_key]});
      });
    });
    
    _.each(results.config.progs, (prog) => {
      var avg = (val) => _.reduce(_.map(val, (x) => x.y), (a,b) => a+b) / val.length;
      
      var v = _.map(_.groupBy(values[prog],'x'), (val) => {return {x: val[0].x, y: avg(val)}});
      ret.push({
        values: _.sortBy(v, 'x'),
        key: prog,
        color: ColorService.getColor(progCount, 0)
      });
      progCount++;
    });
    return ret;
  }
  

}

