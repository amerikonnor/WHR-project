function makeResponsive(){
  d3.select('div#scatter').selectAll('svg').remove();
  d3.select('div#slider-vertical').selectAll('svg').remove();
  
  const svgWidth = window.innerWidth * .6;
  const svgHeight = svgWidth / 1.6 ;
  

  const margin = {
      top: 40,
      right: 40,
      bottom: 40,
      left: 80
  };

  // Calculate chart width and height
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  const svg = d3.select("#scatter")
              .append("svg")
              .attr("width", svgWidth)
              .attr("height", svgHeight)
              .attr('id','#scatterSVG')

  // Append SVG group
  var chartGroup = svg.append("g")
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
    
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr("cy", d=>newYScale(d[chosenYAxis]));
    return circlesGroup;
  }
  function renderTexts(txtGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {

    txtGroup.transition()
      .duration(1000)
      .attr("x", d=>newXScale(d[chosenXAxis])-5)
      .attr("y", d=>newYScale(d[chosenYAxis])+3)
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

  // Retrieve data from the CSV file and execute everything below
  function makeThePlot(){
    chartGroup.selectAll('g').remove()
    year = d3.select('p#value-vertical').attr('value');
    datafile = 'static/data/clean/' + year + '.csv'
    d3.csv(datafile,function(HappinessData){
    
        
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
                                  .text(d=>d.Code)
                                  .attr("x", d=>xLinearScale(d[chosenXaxis])-5)
                                  .attr("y", d=>yLinearScale(d[chosenYaxis])+3)
                                  .classed("stateText", true)
                                  .style("font-size", "7px")
                                  .style("font-weight", "800")

        //add a div for the tooltip
        d3.selectAll('.tooltip').remove();
        var toolTip = d3.select("body").append("div")
          .attr("class","tooltip");
        
        crlTxtGroup.on("mouseover", function(d,i){
          toolTip.style("display","block");
          toolTip.html(`Country: <strong>${d.Country}</strong> <br>`+
                        `Happiness Score: <strong>${(+d['Happiness Score']).toFixed(2)}</strong><br>`+
                        `Factor Impact: <strong>${(+d[chosenXaxis]).toFixed(2)}</strong>`
          ).style("left",d3.event.pageX + "px")
          .style("top",d3.event.pageY + "px");
        }).on("mouseout",function(){
          toolTip.style("display","none")
        })
          
        
        const ylabelsGroup = chartGroup.append("g")
                                    .attr("transform", `translate(${0-margin.left/4}, ${height/2})`);

        
        const x_WealthLabel = d3.select('#gdpButt').attr('value','Wealth');

        const x_FamilyLabel = d3.select('#familyButt').attr('value','Family');

        const x_HealthLabel = d3.select("#healthButt").attr('value','Health');

        const x_FreedomLabel = d3.select('#freeButt').attr('value','Freedom');

        const x_TrustLabel = d3.select('#trustButt').attr('value','Trust');
        
        const x_GenerosityLabel = d3.select('#generousButt').attr('value','Generosity');

        const y_HappinessLabel = ylabelsGroup.append("text")
                                    .attr("y", -40)
                                    .attr("x", -40)
                                    .attr("transform", "rotate(-90)")
                                    .attr("dy", "1em")
                                    .attr("value", "HappinessScore")
                                    .attr('class','aText')
                                    .text("Happiness Score");
        
        

        

        // x axis labels event listener
        d3.selectAll(".btn")
            .on("click", function() {
            // get value of selection
            const value = d3.select(this).attr("value");
           
            if (value !== chosenXaxis) {

                // replaces chosenXAxis with value
                chosenXaxis = value;
                

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
          }})
    })
  }


  d3.select('p#value-vertical').attr('value',2020);

  sliderHeight = svgHeight * .75;

  var sliderVertical = d3.sliderLeft()
                      .min(2015)
                      .max(2020)
                      .step(1)
                      .height(sliderHeight)
                      .tickFormat(d3.format('2'))
                      .ticks(5)
                      .default(2020)
                      .on('onchange',val => {
                        d3.select('p#value-vertical').attr('value',val);
                        makeThePlot()
                      });

  var gVertical = d3.select('div#slider-vertical')
                      .append('svg')
                      .attr('width',100)
                      .attr('height',svgHeight)
                      .append('g')
                      .attr('transform','translate(60,30)');

  gVertical.call(sliderVertical);

  makeThePlot(2020);
}
makeResponsive();
d3.select(window).on('resize',makeResponsive);