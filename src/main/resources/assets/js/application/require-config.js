'use strict';

//noinspection JSFileReferences
require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular.min',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router',
        'highcharts': 'lib/highcharts/highcharts',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng',
        'highstock': 'lib/highcharts/highstock',
        'chart-config': 'charts/chart-config',
        'ngFileUpload' : 'lib/ng-file-upload/ng-file-upload',
        'ng-table': 'lib/ng-table/dist/ng-table',
        'ngCookies': 'lib/angular-cookies/angular-cookies',
        'highstocks': 'lib/highcharts/highstock', 
        'highcharts-no-data': 'lib/highcharts-no-data-to-display/no-data-to-display',
        'xeditable': 'lib/angular-xeditable/dist/js/xeditable'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'chart-config': {
            exports: 'chartConfig'
        },
        'uiRouter': ['angular'],
        'ngFileUpload': ['angular'],
        'highcharts-ng': ['angular', 'highstock'],
        'ng-table': {
            exports: 'NgTableParams',
            deps: ['angular']
        },
        'ngCookies': {
            exports: 'ngCookies',
            deps: ['angular']
        },
         'highcharts-no-data': {  deps: ['highcharts-ng'] },
        'xeditable': ['angular']
    },
    deps: ['application/bootstrap']
});
