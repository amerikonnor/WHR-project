// Creating map object
  //defaultUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
  //noLabelsUrl = 'https://api.mapbox.com/styles/v1/amerikonnor/ckmhrn4m08unc17rx4a51422c.html?fresh=true&title=copy&access_token={accessToken}'
  // Adding tile layer
  var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "streets-v11",
  accessToken: API_KEY
});

  // Load in geojson data
  var geoData = "static/data/geojson/2015countries.geojson";
  var happinessChoro;
  var freedomChoro;
  // Grab data with d3
  d3.json(geoData, function(data) {
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
    });

    
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

    //adding the choropleths to the basemap layer for the control
    //this will make it so that only one can be displayed at a time
    var baseMaps = {
      "Happiness Score" : happinessChoro,
      "Freedom Impact" : freedomChoro
    };

    //need an empty set for the layers option of L.map
    var overlayMaps = {};

    // make the map
    var myMap = L.map("map", {
      center: [40, 0],
      zoom: 3,
      layers: [streetMap, happinessChoro]
    });

    

    

    L.control.layers(baseMaps,overlayMaps,{
      collasped: false
    }).addTo(myMap);

    //function that removes the legend and creates a new one
    function onChange(layer){
      myMap.removeControl(legend);
      makeLegend(layer)
    }

    //call the change function whenever the base layer changes
    myMap.on('baselayerchange', e => onChange(e.layer));

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
    }

    //initialize legend
    makeLegend(happinessChoro)
  });
