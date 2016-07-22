'use strict';

//noinspection JSFileReferences
require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router.min',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng.min',
        'highcharts': 'http://code.highcharts.com/highcharts.src',
        'ui-bootstrap' : 'lib/angular-bootstrap/ui-bootstrap-tpls',
        'angularMocks': 'lib/angular-mocks/angular-mocks',
        'eonasdan-bootstrap-datetimepicker' : 'lib/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker',
        'ngCookies': 'lib/angular-cookies/angular-cookies',
        'moment-timezone' : 'lib/moment-timezone/moment-timezone',
        'angular-moment' : 'lib/angular-moment/angular-moment',
        'moment' : 'lib/moment/moment'

    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter' : ['angular'],
        'highcharts-ng': ['angular', 'highcharts'],
        'ui-bootstrap' : ['angular'],
        'moment' : ['angular'],
        'moment-timezone' : ['angular', 'moment'],
        'angular-moment' : ['angular', 'moment-timezone'],
        'ngCookies': {
            exports: 'ngCookies',
            deps: ['angular']
        }
    },
    deps: ['application/bootstrap']
});
