define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestCompareService', 'Chart', 'angular-material'], function(angular, tdpInvestModule, tdpInvestCompareService, Chart) {
    tdpInvestModule.controller("tdpInvestCompareController", ['$scope', '$stateParams', 'get_all', function($scope, $stateParams, get_all) {
        $scope.objects = get_all();

        var ctx = document.getElementById("myChart");
        var scatterChart = new Chart(ctx, {
             type: 'line',
             data: {
                 datasets: [{
                     label: 'Scatter Dataset',
                     data: get_all()
                 }]
             },
             options: {
                 scales: {
                     xAxes: [{
                         type: 'linear',
                         position: 'bottom'
                     }]
                 }
             }
          });

    }]);

});