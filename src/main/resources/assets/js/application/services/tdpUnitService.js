define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpUnitService", function(Restangular) {
        var restService = Restangular.service('unit');

        var getAll = function() {
            return restService.getList();
        };

        var getAllWithinRange = function(minDate, maxDate) {
          return restService.customGET("range", {minDate: minDate, maxDate: maxDate}).getList();
        };

        return {
            getAll: getAll,
            getAllWithinRange: getAllWithinRange
        };
    });
});