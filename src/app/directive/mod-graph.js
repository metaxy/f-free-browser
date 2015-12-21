/* global cytoscape:false */
export function modGraph(
  $timeout, 
  $http,
  $document,
  HelperService,
  $log
) {'ngInject';
  return {
    templateUrl: 'app/templates/view_graph.html',
    restrict: 'E',
    scope: {
      graph: '@',
      result: '@'
    },
    controller: ($scope) => {'ngInject';
      var style = [ // the stylesheet for the graph
          {
            selector: 'node',
            style: {
              'background-color': '#666',
              'label': 'data(id)'
            }
          },

          {
            selector: 'edge[changed = 0]',
            style: {
              'width': 1,
              'line-color': 'C0C0C0',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle'
            }
          },
          {
            selector: 'edge[changed > 0]',
            style: {
              'width': 1,
              'line-color': '#56C000',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle'
            }
          },
          {
            selector: 'edge[changed < 0]',
            style: {
              'width': 1,
              'line-color': '#C00000',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle'
            }
          }
          
        ];
      $http.get($scope.graph).then((graph) => {
        $http.get($scope.result).then((result) => {
          console.log(result.data);
          cytoscape({
            container: document.getElementById('cy'), // container to render in
            elements: HelperService.makeEdges(graph.data, result.data),
            style: style,
            layout: {
              name: 'spread',
              minDist: 20
            }
          });
        });
      });
    },
  };
}

