'use strict';

//noinspection JSFileReferences
require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular.min',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router.min',
        'highcharts': 'lib/highcharts/highcharts',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng.min',
        'ngMaterial' : 'lib/angular-material/angular-material',
        'ngAnimate' : 'lib/angular-aria/angular-aria',
        'ngAria' : 'lib/angular-animate/angular-animate',
        'ngCookies': 'lib/angular-cookies/angular-cookies',
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter' : ['angular'],
        'highcharts-ng' : ['angular', 'highcharts'],
        'ngAnimate' : ['angular'],
        'ngAria' : ['angular'],
        'ngMaterial' : ['angular', 'ngAria', 'ngAnimate'],
        'ngCookies': {
            exports: 'ngCookies',
            deps: ['angular']
        }
    },
    deps: ['application/bootstrap']
});
