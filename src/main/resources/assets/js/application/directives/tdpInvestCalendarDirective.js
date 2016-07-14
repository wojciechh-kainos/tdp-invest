define(['angular', 'application/tdpInvestModule', 'ui-bootstrap', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
tdpInvestModule.directive('tdpCalendar', function() {
            return {
              templateUrl: 'html/partials/tdp-invest-calendar.html'
            };
          });
});