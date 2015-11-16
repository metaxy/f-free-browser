export function CompareController($log, $stateParams, $http, $q, resolveData) {'ngInject';
  
  /*this.load = () => {
    if(!$stateParams.selected) {
      return [];
    }
    var results = [];
    $stateParams.selected.forEach((file) => {
      results.push($http.get(file).then((resp) => {return resp.data;}));
    });
    return $q.all(results).then((data) => $log.info(data));
  }*/
  this.results = resolveData;
}
