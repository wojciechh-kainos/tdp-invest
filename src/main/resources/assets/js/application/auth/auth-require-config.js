'use strict';

//noinspection JSFileReferences
require.config({
    baseUrl: '/', //jestesmy w auth
    paths: {
        'angular': 'js/lib/angular/angular',
        'uiRouter': 'js/lib/angular-ui-router/release/angular-ui-router',
        'ngCookies': 'js/lib/angular-cookies/angular-cookies'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter' : ['angular'],
        'ngCookies': {
            exports: 'ngCookies',
            deps: ['angular']
        }
    },
    deps: ['auth/auth-bootstrap']
});
