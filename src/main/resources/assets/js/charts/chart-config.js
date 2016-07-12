var chartConfig = {
    options: {
        chart: {
            zoomType: 'x'
        },
        rangeSelector: {
            inputEnabled: false
        },
        navigator: {
            enabled: true
        }
    },
    series: [{
        name: "Fund",
        //data: inputData,
        tooltip: {
            valueDecimals: 2,
            valuePrefix: "$",
            xDateFormat: '%y-%m-%d'
        }
    }],
    title: {
        text: 'Time series'
    },
    useHighStocks: true
};