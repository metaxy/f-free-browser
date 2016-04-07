/* global _:false */

/**
 * This the quadric box thing to compare two programs
 */
export function GraphProgCompareService(
  ColorService
) {"ngInject";
  
  this.options = (result, prog1, prog2, compare) => {
    return {
      chart: {
        type: 'scatterChart',
        height: 450,
        width: 450,
        x: (d) => d.x,
        y: (d) => d.y,
        scatter: {
          onlyCircles: false
        },
        showDistX: true,
        showDistY: true,
        xDomain : [0,1],
        yDomain : [0,1],
        xAxis: {
          axisLabel: prog1
        },
        yAxis: {
          axisLabel: prog2
        }
        
      }
    };
  }

  this.calculate = (result, prog1, prog2, compare) => {
    let values = [];
    _.each(result.results, (runs) => {
      let p1 = _.findWhere(runs, {prog: prog1});
      let p2 = _.findWhere(runs, {prog: prog2});
      values.push({x: p1.metrics[compare], y: p2.metrics[compare]});
    });
    return [
      {
        values: values,
        key: "Compare",
        color: ColorService.getColor(0, 0)
      },
      {
        key: 'Middle Line',
        values: [{x:-10000,y:-10000},{x:10000,y:10000}],
        slope: 1.0,
        intercept: 0.000001
      }
    ];
  }
  

}

