define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
  tdpInvestModule.directive('tdpDatepicker', function() {
    return {
      restrict: 'E',
      scope: {
        bindModel:'=ngModel',
        minDate: '=',
        maxDate: '='
      },
      templateUrl: 'html/partials/tdp-invest-datepicker-template.html',
      link: function (scope, element, attributes) {
        scope.popup = {
          opened: false
        };

       scope.dateOptions = {
          formatYear: 'yy',
          maxDate: scope.maxDate,
          minDate: scope.minDate,
          startingDay: 1,
          showWeeks: false
        };

        scope.open = function() {
          scope.popup.opened = true;
        };

        scope.$watch("maxDate",function(value, oldValue){
          if(!oldValue) {
            scope.dateOptions.maxDate = value;
          }
        });
        scope.$watch("minDate",function(value, oldValue){
          if(!oldValue) {
             scope.dateOptions.minDate = value;
          }
        });
      },
    };
  });
});