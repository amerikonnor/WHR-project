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
    
    var sliderDiv = L.DomUtil.create("div", "info legend");
    

    var sliderInfo = '<p id="value-simple"></p><div id="slider-simple"></div>';
    sliderDiv.innerHTML = sliderInfo;
  
      
   
    
    return sliderDiv;
  }
  sliderBox.addTo(map);
  d3.select('p#value-simple').text(2015);

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
    d3.select('p#value-simple').text(val);
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

  var sliderItem = d3.select('p#value-simple');
  var dataset = sliderItem.text();

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
    console.log(data);
    
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
        layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>Happiness Score:<br>" +
          feature.properties["Happiness Score"]);
      }
    }).addTo(myMap);

    
    //creating another choro layer for the freedom impact score!
    //I want to make a loop that just creates them all!
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
    var baseMaps = {
      "Happiness Score" : happinessChoro,
      "Freedom Impact" : freedomChoro
    };
  
    //need an empty set for the layers option of L.map
    var overlayMaps = {};

    
    d3.select('div.leaflet-top.leaflet-right').html('');
    
  
    

    var layerControl = L.control.layers(baseMaps,overlayMaps,{
      collasped: false
    });
    layerControl.addTo(myMap);
    
    
  
    d3.select('div.leaflet-bottom.leaflet-right').html('<div class="leaflet-control-attribution leaflet-control"><a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a></div>');

    // initialize the legend array
    var legend = L.control({ position: "bottomright" });

    //function that makes the legend
    function makeLegend(layer){

    //save the passed in active layer
      var activeChoro = layer;

    //get the active layers title
      var layerTitle = Object.keys(baseMaps).find(key => baseMaps[key] === activeChoro)
      
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
    makeLegend(happinessChoro);

    //redraw legend stuff
    myMap.on('baselayerchange',e=>{
      d3.select('div.leaflet-bottom.leaflet-right').html('<div class="leaflet-control-attribution leaflet-control"><a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a></div>');
      makeLegend(e.layer);
    });
  
  });
};

makeTheMap();
makeChoros();





