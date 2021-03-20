function optionChanged(id) {
    console.log(id);
    updatePlotly2(id);
    // updateDemoInfo(id)
};

function init() {
    d3.csv("static/data/cleaned/clean2015.csv").then((data) => {
        theGoodStuff = data;
        var names = data.map(x => x.Country)
        names.forEach(function(name) {
            d3.select('#selDataset')
                .append('option')
                .text(name)
            });  

    // Creating data arrays            
    var family = data.map(x=> x.Family);
    var freedom = data.map(x=> x.Freedom);
    var happiness = data.map(x=> x['Happiness Score']);

    
    //sorting data by happiness
    var happySort = theGoodStuff.sort(function(a,b) {
        var aHappy = a['Happiness Score'];
        var bHappy = b['Happiness Score'];
        return bHappy - aHappy
    })
    var mostHappy = happySort.slice(0,10);
    // Selecting Top Ten data
    var sort_family = family.sort(function(a, b) {
        return b-a
    });
    var topten_family = sort_family.map(x => x.slice(0,10));
    var sort_freedom = freedom.sort(function(a, b) {
        return b-a
    });
    var top_freedom = sort_freedom.map(x =>x.slice(0,10));
    var sort_happiness = happiness.sort(function(a, b) {
        return b-a
    });
    var top_happiness = sort_happiness.map(x =>x.slice(0,10));

    
    var first_ID = data[0];
    var sample_Meta = d3.select("#sample-metadata").selectAll('h1')

    
    
    var firstMetadata = sample_Meta.data(d3.entries(first_ID))
    firstMetadata.enter()
                    .append('h1')
                    .merge(firstMetadata)
                    .text(d => `${d.key} : ${d.value}`)
                    .style('font-size','12px')
  
    firstMetadata.exit().remove()

    // Create bar chart trace and layout
    console.log(mostHappy);
    var trace1 = {
        x : mostHappy.map(d=>d.Country),
        y : mostHappy.map(d=>d['Happiness Score']),
        type : 'bar',
        
    };

    var layout1 = {
        title : 'Top Ten Most Happy 2015'
    };

    // Create bar chart
    var data = [trace1];
    var config = {responsive:true}
    Plotly.newPlot('bar', data, layout1,config);

    

    });
}; 

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

init();
