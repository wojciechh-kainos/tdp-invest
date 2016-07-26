define(['angular', 'application/tdpInvestModule', 'application/services/tdpDataService', 'application/services/tdpChartService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestFrontController", function($scope, $stateParams, tdpDataService, tdpChartService) {

        var investData = [];
        var startDate = false;
        var endDate = false;

        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;
        $scope.filteredDataForView = [];
        $scope.dataChanged = false;

        tdpDataService.getInvestData().then(function(response){
            prepareChart(response.data)
            investData = response.data;
            $scope.$watch("[currentPage + numPerPage, dataChanged]", function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                var end = begin + $scope.numPerPage;

                $scope.filteredDataForView = $scope.dataForView.slice(begin, end);
                $scope.dataChanged = false;
            });

        });

        $scope.submitRange = function(){
            startDate = new Date($scope.startDate);
            endDate = new Date ($scope.endDate);
            prepareChart(investData)
            $scope.dataChanged = true;
            $scope.currentPage = 1;
        }

        function dateFilter(record){
                if(startDate == false || endDate == false){
                    return true;
                }

                var date = new Date(record.date.year + "-" + record.date.monthValue + "-" + record.date.dayOfMonth);
                if(date >= startDate && date <= endDate)
                       return true;
                return false;
        }

        function prepareChart(recordList){
               var dateList = []
               var valuesList = []

               recordList = recordList.filter(dateFilter);
               $scope.dataForView = recordList;

               for (i = 0; i < recordList.length; i++) {
                   dateList.push(getDateString(recordList[i].date));
                   valuesList.push(recordList[i].value)
               }

               tdpChartService.createChart(dateList, valuesList);
        }

        function getDateString(date) {
            return  ("0" + date.dayOfMonth).slice(-2) + "." + ("0" + date.monthValue).slice(-2) + "." + date.year;
        };

        $scope.show = function(){
            if(typeof $scope.dataForView != 'undefined'){
                return $scope.dataForView.length > $scope.numPerPage;
            }
            return false;
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
