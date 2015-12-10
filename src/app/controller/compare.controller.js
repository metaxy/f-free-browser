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
  GraphResultsModelService,
  GraphResultsModelScatterService
  
) {'ngInject';
  this.graphsData = {}
  this.graphsDataScatter = [];
  this.apis = {};
  
  this.x_key = "density";
  this.y_key = "quality";
  
  this.recalculate = () => {
    this.graphsData = {}
    _.each(resolveData, (data, i) => {
      this.graphsData[i] = GraphResultsModelService.calculate(resolveModel[i], this.x_key, data, this.y_key);
    })
    if(this.api)
      this.api.update();
  }
  
  this.results = resolveData;
  this.graphResultsModelOptions = GraphResultsModelService.options;
  this.graphResultsModelScatterOptions = GraphResultsModelScatterService.options;
  
  this.modelKeys = Object.keys(resolveModel[0][Object.keys(resolveModel[0])[0]]);
  this.resultKeys = ["time", "quality"];
  
  
  this.showRun = (ev, run) => {
    $mdDialog.show({
      controller: "DialogController",
      controllerAs: 'dialogCtrl',
      templateUrl: 'app/templates/show_run.html',
      parent: angular.element($document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals: {item: run},
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
  
  /*this.showGraph = (ev, graph, result) => {
    $mdDialog.show({
      controller: "DialogController",
      controllerAs: 'dialogCtrl',
      templateUrl: 'app/templates/view_graph.html',
      parent: angular.element($document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals: {graph: graph, result: result},
      bindToController: true
    })
  };*/
  
  
  this.optionsProgCompare = GraphCompareService.options;
  this.dataOptionsProgCompare = GraphCompareService.calculate(resolveData);
  this.recalculate();
 
  
}
