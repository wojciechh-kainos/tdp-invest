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
        'ngCookies': 'lib/angular-cookies/angular-cookies',
        'ui.bootstrap': 'lib/angular-bootstrap/ui-bootstrap-tpls.min',
        'flow': 'lib/ng-flow/dist/ng-flow-standalone.min',
        'toastr': 'lib/angular-toastr/dist/angular-toastr.tpls',
        'stubUnitData': 'test/resources/stubUnitData',
        'scheduler': 'lib/scheduler/codebase/dhtmlxscheduler'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter': ['angular'],
        'highcharts-ng': ['angular', 'highchart-theme'],
        'restangular': ['angular', 'lodash'],
        'ngTable': ['angular'],
        'ngCookies': ['angular'],
        'highchart-theme': ['highcharts'],
        'ui.bootstrap': ['angular'],
        'flow': ['angular'],
        'toastr': ['angular'],
        'stubUnitData': {
          exports: 'stubUnitData'
        }
    },
    deps: ['application/bootstrap']
});

