var chartConfig = {
    options: {
        chart: {
            zoomType: 'x'
        },
        rangeSelector: {
            enabled: true
        },
        navigator: {
            enabled: true
        }
    },
    series: [{
        data: inputData
    }],
        title: {
    text: 'Time series'
},
    useHighStocks: true
};