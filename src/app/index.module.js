
import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './controller/main.controller';
import { CompareController } from './controller/compare.controller';
import { SiteController } from './controller/site.controller';
import { DialogController } from './controller/dialog.controller';
import { ColorService } from './services/color-service';
import { GraphCompareService } from './services/graph-compare-service';
import { GraphResultsModelService } from './services/graph-results-model-service';

angular.module('browserFree', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ngMaterial', 'ngMdIcons', 'nvd3'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('CompareController', CompareController)
  .controller('SiteController', SiteController)
  .controller('DialogController', DialogController)
  .service('ColorService', ColorService)
  .service('GraphCompareService', GraphCompareService)
  .service('GraphResultsModelService', GraphResultsModelService)
  ;
