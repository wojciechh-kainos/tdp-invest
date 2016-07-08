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
        'chart-config': 'charts/chart-config',
        'ngFileUpload' : 'lib/ng-file-upload-shim/ng-file-upload'
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
        'highcharts-ng': ['angular', 'highstock'],
        'ngFileUpload': ['angular']
    },
    deps: ['application/bootstrap']
});

