'use strict';

require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular.min',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router.min',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng.min',
        'highcharts': 'http://code.highcharts.com/highcharts.src',
        'angular-bootstrap': 'http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.12.1.min',
        'ui-bootstrap' : 'lib/angular-bootstrap/ui-bootstrap-tpls',
        'angularMocks': 'lib/angular-mocks/angular-mocks',
        'eonasdan-bootstrap-datetimepicker' : 'lib/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker'

    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter' : ['angular'],
        'highcharts-ng': ['angular', 'highcharts'],
        'angular-bootstrap': ['angular'],
        'ui-bootstrap' : ['angular']
    },
    deps: ['application/bootstrap']
});

