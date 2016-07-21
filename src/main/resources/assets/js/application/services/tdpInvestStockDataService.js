define(['angular', 'application/tdpInvestModule'], function (angular, tdpInvestModule) {
    tdpInvestModule.service('stockData', function ($http) {
        var data;
        var fundList;
        var currentFundId;


        this.getData = function () {
            return data;
        };

        this.getFirst = function () {
            return new Date(fundList[currentFundId].units[0][0]);
        };

        this.getLast = function () {
            return new Date(data[data.length - 1][0]);
        };

        this.promise = $http.get('/api/unit/select/1').then(
            function (response) {
                data = response.data;
                return data;
            },
            function (error) {
                return error;
            }
        );

        function getFundIndex(id) {
            return fundList.findIndex(function (item) {
                return item.id == id;
            })
        }

        function loadFundUnits(fundIndex) {
            return $http.get('/api/unit/select/' + fundList[fundIndex].id).then(
                function (response) {
                    fundList[fundIndex].units = response.data;
                    return fundList[fundIndex].units;
                },
                function (error) {
                    return error;
                })
        }

        this.setCurrentFund = function (id) {
            if (!(typeof id === 'undefined')) {
                currentFundId = getFundIndex(id);

                if (fundList[currentFundId].units === null) {
                    return loadFundUnits(currentFundId);
                }
            }
        };

        this.loadFundList = $http.get('/api/fund').then(
            function (response) {
                fundList = response.data;
                return fundList;
            },
            function (error) {
                return error;
            }
        );

        this.getFunds = function () {
            return fundList;
        };

        this.getCurrentFund = function () {
            return fundList[currentFundId];
        }
    })
});
