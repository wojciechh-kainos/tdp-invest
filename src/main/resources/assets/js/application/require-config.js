'use strict';

require.config({
    baseUrl: 'js/',
    paths: {
        'angular': 'lib/angular/angular',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router',
        'angular-material': 'lib/angular-material/angular-material',
        'angular-aria': 'lib/angular-aria/angular-aria.min',
        'angular-animate': 'lib/angular-animate/angular-animate.min',
        'angular-chart' : 'lib/angular-chart.js/dist/angular-chart',
        'chart': 'lib/Chart.js/Chart'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'chart':{
            exports: 'Chart'
        },
        'uiRouter' : ['angular'],
        'angular-material' : ['angular', 'angular-animate', 'angular-aria'],
        'angular-aria': ['angular'],
        'angular-animate': ['angular'],
        'angular-chart': ['angular','chart']
    },
    deps: ['application/bootstrap']
});

