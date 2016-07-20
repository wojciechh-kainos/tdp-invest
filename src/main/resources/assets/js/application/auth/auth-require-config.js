'use strict';

//noinspection JSFileReferences
require.config({
    baseUrl: '/js/',
    paths: {
        'angular': 'lib/angular/angular',
        'uiRouter': 'lib/angular-ui-router/release/angular-ui-router',
        'ngCookies': 'lib/angular-cookies/angular-cookies'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter': ['angular'],
        'ngCookies': {
            exports: 'ngCookies',
            deps: ['angular']
        }
    },
    deps: ['application/auth/auth-bootstrap']
});
