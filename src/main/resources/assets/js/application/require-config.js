'use strict';

require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router',
        'chart': 'lib/Chart.js/Chart',
        'angular-chart': 'lib/angular-chart.js/dist/angular-chart'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'chart': {
            exports: 'Chart'
        },
        'uiRouter' : ['angular'],
        'angular-chart': ['angular', 'chart']
    },
    deps: ['application/bootstrap']
});

