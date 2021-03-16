var file = "static/data/cleaned/top10.csv";

var table = d3.select('#top5').append('table').attr('class','table');
var tableHeadRow = table.append('thead').append('tr')
tableHeadRow.append('th').text('Country')
tableHeadRow.append('th').text('6 Year MHS')

var tableBody = table.append('tbody')
d3.csv(file, function(data){
    data['Mean Happiness'] = +data['Mean Happiness']
    tableBody.selectAll('tr').data(data)
        .enter()
        .append('tr')
        .html(d=>`<td>${d['Country']}</td><td>${d['Mean Happiness']}</td>`)      
});
