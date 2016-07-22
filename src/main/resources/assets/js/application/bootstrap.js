define([
    'angular',
    'application/tdpInvestModule',
    'application/tdpInvestModuleConfig',
    'application/directives/tdpInvestNavbarDirective'
], function (angular) {
    'use strict';

    angular.element().ready(function () {
        angular.bootstrap(document, ['tdpInvestModule']);
    });
});