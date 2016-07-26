define([], function() {
    var stubUnitData = {};

    var testData = [{date:883954800000,
                     id:1,
                     value:100},
                    {date:884041200000,
                      id:2,
                      value:100},
                    {date:884127600000,
                      id:3,
                      value:100},
                    {date:884214000000,
                      id:4,
                      value:100}];

    stubUnitData.getAll = function() {
        return testData;
    };
    stubUnitData.getAllWithinRange = function() {
        return testData.slice(1,3);
    };

    return stubUnitData;
});