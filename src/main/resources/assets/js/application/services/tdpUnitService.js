define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.factory("tdpUnitService", function(Restangular) {

        var getAll = function() {
            return Restangular.all('unit').getList();
        };

        var getAllWithinRange = function(minDate, maxDate) {
          return Restangular.one('unit').post('range',JSON.stringify({minDate: minDate, maxDate: maxDate}));
        };

        var uploadFile = function() {
          return Restangular
                     .one('unit/loadData')
                     .withHttpConfig({
                         transformRequest: angular.identity,
                         timeout: 0 // Avoid global setting's timeout on upload
                     })
                     .customPOST(formData, undefined, undefined, {
                         'Content-Type': undefined
                     });
        };

        var clearDatabase = function() {
            return Restangular.one('unit/clear').get();
        };

        return {
            clearDatabase: clearDatabase,
            getAll: getAll,
            getAllWithinRange: getAllWithinRange,
            uploadFile: uploadFile
        };
    });
});