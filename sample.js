var myApp = angular.module('sample', ['ngMaterial', 'ui.router', 'ngAnimate']);

myApp
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default');
  })
  .run(['$trace', function ($trace) {
    $trace.enable('TRANSITION');
  }])
  .run(['$transitions', function ($transitions) {
    $transitions.onStart({}, function (transition) {
      console.log('Starting transition!');
      transition.promise.finally(console.log('Transition promise finally fired!'));
    });
    $transitions.onError({}, function (transition) {
      console.log('Transition erred!');
    });
  }])
  .component('toolbar', {
    templateUrl: 'toolbar.tmpl.html',
    controller: function ($state) {
      this.name = 'controller!';
      this.navigate = function (routeName) {
        $stateProvider.go(routeName);
      }
    }
  })
  .component('hello', {
    template: '<h3>{{$ctrl.greeting}} Solar System!</h3>',
    controller: function () {
      this.greeting = 'Hello';
      this.toggleGreeting = function () {
        this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello';
      }
    }
  })
  .component('about', {
    template: '<h3>Demo of transitions behaving strangely</h3>',
    controller: function ($state) {
      this.name = 'controller!';
      this.navigate = function (routeName) {
        $stateProvider.go(routeName);
      }
    }
  });

myApp.config(function ($stateProvider) {
  $stateProvider.state({
    name: 'hello',
    url: '/hello',
    component: 'hello'
  }).state({
    name: 'about',
    url: '/about',
    component: 'about'
  });
});
