define(['angular', 'application/tdpInvestModule', 'application/services/tdpUnitService'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestCompareController", function($rootScope, $scope, ChartConfigFactory, tdpUnitService) {
    $scope.investmentValue = 5000;
    $scope.investmentPercent = 3;
    $scope.chartConfig = {};
    $scope.maxDate = null;
    $scope.minDate = null;

    $rootScope.title = "Compare";

    var processData = function(data) {
      if (data.length == 0) {
        console.log("NO DATA");
        return;
      }
      
      var bankSeries = [];
      var fundSeries = [];
      var categories = [];
      var percentPerDay = parseInt($scope.investmentPercent) / 365;
      var investmentValue = parseInt($scope.investmentValue);


      var plainData = data.plain();
      var unitAmount = investmentValue / plainData[0].value;

      for (i = 0; i < plainData.length; i++) {
        var dateToFormat = new Date(plainData[i].date);
        var formattedDate = dateToFormat.getDate() + '/' + (dateToFormat.getMonth() + 1) + '/' +  dateToFormat.getFullYear();

        fundSeries.push(unitAmount * plainData[i].value);
        categories.push(formattedDate);
      }

      for(i = 0; i < categories.length; i++) {
        var value = (investmentValue + (investmentValue * i * percentPerDay/100)).toFixed(2);
        bankSeries.push(parseFloat(value));

      }

      if (!$scope.dt && !$scope.dt2) {
        $scope.dt = $scope.minDate = $scope.dateOptions.minDate = new Date(plainData[0].date);
        $scope.dt2 = $scope.maxDate = $scope.dateOptions.maxDate = new Date(plainData[plainData.length - 1].date);
      }

      $scope.chartConfig.series = [{name: 'funds investment', data: fundSeries, turboThreshold: 0}, {name: 'bank investment', data: bankSeries, turboThreshold: 0}];
      $scope.chartConfig.xAxis.categories = categories;

    };

    $scope.updateChart = function(minDate, maxDate) {
      if (arguments.length === 2) {
        tdpUnitService.getAllWithinRange(minDate, maxDate).then(function(data) {
          processData(data);
        });
      } else {
        tdpUnitService.getAll().then(function (data) {
          processData(data);
        });
      }
    };

    $scope.chartConfig = ChartConfigFactory('Compare', 'the profit from bank and fund investment', [], []);
    $scope.updateChart();

  ////////////////////////////////datepicker:

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: $scope.maxDate,
      minDate: $scope.minDate,
      startingDay: 1,
      showWeeks: false
    };

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.popup1 = {
      opened: false
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.popup2 = {
      opened: false
    };


    $scope.$watch("dt", function(value, oldValue){
      if(oldValue != undefined) {
        var newMinDate = new Date(value);
        $scope.minDate = newMinDate;

        $scope.updateChart($scope.minDate, $scope.maxDate);
      }
    });

    $scope.$watch("dt2",function(value, oldValue){
    if(oldValue != undefined) {
      var newMaxDate = new Date(value);
      $scope.maxDate = newMaxDate;

      $scope.updateChart($scope.minDate, $scope.maxDate);
      }
    });
  });
});
