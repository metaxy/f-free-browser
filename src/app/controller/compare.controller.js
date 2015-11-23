/* global _:false */
export function CompareController($log, $stateParams, $http, $q, resolveData, $mdDialog, $document) {'ngInject';
  this.results = resolveData;

  
  this.showRun = (ev, item) => {
    $mdDialog.show({
      controller: "DialogController",
      controllerAs: 'dialogCtrl',
      templateUrl: 'app/templates/show_run.html',
      parent: angular.element($document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals: {item: item},
      bindToController: true
    })
  };
  this.compareRun = (ev, items) => {
    $mdDialog.show({
      controller: "DialogController",
      controllerAs: 'dialogCtrl',
      templateUrl: 'app/templates/compare_run.html',
      parent: angular.element($document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals: {items: items},
      bindToController: true
    })
  };
  
  
  this.optionsProgCompare = {
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
  this.calcDataOptionsProgCompare = () => {
    
    var options = { 
      "quality": " Quality",
      "quality_solved":  "Quality of solved",
      "failed":  "Failed",
      "mean_time": "Mean time"
    }
    var ret = [];
    resolveData.forEach((res) => {
      _.each(res.stats, (data, prog) => {
        
        var values = [];
        _.each(options, (value, key) => {
          values.push({"label": value, "value" : data[key]});
        });
        
        ret.push({
          "key" : prog,
          "color": "#000",
          "values" : values
        });
      });
    });
    this.dataOptionsProgCompare = ret;
  }
  this.calcDataOptionsProgCompare();
}
