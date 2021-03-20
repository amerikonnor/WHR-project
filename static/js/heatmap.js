// Creating map object
var myMap = L.map("map", {
    center: [40, 0],
    zoom: 3
  });
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
 
  

  var geoYear = "2016";
 
  // Load in geojson data
  var geoData = "static/data/geojson/" + geoYear + "countries.geojson";
  var geojson;
  // Grab data with d3
  d3.json(geoData, function(data) {
    // Create a new choropleth layer
    geojson = L.choropleth(data, {
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
    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];
      // Add min & max
      var legendInfo = "<h1>Happiness Score</h1>" +
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

    //creating the slider

    // Simple
var data = [2015, 2016, 2017, 2018, 2019, 2020];

console.log(data)

var sliderSimple = d3
  .sliderBottom()
  .min(d3.min(data))
  .max(d3.max(data))
  .width(300)
  .tickFormat(d3.format('2'))
  .ticks(5)
  .default(2015)
  .on('onchange', val => {
    d3.select('p#value-simple').text(d3.format('2')(val));
  });

var gSimple = d3
  .select('div#slider-simple')
  .append('svg')
  .attr('width', 500)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(30,30)');

gSimple.call(sliderSimple);

d3.select('p#value-simple').text(d3.format('2')(sliderSimple.value()));
  

  });