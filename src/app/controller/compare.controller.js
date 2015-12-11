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
  
  this.graphs = {};
  _.each(resolveData, (data, i) => {
    this.graphs[i] = {
      x_key: "density",
      y_key: "quality",
      modelResult: {
        data: {},
        options: GraphResultsModelService.options
      }, 
      modelResultScatter: {
        data: {},
        options: GraphResultsModelService.optionsScatter
      },
      modelResultBar: {
        data: {},
        options: GraphResultsModelService.optionsBar
      }
      
    };
    
  })
 
  this.recalculate = () => {
    $log.info("recalculate");
    _.each(resolveData, (data, i) => {
      this.recalculateOne(i);
    })
  }
  
  this.recalculateOne = (i) => {
    var graph = this.graphs[i];
    var data = resolveData[i];
    var calc = GraphResultsModelService.calculate(resolveModel[i], graph.x_key, data, graph.y_key);
    
    graph.modelResult.data = calc;
    if(graph.modelResult.api) {
      graph.modelResult.api.updateWithData(calc);
    }  
      
    
    graph.modelResultScatter.data = calc;
    if(graph.modelResultScatter.api) {
      graph.modelResultScatter.api.updateWithData(calc);
    }
    
    graph.modelResultBar.data = calc;
    if(graph.modelResultBar.api) {
      graph.modelResultBar.api.updateWithData(calc);
    }
  }
  
  this.results = resolveData;
  
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
