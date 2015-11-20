export function config ($logProvider,  $mdThemingProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
   $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange')
    .backgroundPalette('grey');
}
