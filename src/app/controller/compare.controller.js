/* global _:false */
export function CompareController(
  resolveData,
  resolveModel,
  $mdDialog, 
  $document,
  $log,
  $scope,
  $timeout,
  GraphCompareService,
  GraphResultsModelService
  
) {'ngInject';
  this.graphsData = [];
  
  this.x_key = "density";
  this.y_key = "quality";
  
  this.recalculate = () => {
    $log.info("recalcuate", this.x_key, this.y_key);
    this.graphsData = [];
    _.each(resolveData, (data, i) => {
      var d = GraphResultsModelService.calculate(resolveModel[i], this.x_key, data, this.y_key);
      this.graphsData = d;
    })
  }
  
  this.results = resolveData;
  this.graphResultsModelOptions = GraphResultsModelService.options;
  
  this.modelKeys = Object.keys(resolveModel[0][Object.keys(resolveModel[0])[0]]);
  this.resultKeys = ["time", "quality"];
  
  
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
  
  
  this.optionsProgCompare = GraphCompareService.options;
  this.dataOptionsProgCompare = GraphCompareService.calculate(resolveData);
  this.recalculate();
 
  
}
