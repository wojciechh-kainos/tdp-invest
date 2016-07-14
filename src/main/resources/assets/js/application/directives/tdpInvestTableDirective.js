define(['angular', 'application/tdpInvestModule', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.directive('tdpTable', function() {
       return {
           templateUrl: 'html/partials/tdp-invest-table.html',
       };
   });
});
