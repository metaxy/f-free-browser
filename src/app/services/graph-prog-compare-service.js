/* global _:false */
export function GraphProgCompareService(
  ColorService
) {"ngInject";
  
 this.options = {
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
      yDomain : [0,1]
      
    }
  };
  

  this.calculate = (result, prog1, prog2, compare) => {
    var values = [];
    _.each(result.results, (runs) => {
      var p1 = _.findWhere(runs, {prog: prog1});
      var p2 = _.findWhere(runs, {prog: prog2});
      values.push({x: p1[compare], y: p2[compare]});
    });
    return [{
      values: values,
      key: "Compare",
      color: ColorService.getColor(0, 0)
    }];
  }
  

}

