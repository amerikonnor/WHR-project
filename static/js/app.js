//the do-not-do-this global variable!!!?!?!!?
var years = [2015,2016,2017,2018,2019,2020];
var tableYears = years;
tableYears.unshift('');

function optionChanged(id) {
    console.log(id);
    makeTheGraph(id);
    updateDemoInfo(id)
};

//When going to initial html page, creates function so pages loads on first dropdown
function makeTheGraph(country) {
    d3.csv("static/data/cleaned/combined_with_avgHappy.csv").then((data) => {
        theGoodStuff = data;
        var names = data.map(x => x.Country)
        names.forEach(function(name) {
            d3.select('#selDataset')
                .append('option')
                .text(name)
            });  

    
            
    
    var first_ID = data.filter(x => x.Country === country)[0];
    console.log(first_ID)
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
    var sample_Meta = d3.select("#table-goes-here").selectAll('h1')

    
    d3.select('.panel-title').text(`World Happiness Data for ${country}`)
    d3.select('table').remove()
    var table = d3.select('#table-goes-here').append('table').attr('class','table');
    var tableHead = table.append('thead');
    var tableHeadRow = tableHead.append('tr');
    
    
    tableHeadRow.selectAll('th').data(tableYears)
            .enter()
            .append('th')
            .text(d=>d)

    var tableBody = table.append('tbody');

    var happyRow = tableBody.append('tr');
    happyRow.append('th').text('Happiness Score')
    happyRow.selectAll('td').data(happiness)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));

    var gdpRow = tableBody.append('tr');
    gdpRow.append('th').text('Impact of GDP');
    gdpRow.selectAll('td').data(gdp)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));

    var famRow = tableBody.append('tr');
    famRow.append('th').text('Impact of Social Support');
    famRow.selectAll('td').data(family)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4)); 
    
    var healthRow = tableBody.append('tr');
    healthRow.append('th').text('Impact of Life Expectancy');
    healthRow.selectAll('td').data(health)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));
    
    var freeRow = tableBody.append('tr');
    freeRow.append('th').text('Impact of Freedom');
    freeRow.selectAll('td').data(freedom)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));

    var corruptionRow = tableBody.append('tr');
    corruptionRow.append('th').text('Impact of Perceived Corruption');
    corruptionRow.selectAll('td').data(corruption)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4));

    var geneRow = tableBody.append('tr');
    geneRow.append('th').text('Impact of Generosity');
    geneRow.selectAll('td').data(generosity)
        .enter()
        .append('td')
        .text(d=>d.substring(0,4))
    

    // Create bar chart trace and layout
   
    var first_ID_happiness = [];
    first_ID_happiness.push(first_ID['Happiness Score_2015']);
    first_ID_happiness.push(first_ID['Happiness Score_2016']);
    first_ID_happiness.push(first_ID['Happiness Score_2017']);
    first_ID_happiness.push(first_ID['Happiness Score_2018']);
    first_ID_happiness.push(first_ID['Happiness Score_2019']);
    first_ID_happiness.push(first_ID['Happiness Score_2020']);

    
    var trace1 = {
        x : years,
        y : first_ID_happiness,
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

makeTheGraph('Switzerland');

// Bar chart update
function updatePlotly2(id) {
    console.log(id);
    d3.csv("2015.csv").then((data) => {
        var country_test = data.map(x => x.Country);
        var test = data.filter(x => x.Country === country_test);
       
        var family= test.map(x => x.Family)
            .sort(function(a, b) {
                return b-a
            });
        var topten_family = family.map(x => x.slice(0,10));
        
        var freedom = test.map(x=> x.Freedom)
            .sort(function(a, b) {
                return b-a
            });
        var top_freedom = freedom.map(x => x.slice(0,10));
       
        var happiness = test.map(x=> x.Happiness)
        .sort(function(a, b) {
            return b-a
        });
        var top_happiness = happiness.map(x => x.slice(0,10));

        // Create Bar chart trace and layout
        var trace = {
            x : family[0],
            y : happiness[0],
            text : freedom[0],
            type : 'bar',
            orientation : 'h',
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
              }]
        };
     
        var layout1 = {
            title: "<b>Testing Again</b><br>Little By Little"
        };
        var data1 = [trace];
        var config = {responsive:true}

        // Plot bar chart
        Plotly.newPlot('bar', data1,layout1,config);
    });
};
// New ID selection update
function updateDemoInfo(id) {
    d3.csv("2015.csv").then((data) => {
        var country_test = data.map(x => x.Country);
        var metadataSamples = data.filter(x => x.Country === +country_test)[0];

        var sampleMetadata1 = d3.select("#sample-metadata").selectAll('h1')
        var sampleMetadata = sampleMetadata1.data(d3.entries(metadataSamples))
        sampleMetadata.enter().append('h1').merge(sampleMetadata).text(d => `${d.key} : ${d.value}`).style('font-size','12px');
        
    });
};

