'use strict';

require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular.min',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router',
        'highcharts': 'lib/highcharts/highcharts',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng',
        'highstock': 'lib/highcharts/highstock',
        'data': 'charts/input-data',
        'chart-config': 'charts/chart-config'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'data': {
            exports: 'inputData'
        },
        'chart-config': {
            exports: 'chartConfig',
            deps: ['data']
        },
        'uiRouter': ['angular'],
        'highcharts-ng': ['angular', 'highstock']
    },
    deps: ['application/bootstrap']
});

