'use strict';

//noinspection JSFileReferences
require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router',
        'ngCookies': 'lib/angular-cookies/angular-cookies',
        'highstocks': 'lib/highcharts/highstock',
        'highcharts': 'lib/highcharts/highcharts',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng.min',
        'ui-bootstrap': 'lib/angular-bootstrap/ui-bootstrap-tpls',
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter' : ['angular'],
        'highcharts-ng': ['angular' , 'highcharts'],
        'ui-bootstrap': ['angular'],
        'ngCookies': {
            exports: 'ngCookies',
            deps: ['angular']
        }
    },
    deps: ['application/bootstrap']
});

