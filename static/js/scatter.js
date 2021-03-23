const svgWidth = 960;
const svgHeight = 600;

const margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
};

// Calculate chart width and height
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
const svg = d3.select("#scatter")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

// Append SVG group
const chartGroup = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)

// Initial params
var chosenYaxis = "Happiness Score";
var chosenXaxis = "Wealth";

// function used for updating xAxis const upon click on axis label
function renderXAxes(newXScale, xAxis) {
  const bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}
// function used for updating yAxis const upon click on axis label
function renderYAxes(newYScale, yAxis) {
  const leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}


// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {
  console.log(chosenXAxis);
  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cy", d=>newYScale(d[chosenYAxis]));
  return circlesGroup;
}
function renderTexts(txtGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {

  txtGroup.transition()
    .duration(1000)
    .attr("x", d=>newXScale(d[chosenXAxis]))
    .attr("y", d=>newYScale(d[chosenYAxis]))
  return txtGroup;
}

// function used for updating x-scale const upon click on axis label
function xScale(HappinessData, chosenXaxis) {
    // create scales
    const xLinearScale = d3.scaleLinear()
      .domain([d3.min(HappinessData, d => d[chosenXaxis]-.2),
        d3.max(HappinessData, d => d[chosenXaxis]+.2)
      ])
      .range([0, width]);
    return xLinearScale;
}
function yScale() {
    // create scales
    const yLinearScale = d3.scaleLinear()
      .domain([0, 8])
      .range([height, 0]);
    return yLinearScale;
}

// function used for updating tooltip for circles group
function updateToolTip(chosenXaxis, chosenYaxis, circlesGroup){
  let xLabel = ""
  let yLabel = ""
  if (chosenXaxis === "HappinessScore"){
    xLabel = "Happiness Score";
  }
  else if (chosenXaxis === "Wealth"){
    xLabel = "GDP per Capita";
  }
  else if (chosenXaxis === "Family"){
    xLabel = "Family";
  }
  else if (chosenXaxis === "Health"){
    xLabel = "Health (Life Expectancy";
  }
  else if (chosenXaxis === "Freedom"){
    xLabel = "Freedom";
  }
  else if (chosenXaxis === "Trust"){
    xLabel = "Trust (Perception Of Government Corruption)";
  }
  else{
    xLabel = "Generosity";
  }
  if (chosenYaxis === "HappinessScore"){
    yLabel = "Happiness Score";
  }
  // const toolTip = d3.tip()
  //                   .attr("class", "d3-tip")
  //                   .offset([80, -60])
  //                   .html(function(d){
  //                     return(`${d.country}<br>${xLabel}${d[chosenXaxis]}<br>${yLabel}${d[chosenYaxis]}`)
  //                     })
  
  // circlesGroup.call(toolTip);
  // circlesGroup.on("mouseover", function(data){
  //   toolTip.show(data, this);
  //   d3.select(this).style("stroke", "black");
    
  // })
  // circlesGroup.on("mouseout", function(data, index){
  //   toolTip.hide(data, this)
  //   d3.select(this).style("stroke", "white");
  // })
  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below

d3.csv('static/data/clean/2020.csv',function(HappinessData){
  console.log(chosenXaxis);
    
    // parse data to interger from string
    HappinessData.forEach(function(data){
        data.HappinessScore = +data.HappinessScore;
		    data.Wealth = +data.Wealth;
        data.Health = +data.Health;
        data.Family = +data.Family;
        data.Freedom = +data.Freedom;
        data.Trust = +data.Trust;
        data.Generosity = +data.Generosity;
    })
    console.log(HappinessData)
    // xLinearScale function after csv import
    let xLinearScale = xScale(HappinessData, chosenXaxis);

    // yLinearScale function after csv import
    let yLinearScale = yScale(HappinessData, chosenYaxis)

    // Create initial axis functions
    const bottomAxis = d3.axisBottom(xLinearScale);
    const leftAxis = d3.axisLeft(yLinearScale);

    // append X-axis
    let xAxis = chartGroup.append("g")
                        .attr('class',"axisWhite")
                        .attr("transform", `translate(0, ${height})`)

                        .call(bottomAxis)
    
    let yAxis = chartGroup.append("g")
                        .attr("class","axisWhite")
                        .call(leftAxis)
    
    let crlTxtGroup = chartGroup.selectAll("mycircles")
                      .data(HappinessData)
                      .enter()
                      .append("g")
    
    let circlesGroup = crlTxtGroup.append("circle")
                            .attr("cx", d=>xLinearScale(d[chosenXaxis]))
                            .attr("cy", d=>yLinearScale(d[chosenYaxis]))
                            .classed("stateCircle", true)
                            .attr("r", 8)
                            .attr("opacity", "1");

    let txtGroup = crlTxtGroup.append("text")
                              .text(d=>d.abbr)
                              .attr("x", d=>xLinearScale(d[chosenXaxis]))
                              .attr("y", d=>yLinearScale(d[chosenYaxis])+3)
                              .classed("stateText", true)
                              .style("font-size", "7px")
                              .style("font-weight", "800")

     // Create group for  3 x- axis labels
     
    // Create group for  3 y- axis labels
    const ylabelsGroup = chartGroup.append("g")
                                .attr("transform", `translate(${0-margin.left/4}, ${height/2})`);

    
    const x_WealthLabel = d3.select('#gdpButt').attr('value','Wealth');

    const x_FamilyLabel = d3.select('#familyButt').attr('value','Family');

	  const x_HealthLabel = d3.select("#healthButt").attr('value','Health');

	  const x_FreedomLabel = d3.select('#freeButt').attr('value','Freedom');

	  const x_TrustLabel = d3.select('#trustButt').attr('value','Trust');
    
	  const x_GenerosityLabel = d3.select('#generousButt').attr('value','Generosity');

   const y_HappinessLabel = ylabelsGroup.append("text")
                                .attr("y", 0 - 20)
                                .attr("x", 0)
                                .attr("transform", "rotate(-90)")
                                .attr("dy", "1em")
                                .attr("value", "HappinessScore")
                                .attr('class','active aText')
                                .text("Happiness Score");
    
    

     // updateToolTip function after csv import
    //  circlesGroup = updateToolTip(chosenXaxis, chosenYaxis, circlesGroup);

    // x axis labels event listener
    d3.selectAll(".btn")
        .on("click", function() {
        // get value of selection
        const value = d3.select(this).attr("value");
        console.log(`${value} click`)
        if (value !== chosenXaxis) {

            // replaces chosenXAxis with value
            chosenXaxis = value;
            console.log(chosenXaxis)

            // functions here found above csv import
            // updates x scale for new data
            xLinearScale = xScale(HappinessData, chosenXaxis);

            // updates x axis with transition
            xAxis = renderXAxes(xLinearScale, xAxis);

            // updates circles with new x values
            circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXaxis, chosenYaxis);

             // updates texts with new x values
            txtGroup = renderTexts(txtGroup, xLinearScale, yLinearScale, chosenXaxis, chosenYaxis);

            // changes classes to change bold text
            if (chosenXaxis === "Wealth"){
                x_WealthLabel
                  .attr('class','btn btn-primary');
                x_FamilyLabel
                  .attr('class','btn btn-warning');
				        x_HealthLabel
                  .attr('class','btn btn-warning');
				        x_FreedomLabel
                  .attr('class','btn btn-warning');
				        x_TrustLabel
                  .attr('class','btn btn-warning');
				        x_GenerosityLabel
                  .attr('class','btn btn-warning');
            }
			      else if (chosenXaxis === "Family"){
                
                x_WealthLabel
                .attr('class','btn btn-warning');
                x_FamilyLabel
                .attr('class','btn btn-primary');
				        x_HealthLabel
                .attr('class','btn btn-warning');
			        	x_FreedomLabel
                .attr('class','btn btn-warning');
				        x_TrustLabel
                .attr('class','btn btn-warning');
				        x_GenerosityLabel
                .attr('class','btn btn-warning');
            }
		        else if (chosenXaxis === "Health"){
                x_WealthLabel
                .attr('class','btn btn-warning');
                x_FamilyLabel
                .attr('class','btn btn-warning');
				        x_HealthLabel
                .attr('class','btn btn-primary');
				        x_FreedomLabel
                .attr('class','btn btn-warning');
			        	x_TrustLabel
                .attr('class','btn btn-warning');
			        	x_GenerosityLabel
                .attr('class','btn btn-warning');
            }
			      else if (chosenXaxis === "Freedom"){
                
                x_WealthLabel
                .attr('class','btn btn-warning');
                x_FamilyLabel
                .attr('class','btn btn-warning');
				        x_HealthLabel
                .attr('class','btn btn-warning');
				        x_FreedomLabel
                .attr('class','btn btn-primary');
				        x_TrustLabel
                .attr('class','btn btn-warning');
				        x_GenerosityLabel
                .attr('class','btn btn-warning');
            }
			      else if (chosenXaxis === "Trust"){
                
                x_WealthLabel
                .attr('class','btn btn-warning');
                x_FamilyLabel
                .attr('class','btn btn-warning');
				        x_HealthLabel
                .attr('class','btn btn-warning');
			        	x_FreedomLabel
                .attr('class','btn btn-warning');
			        	x_TrustLabel
                .attr('class','btn btn-primary');
			        	x_GenerosityLabel
                .attr('class','btn btn-warning');
            }
            else {
              x_WealthLabel
                .attr('class','btn btn-warning');
                x_FamilyLabel
                .attr('class','btn btn-warning');
				        x_HealthLabel
                .attr('class','btn btn-warning');
			        	x_FreedomLabel
                .attr('class','btn btn-warning');
			        	x_TrustLabel
                .attr('class','btn btn-warning');
			        	x_GenerosityLabel
                .attr('class','btn btn-primary');
			       
            }
          // update tooltip with new info after changing x-axis 
          // circlesGroup = updateToolTip(chosenXaxis, chosenYaxis, circlesGroup); 
      }})
// y axis labels event listener

     // update tooltip with new info after changing y-axis 
    //  circlesGroup = updateToolTip(chosenXaxis, chosenYaxis, circlesGroup); 
  
})
// })()