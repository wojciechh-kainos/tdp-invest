define(['angular', 'application/tdpInvestModule', 'ui-bootstrap', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
tdpInvestModule.controller("tdpInvestCalendarController", function($scope, $stateParams, tdpCompareService) {
        $scope.start_date = new Date(2015, 7, 20);
        $scope.end_date = new Date();

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [{
            date: tomorrow,
            status: 'full'
        }, {
            date: afterTomorrow,
            status: 'partially'
        }];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }

        $scope.getStockData = function(date1, date2) {
            tdpCompareService.getDataRange(date1, date2)
            .then(function(response) {
                $scope.renderInfo(response);
            });
        }


        $scope.showInvest = function(date1, date2, input_value, interest_rate){

            input_value = parseFloat(input_value);
            interest_rate = parseFloat(interest_rate);

            console.log(interest_rate);

            var oneDay = 24*60*60*1000;
            var diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime())/(oneDay)));
            console.log(diffDays);
            var rate = parseFloat((input_value * interest_rate / 365).toFixed(5));
            console.log(rate);
            var invest = [];
            var nextDay = new Date();
            var nextPrice;

            invest.push({date : createDate(date1), price : input_value});

            for(var i = 1; i < diffDays; i++){
                nextPrice = invest[i-1].price + rate;
                nextDay.setTime(date1.getTime() + oneDay * i);
                invest.push({date : createDate(nextDay), price : nextPrice});
            }

            return invest;
        }

        function createDate(date){
            var day = date.getUTCDate();
            var month = date.getUTCMonth() + 1;
            var year = date.getUTCFullYear();

            if(month < 10)
                month = "0" + month;
            if(day < 10)
                day = "0" + day;

            return year + "-" + month + "-" + day;
        }

        });

});