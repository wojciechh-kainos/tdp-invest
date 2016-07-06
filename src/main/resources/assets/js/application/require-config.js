'use strict';

require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular.min',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router.min',
        'angular-material': 'lib/angular-material/angular-material.min',
        'angular-aria': 'lib/angular-aria/angular-aria.min',
        'angular-animate': 'lib/angular-animate/angular-animate.min',
        'Chart': 'lib/Chart.js/dist/Chart.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'Chart': {
            exports: 'Chart'
        },
        'uiRouter' : ['angular'],
        'angular-material' : ['angular', 'angular-animate', 'angular-aria'],
        'angular-aria': ['angular'],
        'angular-animate': ['angular']
    },
    deps: ['application/bootstrap']
});

