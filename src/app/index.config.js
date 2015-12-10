export function config ($logProvider,  $mdThemingProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
   $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange')
    .backgroundPalette('grey');
}
