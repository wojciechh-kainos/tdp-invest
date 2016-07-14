'use strict';

//noinspection JSFileReferences
require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router',
        'highcharts-ng': 'lib/highcharts-ng/dist/highcharts-ng',
        'highstocks': 'lib/highcharts/highstock',
        'ui-bootstrap': 'lib/angular-bootstrap/ui-bootstrap-tpls',
        'ngResource': 'lib/angular-resource/angular-resource'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter' : ['angular'],
        'ngResource' : ['angular'],
        'highcharts-ng' : ['angular', 'highstocks'],
        'ui-bootstrap' : ['angular']
    },
    deps: ['application/bootstrap']
});

