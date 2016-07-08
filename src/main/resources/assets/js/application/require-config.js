'use strict';

require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular.min',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router',
        'highcharts': 'lib/highcharts/highcharts',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng',
        'highstock': 'lib/highcharts/highstock',
        'data': 'data/input-data'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'data': {
            exports: 'input_data'
        },
        'uiRouter' : ['angular'],
        'highcharts-ng': ['angular', 'highstock']
    },
    deps: ['application/bootstrap']
});

