define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("DataService", function($http) {
        var startDate, endDate, input, percentage;

        var data;

        this.setStartDate = function (date) {
            this.startDate = date;
        };

        this.setEndDate = function (date) {
            this.endDate = date;
        };

        this.setInput = function (input) {
            this.input = input;
        }

        this.setPercentage = function (input) {
            this.percentage = percentage;
        }

        this.getRows = function(url) {
            if(url == "/api/rows/get/data") {
                var result = $http.get(url, {params: {startDate: startDate, endDate: endDate}});
            } else if (url == "/api/rows/get/compare") {
                var result = $http.get(url, {params: {startDate: startDate, endDate: endDate, input: input, percentage: percentage}});
            } else {
                console.log("Unknown url");
            }
            return result;
        }
    })
});