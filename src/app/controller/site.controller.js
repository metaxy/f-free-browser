export function SiteController($window) {'ngInject';
    this.back = () => {
      $window.history.back();
    }

 }