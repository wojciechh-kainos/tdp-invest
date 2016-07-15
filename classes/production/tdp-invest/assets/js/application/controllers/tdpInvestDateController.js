define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestDateController", function($scope, $stateParams, tdpPersonService) {
        $scope.test = "";
        var Dates = [
            {
                p : '2016-01-01',
                k : '2016-02-01'
            },
            {
                p : '2016-03-01',
                k : '2016-04-01'
            },
             {
                 p : '2016-06-01',
                 k : '2016-08-01'
             },
             {
                 p : '2016-09-05',
                 k : '2016-09-06'
             }

        ];

        var Request = [];

        var T0 = '2015-12-31';
        var TX = '2017-09-05';

        for(var i = 0; i < Dates.length; i++){

            if(date(T0) < date(Dates[i].p)){
                if(date(TX) < date(Dates[i].p)){
                    Request.push(request(T0, TX));
                    break;
                }
                else{
                    Request.push(request(T0, Dates[i].p));
                    T0 = Dates[i].p;
                }
            }

            if(i == Dates.length - 1){
                if(date(TX) > date(Dates[i].k))
                    Request.push(request(Dates[i].k, TX));
                break;
            }

            if(date(T0) < date(Dates[i + 1].p)){
                if(date(T0) <= date(Dates[i].k)){
                    T0 = Dates[i].k;
                }
                if(date(TX) <= date(Dates[i].k)){
                    break;
                }else if(date(TX) <= date(Dates[i+1].p)){
                    Request.push(request(T0, TX));
                }
            }
        }
        for(var i = 0; i < Request.length; i++){
            $scope.test += "P = " + Request[i].p + " K = " + Request[i].k + ", ";
        }


    });
});

function date(date){
    return new Date(date).getTime();
}

function request(p, k){
    console.log("Create request: p = " + p + " K = " + k + "\n");
    return {p : p, k : k};
}
