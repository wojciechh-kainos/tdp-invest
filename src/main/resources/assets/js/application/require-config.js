'use strict';

require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular.min',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router.min',
        'highcharts': 'lib/highcharts/highcharts',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng.min',
        'lodash': 'lib/lodash/dist/lodash.min',
        'restangular': 'lib/restangular/dist/restangular.min',
        'ngTable': 'lib/ng-table/dist/ng-table.min',
        'highchart-theme': 'lib/highcharts/themes/dark-unica',
        'ui.bootstrap': 'lib/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-animate': 'lib/angular-animate/angular-animate.min',
        'flow': 'lib/ng-flow/dist/ng-flow-standalone.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter': ['angular'],
        'highcharts-ng': ['angular', 'highcharts', 'highchart-theme'],
        'highchart-theme': ['highcharts'],
        'restangular': ['angular', 'lodash'],
        'ngTable': ['angular'],
        'ui.bootstrap': ['angular', 'angular-animate'],
        'angular-animate': ['angular'],
        'flow': ['angular']
    },
    deps: ['application/bootstrap']
});

