export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'mainCtrl',
      resolve: {
        resolveBenchmarks: ($http) => {
          return $http.get('/data_benchmarks/list.json').then((resp) => {return resp.data;});
        }
      }
    })
    .state('compare', {
      url: '/compare/:selected',
      templateUrl: 'app/compare/compare.html',
      controller: 'CompareController',
      controllerAs: 'compareCtrl',
      params: {
        'selected': { array: true }
      },
      resolve: {
        resolveData: ($http, $stateParams, $q) => {
          if(!$stateParams.selected) {
            return [];
          }
          var results = [];
          $stateParams.selected.forEach((file) => {
            results.push($http.get(file).then((resp) => {return resp.data;}));
          });
          return $q.all(results);
        }
      }
    });

  $urlRouterProvider.otherwise('/home');
}
