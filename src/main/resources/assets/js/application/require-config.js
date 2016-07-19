'use strict';

//noinspection JSFileReferences
require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular.min',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router.min',
        'highcharts': 'lib/highcharts/highcharts',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng.min',
        'ngCookies': 'lib/angular-cookies/angular-cookies',
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter' : ['angular'],
        'highcharts-ng' : ['angular', 'highcharts'],
        'ngCookies': {
            exports: 'ngCookies',
            deps: ['angular']
        }
    },
    deps: ['application/bootstrap']
});
