define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpUnitService", function(Restangular) {
        var restService = Restangular.service('unit');

        var getAll = function() {
            return restService.getList();
        };

        return {
            getAll: getAll
        };
    });
});