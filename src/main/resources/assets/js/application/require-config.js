'use strict';

require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular.min',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router.min',
        'highcharts': 'lib/highcharts/highcharts',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng.min',
        'lodash': 'lib/lodash/dist/lodash.min',
        'restangular': 'lib/restangular/dist/restangular.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter': ['angular'],
        'highcharts-ng': ['angular', 'highcharts'],
        'restangular': ['angular', 'lodash']
    },
    deps: ['application/bootstrap']
});

