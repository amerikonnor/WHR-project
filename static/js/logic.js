// Creating map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 8
  });

  //creating the slider

  var data = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

  var sliderSimple = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .tickFormat(d3.format('.2%'))
    .ticks(5)
    .default(0.015)
    .on('onchange', val => {
      d3.select('p#value-simple').text(d3.format('.2%')(val));
    });

  var gSimple = d3
    .select('div#slider-simple')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gSimple.call(sliderSimple).addTo(myMap);