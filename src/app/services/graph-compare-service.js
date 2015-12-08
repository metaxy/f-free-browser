/* global _:false */
export function GraphCompareService(ColorService) {"ngInject";
  
  this.options = {
    chart: {
      type: 'multiBarHorizontalChart',
      height: 450,
      x: (d) => d.label,
      y: (d) => d.value,
      showControls: true,
      showValues: true,
      transitionDuration: 500,
      xAxis: {
        showMaxMin: false
      },
      yAxis: {
        axisLabel: 'Values'
      }
    }
  };
  this.calculate = (data) => {
    
    var options = { 
      "quality": " Quality",
      "quality_solved":  "Quality of solved",
      "failed":  "Failed",
      "mean_time": "Mean time"
    }
    var ret = [];
    var counterDataSet = 0;
    data.forEach((res) => {
      var counterProg = 0;
      _.each(res.stats, (data, prog) => {
        
        var values = [];
        _.each(options, (value, key) => {
          values.push({"label": value, "value" : data[key]});
        });
        
        ret.push({
          "key" : prog,
          "color": ColorService.getColor(counterDataSet, counterProg),
          "values" : values
        });
        counterProg++;
      });
      counterDataSet++;
    });
    return ret;
  }
}

