define(['angular', 'application/tdpInvestModule',  'application/services/tdpInvestCreateRequestsService', 'angular-moment', 'moment'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpInvestCreateRequestsService, moment) {

        $scope.start_date = moment('2015-07-15').format('YYYY-MM-DD');
        $scope.end_date = moment('2016-07-20').format('YYYY-MM-DD');


        $scope.input_value = 200;
        $scope.interest_rate = 3;

        $scope.stockData = [];
        $scope.investData = [];
        $scope.input_value_state = true;
        $scope.interest_rate_state = true;
        $scope.show_button = true;

        $scope.datesAndPrices = [];
        $scope.datesIntervals = [];

        if($scope.datesAndPrices.length == 0)
            $scope.error = "You should firstly upload file. Please click 'Upload' link on navbar above.";

        $scope.isNumber = function (n){
            if(!isNaN(n))
               return true;
            return false;
        }

        $scope.getStockData = function(date1, date2){
            tdpInvestCreateRequestsService.getStockData(date1, date2, $scope.datesIntervals, $scope.datesAndPrices)
            .then(function(response){
                $scope.stockData = response.stockData;
                $scope.datesAndPrices = response.datesAndPrices;
                $scope.datesIntervals = response.datesIntervals;
                console.log(response);
                if($scope.datesAndPrices.length > 0){
                    $scope.error = "";
                }
            });
        }





        $stockData = $scope.getStockData($scope.start_date, $scope.end_date);

    });
});

