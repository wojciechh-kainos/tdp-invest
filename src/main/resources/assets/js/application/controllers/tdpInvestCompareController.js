define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams) {

        //data
        var collection = [];
        //sort on date
        $scope.sort = 'price';
        $scope.reverse = false;

        $scope.sortTable = function (sort){
            console.log($scope.sort);
            console.log(sort);
            if($scope.sort === sort){
                $scope.reverse = !$scope.reverse;
            }
            $scope.sort = sort;
        }

        //temporary data generator
        function generate(n){
            var collection = [];

            var date = new Date();
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var y = date.getFullYear();

            for(var i = 0; i < n; i++){
                date = dd + "-" + mm + "-" + y;
                price = (Math.random() * (3.120 - 0.0200) + 0.0200).toFixed(4);
                collection.push({date : date, price : price});
                dd++;
             }
             return collection;
        }

        collection = generate(20);
        $scope.collection = collection;

    });
});
