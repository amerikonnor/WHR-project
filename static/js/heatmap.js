// Creating map object
  //defaultUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
  //noLabelsUrl = 'https://api.mapbox.com/styles/v1/amerikonnor/ckmhrn4m08unc17rx4a51422c.html?fresh=true&title=copy&access_token={accessToken}'
  // Adding tile layer
var myMap = L.map("map", {
  center: [40, 0],
  zoom: 3,
});
function makeTheMap(){

  
  var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "streets-v11",
  accessToken: API_KEY
  }).addTo(myMap);

  addSlider(myMap);
  
  //call the change function whenever the base layer changes
  // myMap.on('baselayerchange', e => onChange(e.layer));
};
  
function addSlider(map){
  
  var sliderBox = L.control({ position: "bottomleft" });

  sliderBox.onAdd = function() {
    
    var sliderDiv = L.DomUtil.create("div", "sliderLegend");
    

    var sliderInfo = '<p id="value-simple"></p><div id="slider-simple"></div>';
    sliderDiv.innerHTML = sliderInfo;
  
      
   
    
    return sliderDiv;
  }
  sliderBox.addTo(map);
  d3.select(".sliderLegend").attr('class','sliderLegend');
  d3.select('p#value-simple').attr('value',2015);

  var sliderSimple = d3
  .sliderBottom()
  .min(2015)
  .max(2020)
  .step(1)
  .width(300)
  .tickFormat(d3.format('2'))
  .ticks(5)
  .default(2015)
  .on('onchange', val => {
    d3.select('p#value-simple').attr('value',val);
    makeChoros();
  });

  var gSimple = d3
      .select('div#slider-simple')
      .append('svg')
      .attr('width', 350)
      .attr('height', 100)
      .append('g')
      .attr('transform', 'translate(30,30)');

    gSimple.call(sliderSimple);

}

  // Load in geojson data


  // Grab data with d3
