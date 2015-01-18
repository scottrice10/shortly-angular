angular.module('shortly', [
    'shortly.services',
    'shortly.nav',
    'shortly.links',
    'shortly.shorten',
    'shortly.auth',
    'ui.router',
    'ui.router.stateHelper'
  ])
  .config(function($stateProvider, $httpProvider, $urlRouterProvider, stateHelperProvider) {
    //  stateHelperProvider.setNestedState({
    //   name: 'nav',
    //   templateUrl: 'nav.html',
    //   children: [
    //     {
    //       name: 'shorten',
    //       templateUrl: 'shorten.html'
    //     },
    //     {
    //       name: 'links',
    //       templateUrl: 'links.html'
    //     }
    //   ]
    // });

    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/auth/signin.html',
        controller: 'AuthController'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/auth/signup.html',
        controller: 'AuthController'
      })
      .state('nav', {
        abstract: true,
        url: '/',
        templateUrl: 'app/nav/nav.html',
        controller: 'NavController'
      })
      .state('nav.links', {
        url: 'links',
        templateUrl: 'app/links/nav.links.html',
        controller: 'LinksController'
      })
      .state('nav.shorten', {
        url: 'shorten',
        templateUrl: 'app/shorten/nav.shorten.html',
        controller: 'ShortenController'
      });


    $urlRouterProvider.otherwise("/signin");
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
  })
  .factory('AttachTokens', function($window) {
    // this is an $httpInterceptor
    // its job is to stop all out going request
    // then look in local storage and find the user's token
    // then add it to the header so the server can validate the request
    var attach = {
      request: function(object) {
        var jwt = $window.localStorage.getItem('com.shortly');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })
  .run(function($rootScope, $location, Auth) {
    // here inside the run phase of angular, our services and controllers
    // have just been registered and our app is ready
    // however, we want to make sure the user is authorized
    // we listen for when angular is trying to change routes
    // when it does change routes, we then look for the token in localstorage
    // and send that token to the server to see if it is a real user or hasn't expired
    // if it's not valid, we then redirect back to signin/signup
    $rootScope.$on('$routeChangeStart', function(evt, next, current) {
      if (next.$$route && $location.path() !== '/signup' && !Auth.isAuth()) {
        $location.path('/signin');
      }
    });
  });
