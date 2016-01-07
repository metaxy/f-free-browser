export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'app/templates/main.html',
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
      templateUrl: 'app/templates/compare.html',
      controller: 'CompareController',
      controllerAs: 'compareCtrl',
      params: {
        'selected': { array: true }
      },
      resolve: {
        resolveData: ($http, $stateParams, $q, HelperService) => {
          if(!$stateParams.selected) {
            return [];
          }
          var results = [];
          $stateParams.selected.forEach((file) => {
            var promise = 
            $http.get(file)
            .then((resp) => {return resp.data;})
            .then(HelperService.transformResult);
            results.push(promise);
          });
          return $q.all(results);
        },
        resolveModel: (resolveData, $http, $q) => {
          var results = [];
          resolveData.forEach((data) => {
            results.push($http.get(data.config.instances+'/graph_info.json').then((resp) => {return resp.data;}));
          });
          return $q.all(results);
        }
        
      }
    })
    .state('overview', {
      url: '/overview/:selected',
      templateUrl: 'app/templates/overview.html',
      controller: 'OverviewController',
      controllerAs: 'ctrl',
      params: {
        'selected': { array: true }
      },
      resolve: {
        resolveData: ($http, $stateParams, $q, HelperService) => {
          if(!$stateParams.selected) {
            return [];
          }
          var results = [];
          $stateParams.selected.forEach((file) => {
            var promise = 
            $http.get(file)
            .then((resp) => {return resp.data;})
            .then(HelperService.transformResult);
            results.push(promise);
          });
          return $q.all(results);
        }
        
      }
    });

  $urlRouterProvider.otherwise('/home');
}
