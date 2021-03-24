//the do-not-do-this global variable!!!?!?!!?
var years = [2015,2016,2017,2018,2019,2020];
var tableYears = years.map(d=>d);
tableYears.unshift('');

function optionChanged(id) {
    d3.selectAll('.form-check-input').property('checked',false);
    checked = [];
    

    makeTheGraph(id);
    updateDemoInfo(id)
};

function updateDemoInfo(country){
    d3.csv("static/data/clean/combined_with_avgHappy.csv").then((data) => {
        var first_ID = data.filter(x => x.Country === country)[0];
    
    var happiness = [];
    var gdp = [];
    var family = [];
    var health = [];
    var freedom = [];
    var corruption = [];
    var generosity = [];
    Object.keys(first_ID).forEach(key =>{
        if (key.includes('Happiness')){
            happiness.push(first_ID[key]);
        }
        else if (key.includes('GDP')){
            gdp.push(first_ID[key]);
        }
        else if (key.includes('Fam')){
            family.push(first_ID[key]);
        }
        else if (key.includes('Health')){
            health.push(first_ID[key]);
        }
        else if (key.includes('Free')){
            freedom.push(first_ID[key]);
        }
        else if (key.includes('Perc')){
            corruption.push(first_ID[key]);
        }
        else if (key.includes('Gene')){
            generosity.push(first_ID[key]);
        }

    })
    
    
    d3.select('.panel-title').text(`World Happiness Data for ${country}`)
    d3.select('table').remove()
    var table = d3.select('#table-goes-here').append('table').attr('class','table');
    var tableHead = table.append('thead');
    var tableHeadRow = tableHead.append('tr').attr('class','table-primary');
    
    
    tableHeadRow.selectAll('th').data(tableYears)
            .enter()
            .append('th')
            .text(d=>d)

    var tableBody = table.append('tbody');

    var happyRow = tableBody.append('tr');
    happyRow.append('th').attr('class','table-secondary').text('Happiness Score')
    happyRow.selectAll('td').data(happiness)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));

    var gdpRow = tableBody.append('tr');
    gdpRow.append('th').attr('class','table-secondary').text('Impact of GDP');
    gdpRow.selectAll('td').data(gdp)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));

    var famRow = tableBody.append('tr');
    famRow.append('th').attr('class','table-secondary').text('Impact of Social Support');
    famRow.selectAll('td').data(family)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4)); 
    
    var healthRow = tableBody.append('tr');
    healthRow.append('th').attr('class','table-secondary').text('Impact of Life Expectancy');
    healthRow.selectAll('td').data(health)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));
    
    var freeRow = tableBody.append('tr');
    freeRow.append('th').attr('class','table-secondary').text('Impact of Freedom');
    freeRow.selectAll('td').data(freedom)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));

    var corruptionRow = tableBody.append('tr');
    corruptionRow.append('th').attr('class','table-secondary').text('Impact of Perceived Corruption');
    corruptionRow.selectAll('td').data(corruption)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));

    var geneRow = tableBody.append('tr');
    geneRow.append('th').attr('class','table-secondary').text('Impact of Generosity');
    geneRow.selectAll('td').data(generosity)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4))
    })
}

