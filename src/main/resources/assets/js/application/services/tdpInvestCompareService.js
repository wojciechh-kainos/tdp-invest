define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.factory('get_all', ['$stateParams', function($stateParams) {
        return function() {
            var testArray = [];

            testArray.push({x: -10, y: -10});
            testArray.push({x: 0, y: 0});
            testArray.push({x: 10, y: 10});
            testArray.push({x: 10, y: 20});
            testArray.push({x: 20, y: 30});
            testArray.push({x: 30, y: 30});
            return testArray;
        }
    }]);
});