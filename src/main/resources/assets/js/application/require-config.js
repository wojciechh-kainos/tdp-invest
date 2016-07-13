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
        'ng-file-upload': 'lib/ng-file-upload/ng-file-upload.min',
        //for non HTML5 browsers
        'ng-file-upload-shim': 'lib/ng-file-upload/ng-file-upload-shim.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter': ['angular'],
        'highcharts-ng': ['angular', 'highcharts', 'highchart-theme'],
        'restangular': ['angular', 'lodash'],
        'ngTable': ['angular'],
        'ng-file-upload':['angular', 'ng-file-upload-shim']
    },
    deps: ['application/bootstrap']
});

