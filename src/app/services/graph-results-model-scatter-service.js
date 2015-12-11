export function GraphResultsModelScatterService(
  ColorService,
  GraphResultsModelService
) {"ngInject";
  
  this.options = {
    chart: {
      type: 'scatterChart',
      height: 450,
      x: (d) => d.x,
      y: (d) => d.y,
      scatter: {
        onlyCircles: false
      },
      showDistX: true,
      showDistY: true
      
    }
  };
  this.calculate = GraphResultsModelService.calculate;
}