function makeChoros(){
  console.log('made choros');
  var sliderItem = d3.select('p#value-simple');
  var dataset = sliderItem.attr('value');
  console.log(dataset);
  switch(dataset){
    case "2015":
    var geoYear = "2015"
    break;

  case "2016":
    var geoYear = "2016"
    break;

  case "2017":
    var geoYear = "2017"
    break;

  case "2018":
    var geoYear = "2018"
    break;

  case "2019":
    var geoYear = "2019"
    break;

  case "2020":
    var geoYear = "2020"
    break;

  default:
    var geoYear = "2015"
    break;
  }

  var geoData = "static/data/geojson/" + geoYear + "countries.geojson";
  

  d3.json(geoData,function(data) {
    
    
    // Create a new choropleth layer
    happinessChoro = L.choropleth(data, {
      // Define what  property in the features to use
      valueProperty: "Happiness Score",
      // Set color scale
      scale: ["#ffffb2", "#b10026"],
      // Number of breaks in step range
      steps: 10,
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        if (typeof feature.properties["Happiness Score"] !== 'undefined'){
          layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>Happiness Score:<br>" +
            feature.properties["Happiness Scocre"]);
          }
          else {
            layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>Happiness Score:<br>" +
            'Not Measured');
       }
      }
    }).addTo(myMap);

    
    //creating another choro layer for the freedom impact score!
    //I want to make a loop that just creates them all!
    wealthChoro = L.choropleth(data, {
      // Define what  property in the features to use
      valueProperty: "GDP per Capita",
      // Set color scale
      scale: ["#ffffb2", "#b10026"],
      // Number of breaks in step range
      steps: 10,
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        if (typeof feature.properties["GDP per Capita"] !== 'undefined'){
        layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>GDP per Capita Impact:<br>" +
          feature.properties["GDP per Capita"]);
        }
        else {
          layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>GDP per Capita Impact:<br>" +
          'Not Measured');
        }
      }
    });

    freedomChoro = L.choropleth(data, {
      // Define what  property in the features to use
      valueProperty: "Freedom",
      // Set color scale
      scale: ["#ffffb2", "#b10026"],
      // Number of breaks in step range
      steps: 10,
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        if (typeof feature.properties["Freedom"] !== 'undefined'){
        layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>Freedom Impact:<br>" +
          feature.properties["Freedom"]);
        }
        else {
          layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>Freedom Impact:<br>" +
          'Not Measured');
        }
      }
    });

    familyChoro = L.choropleth(data, {
      // Define what  property in the features to use
      valueProperty: "Family",
      // Set color scale
      scale: ["#ffffb2", "#b10026"],
      // Number of breaks in step range
      steps: 10,
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        if (typeof feature.properties["Family"] !== 'undefined'){
        layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>Social Support Impact:<br>" +
          feature.properties["Family"]);
        }
        else {
          layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>Social Support Impact:<br>" +
          'Not Measured');
        }
      }
    });

    healthChoro = L.choropleth(data, {
      // Define what  property in the features to use
      valueProperty: "Healthy Life Expectancy",
      // Set color scale
      scale: ["#ffffb2", "#b10026"],
      // Number of breaks in step range
      steps: 10,
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        if (typeof feature.properties["Healthy Life Expectancy"] !== 'undefined'){
        layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>Life Expectancy Impact:<br>" +
          feature.properties["Health"]);
        }
        else {
          layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>Life Expectancy Impact:<br>" +
          'Not Measured');
        }
      }
    });

    trustChoro = L.choropleth(data, {
      // Define what  property in the features to use
      valueProperty: "Perception of Government Corruption",
      // Set color scale
      scale: ["#ffffb2", "#b10026"],
      // Number of breaks in step range
      steps: 10,
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        if (typeof feature.properties["Perception of Government Corruption"] !== 'undefined'){
        layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>Perception of Government<br>Corruption Impact:<br>" +
          feature.properties["Perception of Government Corruption"]);
        }
        else {
          layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>Perception of Government Corruption Impact:<br>" +
          'Not Measured');
        }
      }
    });

    generosityChoro = L.choropleth(data, {
      // Define what  property in the features to use
      valueProperty: "Generosity",
      // Set color scale
      scale: ["#ffffb2", "#b10026"],
      // Number of breaks in step range
      steps: 10,
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        if (typeof feature.properties["Generosity"] !== 'undefined'){
        layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>Generosity Impact:<br>" +
          feature.properties["Generosity"]);
        }
        else {
          layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>Generosity Impact:<br>" +
          'Not Measured');
        }
      }
    });

    // var baseMaps = {
    //   "Happiness Score" : happinessChoro,
    //   "GDP per Capita Impact" : wealthChoro,
    //   "Freedom Impact" : freedomChoro,
    //   "Social Support Impact" : familyChoro,
    //   "Life Expectancy Impact" : healthChoro,
    //   "Perception of Government Corruption Impact" : trustChoro,
    //   "Generosity Impact" : generosityChoro

    // }
    var baseMaps = [
                      {
                        groupName: "Layers",
                        expanded: true,
                        layers:{
                                "Happiness Score" : happinessChoro,
                                "GDP per Capita Impact" : wealthChoro,
                                "Freedom Impact" : freedomChoro,
                                "Social Support Impact" : familyChoro,
                                "Life Expectancy Impact" : healthChoro,
                                "Perception of Government Corruption Impact" : trustChoro,
                                "Generosity Impact" : generosityChoro
                        }
                    }
  ];
  
    //need an empty set for the layers option of L.map
    var overlayMaps = {};

    var options = {
      container_width : "300px",
      container_maxHeight: "350px",
    }
    
    d3.select('div.leaflet-top.leaflet-right').html('');
    
    
    var control = L.Control.styledLayerControl(baseMaps,overlayMaps,options);
    control.addTo(myMap);

    // var layerControl = L.control.layers(baseMaps,overlayMaps,{
    //   collasped: false
    // });
    // layerControl.addTo(myMap);
    
    
  
    d3.select('div.leaflet-bottom.leaflet-right').html('<div class="leaflet-control-attribution leaflet-control"><a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a></div>');

    // initialize the legend array
    var legend = L.control({ position: "bottomright" });

    //function that makes the legend
    function makeLegend(layerKey){

    //save the passed in active layer
      var activeChoro = baseMaps[0]['layers'][layerKey];

    //get the active layers title
      var layerTitle = layerKey;
      if (layerKey === "Perception of Government Corruption Impact"){
        layerTitle = "Perception of Gorvernment<br>Corruption Impact"
      };
      
      //set up the legend
      legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = activeChoro.options.limits;
        var colors = activeChoro.options.colors;
        var labels = [];
      // Add min & max
        var legendInfo = `<h3>${layerTitle}</h3>` +
          "<div class=\"labels\">" +
            "<div class=\"min\"><h5>" + limits[0].toFixed(2) + "</h5></div>" +
            "<div class=\"max\"><h5>" + limits[limits.length - 1].toFixed(2) + "</h5></div>" +
          "</div>";
        div.innerHTML = legendInfo;
        limits.forEach(function(limit, index) {
          labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
      };
      // Adding legend to the map
      legend.addTo(myMap);
    };
    makeLegend("Happiness Score");

    d3.selectAll('.menu-item-radio').on('change',function(){
      activeKey = d3.select(this).select('label').node().innerText;

      
      d3.select('div.leaflet-bottom.leaflet-right').html('<div class="leaflet-control-attribution leaflet-control"><a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a></div>');
      makeLegend(activeKey);
    })
    //redraw legend stuff
    myMap.on('baselayerchange',e=>{
      d3.select('div.leaflet-bottom.leaflet-right').html('<div class="leaflet-control-attribution leaflet-control"><a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a></div>');
      makeLegend(e.layer);
    });
  
  });
};

makeTheMap();
makeChoros();