function makeTheGraph(country){
    
    
    d3.csv("static/data/clean/combined_with_avgHappy.csv").then((data) => {
        var first_ID = data.filter(x => x.Country === country)[0];
    
    var happiness = [];
    var gdp = [];
    var family = [];
    var health = [];
    var freedom = [];
    var corruption = [];
    var generosity = [];
    Object.keys(first_ID).forEach(key =>{
        if (key.includes('Happiness')){
            happiness.push(first_ID[key]);
        }
        else if (key.includes('GDP')){
            gdp.push(first_ID[key]);
        }
        else if (key.includes('Fam')){
            family.push(first_ID[key]);
        }
        else if (key.includes('Health')){
            health.push(first_ID[key]);
        }
        else if (key.includes('Free')){
            freedom.push(first_ID[key]);
        }
        else if (key.includes('Perc')){
            corruption.push(first_ID[key]);
        }
        else if (key.includes('Gene')){
            generosity.push(first_ID[key]);
        }

    })

    var trace1 = {
        x : years,
        y : happiness,
        type : 'line',
        
    };
    var graphData = [trace1];


    var layout1 = {
        title : `${first_ID.Country} Happiness`,
        showgrid: false
    };

    // Create bar chart
    
    var config = {responsive:true}
    Plotly.newPlot('bar', graphData, layout1,config);

    

    });
}
//When going to initial html page, creates function so pages loads on first dropdown
function init(country) {
    d3.csv("static/data/clean/combined_with_avgHappy.csv").then((data) => {
        theGoodStuff = data;
        var names = data.map(x => x.Country)
        names.forEach(function(name) {
            d3.select('#selDataset')
                .append('option')
                .attr('value',name)
                .text(name)
            });  

    
            
    
    var first_ID = data.filter(x => x.Country === country)[0];
    
    var happiness = [];
    var gdp = [];
    var family = [];
    var health = [];
    var freedom = [];
    var corruption = [];
    var generosity = [];
    Object.keys(first_ID).forEach(key =>{
        if (key.includes('Happiness')){
            happiness.push(first_ID[key]);
        }
        else if (key.includes('GDP')){
            gdp.push(first_ID[key]);
        }
        else if (key.includes('Fam')){
            family.push(first_ID[key]);
        }
        else if (key.includes('Health')){
            health.push(first_ID[key]);
        }
        else if (key.includes('Free')){
            freedom.push(first_ID[key]);
        }
        else if (key.includes('Perc')){
            corruption.push(first_ID[key]);
        }
        else if (key.includes('Gene')){
            generosity.push(first_ID[key]);
        }

    })
    
    
    d3.select('.panel-title').text(`World Happiness Data for ${country}`)
    d3.select('table').remove()
    var table = d3.select('#table-goes-here').append('table').attr('class','table');
    var tableHead = table.append('thead');
    var tableHeadRow = tableHead.append('tr').attr('class','table-primary');
    
    
    tableHeadRow.selectAll('th').data(tableYears)
            .enter()
            .append('th')
            .text(d=>d)

    var tableBody = table.append('tbody');

    var happyRow = tableBody.append('tr');
    happyRow.append('th').attr('class','table-secondary').text('Happiness Score')
    happyRow.selectAll('td').data(happiness)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));

    var gdpRow = tableBody.append('tr');
    gdpRow.append('th').attr('class','table-secondary').text('Impact of GDP');
    gdpRow.selectAll('td').data(gdp)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));

    var famRow = tableBody.append('tr');
    famRow.append('th').attr('class','table-secondary').text('Impact of Social Support');
    famRow.selectAll('td').data(family)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4)); 
    
    var healthRow = tableBody.append('tr');
    healthRow.append('th').attr('class','table-secondary').text('Impact of Life Expectancy');
    healthRow.selectAll('td').data(health)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));
    
    var freeRow = tableBody.append('tr');
    freeRow.append('th').attr('class','table-secondary').text('Impact of Freedom');
    freeRow.selectAll('td').data(freedom)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));

    var corruptionRow = tableBody.append('tr');
    corruptionRow.append('th').attr('class','table-secondary').text('Impact of Perceived Corruption');
    corruptionRow.selectAll('td').data(corruption)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));

    var geneRow = tableBody.append('tr');
    geneRow.append('th').attr('class','table-secondary').text('Impact of Generosity');
    geneRow.selectAll('td').data(generosity)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4))
    

    // Create bar chart trace and layout
   
    
    var trace1 = {
        x : years,
        y : happiness,
        type : 'line',
        
    };

    var layout1 = {
        title : `${first_ID.Country} Happiness`
    };

    // Create bar chart
    var graphData = [trace1];
    var config = {responsive:true}
    Plotly.newPlot('bar', graphData, layout1,config);

    

    });
}; 

