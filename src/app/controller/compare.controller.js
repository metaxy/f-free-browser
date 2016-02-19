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
      modelResult: {
        data: {},
        options: GraphResultsModelService.options
      }, 
      modelResultScatter: {
        data: {},
        options: GraphResultsModelScatterService.options
      },
      modelResultBar: {
        data: {},
        options: GraphResultsModelService.optionsBar
      },
      compare: {
        data: {},
        options: GraphProgCompareService.options,
        prog1: data.config.progs[0],
        prog2: data.config.progs[1]
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
    let calc = GraphResultsModelService.calculate(resolveModel[i], graph.x_key, data, graph.y_key);
    
    graph.modelResult.data = calc;
    if(graph.modelResult.api) {
      graph.modelResult.api.updateWithData(calc);
    }  
      
    
    graph.modelResultScatter.data = GraphResultsModelScatterService.calculate(resolveModel[i], graph.x_key, data, graph.y_key);
    if(graph.modelResultScatter.api) {
      graph.modelResultScatter.api.updateWithData(graph.modelResultScatter.data);
    }
    
    graph.modelResultBar.data = calc;
    if(graph.modelResultBar.api) {
      graph.modelResultBar.api.updateWithData(calc);
    }
  }
  
  this.recalculateCompare = (i) => {
    let graph = this.graphs[i].compare;
    if(resolveData[i].config.progs.length < 2) return;  
    graph.data = GraphProgCompareService.calculate(resolveData[i], graph.prog1, graph.prog2, "quality");
    if(graph.api) {
      graph.api.updateWithData(graph.data);
    }  
  }
  
  this.results = resolveData;
  
  this.modelKeys = Object.keys(resolveModel[0][Object.keys(resolveModel[0])[0]]);
  this.resultKeys = ["absolut", "no_correct", "solved", "quality", "quality_inv", "distance", "k_correct", "time"];
  
  
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
