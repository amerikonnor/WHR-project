// Creating map object

  // Adding tile layer
  var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
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
        layer.bindPopup("Country: " + feature.properties.ADMIN + "<br>Freedom Impact:<br>" +
          feature.properties["Freedom"]);
      }
    });

    var baseMaps = {
      "Happiness Score" : happinessChoro,
      "Freedom Impact" : freedomChoro
    };

    var overlayMaps = {};

    var myMap = L.map("map", {
      center: [40, 0],
      zoom: 3,
      layers: [streetMap, happinessChoro]
    });

    

    //adapted from https://stackoverflow.com/questions/44322326/how-to-get-selected-layers-in-control-layers
    // Add method to layer control class
    // L.Control.Layers.include({
    //   getActive: function () {

    //       // Create array for holding active layers
    //       var active = [];

    //       // Iterate all layers in control
    //       this._layers.forEach(function (obj) {

    //           // Check if it's an overlay and added to the map
    //           if (this._map.hasLayer(obj.layer)) {

    //               // Push layer to active array
    //               active.push(obj.layer);
    //           }
    //       });

    //       // Return array
    //       return active;
    //   }
    // });

    var control = L.control.layers(baseMaps,overlayMaps,{
      collasped: false
    }).addTo(myMap);

    function onClick(layer){
      myMap.removeControl(legend);
      makeLegend(layer)
    }
    myMap.on('baselayerchange', e => onClick(e.layer));

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    function makeLegend(layer){

      var activeChoro = layer;
      var layerTitle = Object.keys(baseMaps).find(key => baseMaps[key] === activeChoro)
      
      legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = activeChoro.options.limits;
        var colors = activeChoro.options.colors;
        var labels = [];
        // Add min & max
        var legendInfo = `<h1>${layerTitle}</h1>` +
          "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
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
    makeLegend(happinessChoro)
  });
