define([
    'angular',
    'application/tdpInvestModule',
    'application/tdpInvestModuleConfig'
], function (angular) {
    'use strict';

    angular.element().ready(function () {
        angular.bootstrap(document, ['tdpInvestModule']);
    });
});
