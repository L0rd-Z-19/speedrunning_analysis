d3.json("/json").then(function(data){  
    //get a full list of every developer for all games
    publishers = [];
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
        selectedOption = d3.select(this).property("value");
        //change the title
        title.remove;
        title.text(selectedOption);
        //call the update function
        getData(data,selectedOption,region);
    })
    
    //create the region dropdown
    var regions = ["Global Sales", "North American Sales", "European Sales", "Japanese Sales"];
    var regionDrp = d3.select("#plot").append("span").append("select");
    for(i=0;i<regions.length;i++){
        regionDrp
        .append("option")
        .text(regions[i])
        .attr("value", regions[i]);
    }

    var region = "Global Sales";

    regionDrp.on("change",function(d){
        //remove svg
        d3.select("svg").remove();
        //update with the new region
        region = d3.select(this).property("value");
        //redraw SVG
        getData(data,selectedOption,region);
    })
    getData(data,selectedOption,region);
})

function getData(data,selectedOption,region){
    pub = [];
    for(i=0; i < data.length; i++){
        //If the publisher === selected publisher add it to the list
        if(data[i]["publisher"] === selectedOption){
            pub.push(data[i])
        }
    }
    for(i=0;i < pub.length;i++){
        pub[i].pubRank = i + 1;
    }
    createSVG(pub,selectedOption,region);
}

function createSVG(data,selectedOption,region){
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
    
    var toolTip = d3
    .tip()
    .attr("class", "d3-tip")
    .html(function(d) {
        // Grab the Game title.
        var theTitle = '<div> Game Title: ' + d.name + "</div>";
        var thePlatform = '<div> Platform: ' + d.platform + "</div>";
        var theGenre = '<div> Genre: ' + d.genre + "</div>";
        var theRank = '<div> Overall Rank: ' + d.rank + "</div>";
        var thePubRank = '<div> ' + d.publisher + ' Rank: ' + d.pubRank + "</div>";
        var theSales;
        if(region === "Global Sales"){theSales='<div> Global Sales: ' + d.global_sales + "</div>"}
        else if(region === "North American Sales"){theSales='<div> North American Sales: ' + d.na_sales + "</div>"}
        else if(region === "European Sales"){theSales='<div> European Sales: ' + d.eu_sales + "</div>"}
        else if(region === "Japanese Sales"){theSales='<div> Japanese Sales: ' + d.jp_sales + "</div>"}
        
        return theTitle + thePlatform + theGenre + theRank + thePubRank+ theSales;
    });
    // Call the toolTip function.
    svg.call(toolTip);
    //x-axis
    var x = d3.scaleLinear()
        .domain([0,data.length])
        .range([0,width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    //y-axis
    var y = d3.scaleLinear()
        .domain([0,data[0].global_sales])
        .range([height,0]);
    svg.append("g")
        .call(d3.axisLeft(y));
    //add the data
    if(region === "Global Sales"){
    svg.append('g')
        .selectAll("circle")
        .data(pub)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.pubRank); })
            .attr("cy", function (d) { return y(d.global_sales); })
            .attr("r", 7)
            .attr("opacity", ".6 ")
            .style("fill", "#C98C3E")
            // Hover rules
    .on("mouseover", function(d) {
        // Show the tooltip
        toolTip.show(d, this);
        // Highlight the state circle's border
        d3.select(this).style("stroke", "#323232");
      })
      .on("mouseout", function(d) {
        // Remove the tooltip
        toolTip.hide(d);
        // Remove highlight
        d3.select(this).style("stroke", "#e3e3e3");
      });
  
    }
    else if(region === "North American Sales"){
        svg.append('g')
        .selectAll("circle")
        .data(pub)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.pubRank); })
            .attr("cy", function (d) { return y(d.na_sales); })
            .attr("r", 7)
            .attr("opacity", ".6 ")
            .style("fill", "#C98C3E")
            // Hover rules
    .on("mouseover", function(d) {
        // Show the tooltip
        toolTip.show(d, this);
        // Highlight the state circle's border
        d3.select(this).style("stroke", "#323232");
      })
      .on("mouseout", function(d) {
        // Remove the tooltip
        toolTip.hide(d);
        // Remove highlight
        d3.select(this).style("stroke", "#e3e3e3");
      });
  
    }
    else if(region === "European Sales"){
        svg.append('g')
        .selectAll("circle")
        .data(pub)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.pubRank); })
            .attr("cy", function (d) { return y(d.eu_sales); })
            .attr("r", 7)
            .attr("opacity", ".6 ")
            .style("fill", "#C98C3E")
            // Hover rules
    .on("mouseover", function(d) {
        // Show the tooltip
        toolTip.show(d, this);
        // Highlight the state circle's border
        d3.select(this).style("stroke", "#323232");
      })
      .on("mouseout", function(d) {
        // Remove the tooltip
        toolTip.hide(d);
        // Remove highlight
        d3.select(this).style("stroke", "#e3e3e3");
      });
  
    }
    else if(region === "Japanese Sales"){
        svg.append('g')
        .selectAll("circle")
        .data(pub)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.pubRank); })
            .attr("cy", function (d) { return y(d.jp_sales); })
            .attr("r", 7)
            .attr("opacity", ".6 ")
            .style("fill", "#C98C3E")
            // Hover rules
    .on("mouseover", function(d) {
        // Show the tooltip
        toolTip.show(d, this);
        // Highlight the state circle's border
        d3.select(this).style("stroke", "#323232");
      })
      .on("mouseout", function(d) {
        // Remove the tooltip
        toolTip.hide(d);
        // Remove highlight
        d3.select(this).style("stroke", "#e3e3e3");
      });
  
    }
    //Add the x Axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    //label for the x axis
    svg.append("text")             
    .attr("transform",
        "translate(" + (width/2) + " ," + (height + margin.top + 18) + ")")
    .style("text-anchor", "middle")
    .text("Games By " + selectedOption);

    //label for the y Axis
    svg.append("g").attr("class", "yOpt")
    .call(d3.axisLeft(y));
    var yOpt = d3.select(".yOpt");

    //Change name based on selected option (NA, EU, JP, Global)
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(region + " (In Millions)");
}