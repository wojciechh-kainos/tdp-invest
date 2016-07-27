define(['angular', 'application/tdpInvestModule', 'application/services/tdpDataService', 'application/services/tdpChartService', 'application/services/tdpInvestmentService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpDataService, tdpChartService, tdpInvestmentService, $q) {

        tdpDataService.getInvestData().then(function(response){
            $scope.investData = response.data;
        });

        $scope.error = ""

        $scope.submit = function(){

            if($scope.formValidation()){

                if(typeof $scope.start !== undefined && typeof $scope.end !== undefined){

                    var valuesList = [];
                    var dateList = [];

                    $q.all([tdpInvestmentService.getCountedInvestment($scope.startDate,$scope.endDate,
                                                                            $scope.amount,  $scope.investOption,  $scope.annualInterest ),
                            tdpInvestmentService.getCountedStockInvestment($scope.startDate,$scope.endDate,
                                                                                 $scope.amount, $scope.investData)])
                            .then(function(response){

                                        var investmentResponse = response[0];
                                        var stockResponse = response[1];

                                        $scope.gain = investmentResponse.gain.toFixed(2);
                                        $scope.stockGain = stockResponse.stockGain.toFixed(2);
                                        tdpChartService.createChartWithTwoSeries('investmentChart', investmentResponse.dateList,
                                                                                    investmentResponse.valuesList, stockResponse.stockValuesList);
                            });

                }
            }
            else{
                   $scope.error = "Invalid input data";
            }
        }

       $scope.formValidation = function(){

                if($scope.annualInterest < 0 || $scope.annualInterest == undefined)
                    return false;

                if($scope.amount < 0 || $scope.amount == undefined)
                    return false;

                if($scope.investOption == undefined)
                    return false;

                $scope.error = ""
                return true;
            }

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2150, 01, 01),
            minDate: new Date(1950, 01, 01)
        };

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.format = 'dd.MM.yyyy';
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };
    });
});
