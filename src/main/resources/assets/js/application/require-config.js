'use strict';

require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular.min',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router.min',
        'highcharts': 'lib/highcharts/highcharts',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng',
        'highstock' : 'lib/highcharts/highstock'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },

        'uiRouter' : ['angular'],
        'highcharts-ng': ['angular', 'highstock']
    },
    deps: ['application/bootstrap']
});

