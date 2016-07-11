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
        'chart-config': 'charts/chart-config',
        'ng-table': 'lib/ng-table/dist/ng-table'
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
        'highcharts-ng': ['angular', 'highstock'],
        'ng-table': {
            exports: 'NgTableParams',
            deps: ['angular']
        }
    },
    deps: ['application/bootstrap']
});

