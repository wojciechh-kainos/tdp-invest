'use strict';

require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular.min',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router.min',
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
    },
    deps: ['application/bootstrap']
});

