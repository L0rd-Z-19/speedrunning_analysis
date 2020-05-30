d3.json("/json").then(function(data){  
    //get a full list of every developer for all games
    publishers = ["",];
    for(i=0; i < data.length; i++){
        //If the publisher === selected publisher add it to the list
        publishers.push(data[i]["publisher"])       
    }
    //narrow that list to only the unique publishers
    var opt = [...new Set(publishers)];
    //make a dropdown of all publishers
    var dropDown = d3.select("#btn").append('select');
    dropDown
    .selectAll('myOptions')
    .data(opt)
    .enter()
    .append('option')
    .text(function (d) { return d;})
    .attr("value", function (d) { return d;})
    
    //title of graph (h1 tag at the top of the page)
    var title = d3.select("#title");
    //define selectedOption
    var selectedOption = "Nintendo";
    //select the dropdown value
    dropDown.on("change",function(d) {
        //remove svg
        d3.select("svg").remove();
        //get the new selected value
        selectedOption = d3.select(this).property("value")
        //change the title
        title.remove;
        title.text(selectedOption);
        //call the update function
        createSVG(data,selectedOption);
    })
    createSVG(data,selectedOption);
})
function createSVG(data,selectedOption){
    pub = [];
    for(i=0; i < data.length; i++){
        //If the publisher === selected publisher add it to the list
        if(data[i]["publisher"] === selectedOption){
            pub.push(data[i])
        }
    }

    //Plot the data!!!!
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 690 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
    //svg object
    var svg = d3.select("#plot")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    //x-axis
    var x = d3.scaleLinear()
        .domain([0,16598])
        .range([0,width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    //y-axis
    var y = d3.scaleLinear()
        .domain([0,85])
        .range([height,0]);
    svg.append("g")
        .call(d3.axisLeft(y));
    //add the data
    svg.append('g')
        .selectAll("circle")
        .data(pub)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.rank); })
            .attr("cy", function (d) { return y(d.global_sales); })
            .attr("r", 10)
            .attr("opacity", ".8")
            .style("fill", "#565051")
    
    // Add the x Axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // text label for the x axis
    svg.append("text")             
    .attr("transform",
        "translate(" + (width/2) + " ," + (height + margin.top + 18) + ")")
    .style("text-anchor", "middle")
    .text("Games By " + selectedOption);

    // Add the y Axis
    svg.append("g")
    .call(d3.axisLeft(y));

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of Sales (Globaly)");
}