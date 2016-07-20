define([
    'angular',
    'application/auth/tdpInvestAuthModule',
    'application/auth/tdpInvestAuthModuleConfig'
], function (angular) {
    'use strict';

    angular.element().ready(function () {
        angular.bootstrap(document, ['tdpInvestAuthModule']);
    });
});
