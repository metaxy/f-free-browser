/* global _:false */

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
        resolveData: ($http, $stateParams, $q, $log) => {
          if(!$stateParams.selected) {
            return [];
          }
          var results = [];
          $stateParams.selected.forEach((file) => {
            var promise = $http.get(file)
            .then((resp) => {return resp.data;})
            .then((resp) => {
              resp.stats_mean_time_min = _.min(resp.stats, (a) => a.mean_time).mean_time;
              resp.stats_quality_max = _.max(resp.stats, (a) => a.quality).quality;
              resp.stats_quality_solved_max = _.max(resp.stats, (a) => a.quality_solved).quality_solved;
              resp.stats_failed_min = _.min(resp.stats, (a) => a.failed).failed;
              resp.stats_failed_percent_min = _.min(resp.stats, (a) => a.failed_percent).failed_percent;
              $log.info(resp);
              return resp;
            });
            results.push(promise);
          });
          return $q.all(results);
        }
      }
    });

  $urlRouterProvider.otherwise('/home');
}
