export function modGraph() {
  return {
    templateUrl: 'app/templates/view_graph.html',
    restrict: 'E',
    scope: {
      graph: '@',
      result: '@'
    },
    controller: ($scope, $log) => {"ngInject";
      $log.info($scope.graph, $scope.result);
    }

  };
}

