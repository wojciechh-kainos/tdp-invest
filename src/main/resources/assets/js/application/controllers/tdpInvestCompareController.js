define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestmentService'], function(angular, tdpInvestModule){
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, tdpInvestmentService, NgTableParams, $filter) {

        $scope.chartConfig = chartConfig;

        $scope.tableConfig = new NgTableParams({
            page: 1,
            count: 10,
            sorting: {id: 'asc'}
        }, {
            total: 0,
            getData: function ($defer, params) {
                tdpInvestmentService.getInvestments().then(function (response) {
                    // params.total(response.data.length);
                    // $defer.resolve(response.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    var ordered = params.sorting() ?
                        $filter('orderBy')(response.data, params.orderBy()) :
                        response.data;
                    params.total(ordered.length);
                    $defer.resolve(ordered.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                });

            },
            defaultSort: "asc"
        });

        $scope.showRate = function (row) {
            return (row.annualRate * 100).toFixed(2) + "%";
        };

        $scope.removeRow = function (dbId) {
            tdpInvestmentService.deleteInvestment(dbId).then(function (success) {
                $scope.tableConfig.reload().then(function (data) {
                    if (data.length === 0 && $scope.tableConfig.total() > 0) {
                        $scope.tableConfig.page($scope.tableConfig.page() - 1);
                        $scope.tableConfig.reload();
                    }
                });
            });
        };

        $scope.saveRow = function (row, dbId) {
            var investment = mergeObjects(dbId, row);
            tdpInvestmentService.editInvestment(investment).then(function (success) {
                $scope.tableConfig.reload();
            })
        };

        $scope.addRow = function () {
            var investment = {amount: 0.0, annualRate: 0.0, startDate: null, endDate: null};
            tdpInvestmentService.postInvestment(investment).then(function (success) {
                $scope.tableConfig.reload();
            });
        };

        $scope.checkAmount = function (row) {
            if (row.hasOwnProperty("amount")) {
                var amount = row.amount;
                if (amount == null) {
                    return "Amount should not be empty";
                }
                if (amount < 0) {
                    return "Amount have to be positive";
                }
                if (amount >= 1000000) {
                    return "You are not a millionaire";
                }
            }
        };

        var mergeObjects = function (id, row) {
            var idObj = {id: id};
            Object.keys(row).forEach(function (key) {
                idObj[key] = row[key];
            });

            if (idObj.hasOwnProperty("annualRate")) {
                idObj["annualRate"] = idObj["annualRate"] / 100;
            }

            return idObj;
        };

        $scope.plot =function(row){
            //$scope.test = "test " + ;
            tdpInvestmentService.getInvestmentTimeSeries(row.startDate, row.endDate, row.amount, row.annualRate).then(function(response){
                $scope.chartConfig.series.push({
                    name: "Fund",
                    data: response.data,
                    tooltip: {
                        valueDecimals: 2,
                        valuePrefix: "$",
                        xDateFormat: '%y-%m-%d'
                    }
                });
            });

        }
    });
});