init('Switzerland');

//trying to add a second axis? so plot factors versus happiness on same graph possibly
// have to figure out which boxes are checked first
var checked = [];
var gdpCheckBox = d3.select('#gdpCheckBox');
var freedomCheckBox = d3.select('#freedomCheckBox');

var checkBoxes = [gdpCheckBox,freedomCheckBox];


// Bar chart update

function checkBoxAction(box) {
    var country = document.querySelector('#selDataset');

    
    
        
         var index = checked.indexOf(box);
            if (index >-1){
            checked.splice(index,1);
        }
        else{
            checked.push(box)
        }
    
    if (checked.length < 1){
        makeTheGraph(country.value);
    }
    else {
        somethingCool(country.value);
    }
};

function somethingCool(country){
   
    
    d3.csv("static/data/clean/combined_with_avgHappy.csv").then((data) => {
        var first_ID = data.filter(x => x.Country === country)[0];
    
        var happiness = [];
        var gdp = [];
        var family = [];
        var health = [];
        var freedom = [];
        var corruption = [];
        var generosity = [];
        Object.keys(first_ID).forEach(key =>{
            if (key.includes('Happiness')){
                happiness.push(first_ID[key]);
            }
            else if (key.includes('GDP')){
                gdp.push(first_ID[key]);
            }
            else if (key.includes('Fam')){
                family.push(first_ID[key]);
            }
            else if (key.includes('Health')){
                health.push(first_ID[key]);
            }
            else if (key.includes('Free')){
                freedom.push(first_ID[key]);
            }
            else if (key.includes('Perc')){
                corruption.push(first_ID[key]);
            }
            else if (key.includes('Gene')){
                generosity.push(first_ID[key]);
            }

        })

        var trace1 = {
            x : years,
            y : happiness,
            name: 'Happiness Score',
            type : 'line',
            
        };
        var graphData = [trace1];

        checked.forEach(box =>{
            var trace = {};
            if (box == 'gdp'){
                trace['x'] = years
                trace['y'] = gdp
                trace['type'] = 'line'
                trace['yaxis'] = 'y2',
                trace['name'] = 'GDP per Capita'
                graphData.push(trace)
            }
            else if (box == 'freedom'){
                trace['x'] = years
                trace['y'] = freedom
                trace['type'] = 'line'
                trace['yaxis'] = 'y2',
                trace['name'] = 'Freedom'
                graphData.push(trace)
            }
            else if (box == 'health'){
                trace['x'] = years
                trace['y'] = health
                trace['type'] = 'line'
                trace['yaxis'] = 'y2',
                trace['name'] = 'Healthy Life Expectancy'
                graphData.push(trace)
            }
            else if (box == 'family'){
                trace['x'] = years
                trace['y'] = family
                trace['type'] = 'line'
                trace['yaxis'] = 'y2',
                trace['name'] = 'Family'
                graphData.push(trace)
            }
            else if (box == 'trust'){
                trace['x'] = years
                trace['y'] = corruption
                trace['type'] = 'line'
                trace['yaxis'] = 'y2',
                trace['name'] = 'Perception Of Government Corruption'
                graphData.push(trace)
            }
            else if (box == 'generosity'){
                trace['x'] = years
                trace['y'] = generosity
                trace['type'] = 'line'
                trace['yaxis'] = 'y2',
                trace['name'] = 'Generosity'
                graphData.push(trace)
            }

        })

    
        var layout1 = {
            title : `${first_ID.Country} Happiness`,
            legend:{
                orientation: 'h',
                xanchor:"center",
                yanchor:"top",
                y:-0.3, //play with it
                x:0.5   // play with it
            },
            yaxis : {title: 'Happiness'},
            yaxis2: {
                title: 'Impact of Factors',
                overlaying: 'y',
                showgrid: false,
                side: 'right'
            }
        };
    
        // Create bar chart
        
        var config = {responsive:true}
        Plotly.newPlot('bar', graphData, layout1,config);

    })
}


