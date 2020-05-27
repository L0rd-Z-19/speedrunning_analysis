d3.csv("game_data.csv").then(function(importedData) {

    var data = importedData;

    console.log(data);

    var titles = [];
    var released = [];
    var publishers = [];
    var sales = [];
    
    data.forEach(function(data){
        data.sales = +data.sales;
        titles.push(data.Title);
        released.push(data.Released);
        publishers.push(data.Publisher);
        sales.push(data.Sales);
    })

    var top_titles = titles.slice(0, 10);
    var top_released = released.slice(0, 10);
    var top_publishers = publishers.slice(0, 10);
    var top_sales = sales.slice(0, 10);

    var trace1 = {
        x: top_titles,
        y: top_sales,
        type: 'bar'
    };

    var layout = {
        title: "Bestselling Games of All Time",
        yaxis: {title: "Sales (In Millions)"}
    }

    var plot1 = [trace1];

    Plotly.newPlot('plot1', plot1, layout);

});
