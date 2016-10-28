var myApp = angular.module('sample', ['ngMaterial', 'ui.router']);

myApp
  .config(function($mdThemingProvider){
    $mdThemingProvider.theme('default');
  })
  .component('hello', {
    template:  '<h3>{{$ctrl.greeting}} Solar System!</h3>',
    controller: function() {
      this.greeting = 'Hello';
      this.toggleGreeting = function() {
        this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello';
      }
    }
  })
  .component('toolbar', {
    templateUrl: 'toolbar.template.html',
    controller: function($state) {
      this.navigate = function(routeName) {
        $stateProvider.go(routeName);
      }
    }
  });

myApp.config(function($stateProvider) {
  $stateProvider.state({
    name: 'hello',
    url: '/hello',
    component: 'hello'
  }).state({
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  });
});
