'use strict';

//noinspection JSFileReferences
require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router',
        'ngCookies': 'lib/angular-cookies/angular-cookies',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng',
        'highstocks': 'lib/highcharts/highstock',
        'ui-bootstrap': 'lib/angular-bootstrap/ui-bootstrap-tpls',
        'ngResource': 'lib/angular-resource/angular-resource',
        'angularMocks': 'lib/angular-mocks/angular-mocks' //for plugin

    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter': ['angular'],
        'ngResource': ['angular'],
        'highcharts-ng': ['angular', 'highstocks'],
        'ui-bootstrap': ['angular'],
        'ngCookies': {
            exports: 'ngCookies',
            deps: ['angular']
        }
    },
    deps: ['application/bootstrap']
});
