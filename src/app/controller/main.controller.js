export function MainController(resolveBenchmarks, $state) {'ngInject';

  this.benchmarks = resolveBenchmarks;
  this.compare = () => {
    var selected = [];
    this.benchmarks.forEach((item) => {
      if(item.selected) {
        selected.push(item.fileName);
      }
    });
    $state.go('compare', {selected: selected});
  }
}
