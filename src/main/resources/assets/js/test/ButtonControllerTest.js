define( ['angular' , 'angularMocks' , 'application/controllers/ButtonController', 'application/service/DataService'], function(angular){
    describe('ButtonController', function() {
        beforeEach (angular.mock.module('tdpInvestModule'));

        var $controller, $scope;
        beforeEach (inject (function (_$rootScope_, _$controller_) {
            $controller = _$controller_;
            _$rootScope_.input = 100;
            _$rootScope_.dataFund = [1,2,3];
            _$rootScope_.dataInvest = [10,20,30];
            _$rootScope_.receivedData = [100,200,300];

            $scope = _$rootScope_.$new();
        }));

        beforeEach(module(function($provide) {
            var service = {
                getRows: function (url, startDate, endDate) {
                    return [{"date": "2000-02-11", "value": "100"}
                            {"date": "2001-03-12", "value": "200"}
                    ]
                }
            };
            $provide.value('DataService', service);
        }));

        describe('Data tests', function(){
            it('checks if $scope.input is equal to proper value', function() {
                var controller = $controller('ButtonController', {$scope: $scope, DataService: service});



            });
        });
    });
});