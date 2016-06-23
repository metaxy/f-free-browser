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
  GraphProgCompareService,
  GraphResultsModelService,
  GraphResultsModelScatterService
  
) {'ngInject';
  
  this.graphs = {};
  _.each(resolveData, (data, i) => {
    this.graphs[i] = {
      x_key: "density",
      y_key: "quality",
      filterFailed: true,
      modelResult: {
        data: {},
        options: GraphResultsModelService.options()
      }, 
      modelResultScatter: {
        data: {},
        options: GraphResultsModelScatterService.options
      },
      modelResultBar: {
        data: {},
        options: GraphResultsModelService.optionsBar()
      },
      compare: {
        data: {},
        options: GraphProgCompareService.options(),
        prog1: data.config.progs[0],
        prog2: data.config.progs[1],
        key: "quality"
      }
      
    };
    
  })
 
  this.recalculate = () => {
    _.each(resolveData, (data, i) => {
      this.recalculateOne(i);
      this.recalculateCompare(i);
    })
  }
  
  this.recalculateOne = (i) => {
    let graph = this.graphs[i];
    let data = resolveData[i];
    let model = resolveModel[i];
    let calc = GraphResultsModelService.calculate(model, graph.x_key, data, graph.y_key);
    
    graph.modelResult.data = calc;
    graph.modelResult.options = GraphResultsModelService.options(model, graph.x_key, data, graph.y_key);
    
    graph.modelResultBar.data = calc;
    graph.modelResultBar.options = GraphResultsModelService.optionsBar(model, graph.x_key, data, graph.y_key);
    
    if(graph.modelResult.api) {
      graph.modelResult.api.updateWithData(graph.modelResult.data);
    }  
      
    
    graph.modelResultScatter.data = GraphResultsModelScatterService.calculate(model, graph.x_key, data, graph.y_key);
    if(graph.modelResultScatter.api) {
      graph.modelResultScatter.api.updateWithData(graph.modelResultScatter.data);
    }
    
   
    if(graph.modelResultBar.api) {
      graph.modelResultBar.api.updateWithData(graph.modelResult.data);
    }
   
  }
  
  this.recalculateCompare = (i) => {
    let graph = this.graphs[i].compare;
    let data = resolveData[i];
    if(data.config.progs.length < 2) return;  
    graph.data = GraphProgCompareService.calculate(data, graph.prog1, graph.prog2, graph.key);
    graph.options = GraphProgCompareService.options(data, graph.prog1, graph.prog2, graph.key);
    if(graph.api) {
      graph.api.updateWithData(graph.data);
      graph.api.updateWithOptions(graph.options);
    } 
  }
  
  this.results = resolveData;
  
  this.modelKeys = Object.keys(resolveModel[0][Object.keys(resolveModel[0])[0]]);
  this.resultKeys = [
    "absolut",
    "absolutNorm",
    "no_correct", 
    "solved", 
    "quality", 
    "quality_inv", 
    "distance",
    "distanceNorm",
    "k_correct", 
    "time"
  ];
  
  
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

  
  
  this.optionsProgCompare = GraphCompareService.options;
  this.dataOptionsProgCompare = GraphCompareService.calculate(resolveData);
  this.recalculate();
 
  
}
