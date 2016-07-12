'use strict';

require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular.min',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router.min',
        'ngCookies': 'lib/angular-cookies/angular-cookies.min',
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter' : ['angular'],
        'ngCookies': {
            exports: 'ngCookies',
            deps: ['angular'],
        },
    },
    deps: ['application/bootstrap']
});

