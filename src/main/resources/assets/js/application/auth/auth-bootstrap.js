define([
    'angular',
    'auth/tdpInvestAuthModule',
    'auth/tdpInvestAuthModuleConfig'
], function (angular) {
    'use strict';

    angular.element().ready(function () {
        angular.bootstrap(document, ['tdpInvestAuthModule']);
    });
});