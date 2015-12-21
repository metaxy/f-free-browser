
import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './controller/main.controller';
import { CompareController } from './controller/compare.controller';
import { SiteController } from './controller/site.controller';
import { DialogController } from './controller/dialog.controller';
import { ColorService } from './services/color-service';
import { HelperService } from './services/helper';
import { GraphCompareService } from './services/graph-compare-service';
import { GraphProgCompareService } from './services/graph-prog-compare-service';
import { GraphResultsModelService } from './services/graph-results-model-service';
import { GraphResultsModelScatterService } from './services/graph-results-model-scatter-service';
import { modGraph } from './directive/mod-graph';

angular.module('browserFree', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ngMaterial', 'ngMdIcons', 'nvd3'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('CompareController', CompareController)
  .controller('SiteController', SiteController)
  .controller('DialogController', DialogController)
  .service('ColorService', ColorService)
  .service('GraphCompareService', GraphCompareService)
  .service('GraphProgCompareService', GraphProgCompareService)
  .service('GraphResultsModelService', GraphResultsModelService)
  .service('GraphResultsModelScatterService', GraphResultsModelScatterService)
  .service('HelperService', HelperService)
  .directive('modGraph', modGraph)
  ;
