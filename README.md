# Project Overview
We will be using data from the World Happiness Report (https://worldhappiness.report/), as found on Kaggle (https://www.kaggle.com/mathurinache/world-happiness-report).
Our plan is to display the data using different visualizations to look at different aspects of the data. 

## Homepage Choropleth
The site homepage will use the Choropleth.js plugin to Leafleft to visualize the happiness score as a heatmap. This map has a slider to move through the different years of the data, as well as a layer control to change the heatmap to use the various factors that the World Happiness Report presents in their data set.
![index](/static/images/index.PNG)

## Country Analysis/Visualization
To further find connections within the data, we looked at it on a country by country level; with a page of the website dedicated to a line graph and table where a selected country's data can be displayed. The line graph plots the score over time for the country, with the options to also plot the other factors from the dataset. There is also a table containing all the data for the selected country.
![country](/static/images/country.PNG)

## Factor Analysis/Visualization
The World Happiness Report contains data that tells how much of an influence different factors (GDP per capita, generosity in the country, perception of government corruption, etc.) have on the Happiness Score. We use a scatter plot to see if there is any correlation between the influence of different factors and the Happiness Score. We can toggle between different years as well to see if these correlations hold up over time in the dataset as well.
![scatter](/static/images/scatter.PNG)

Team Members: Connor MacKenzie, David Grimmett, Amy Wagar Cinch, Missy Meyer-Bush, Jet'Lania Simpson

# Repo Structure
## HTML Files
1. index.html
  - This is the homepage for the github pages deployment at https://amerikonnor.github.io/WHR-project/
  - Contains html for the navbar, scripts for all the javascript packages
2. country.html
  - Contains html for the navbar, text for the country selection dropdown, and the checkbox forms to choose which factors to display
3. scatter.html
  - Contains html for the navbar, all the buttons to choose different options for the axes of the scatter plot
 4. about.html
  - html for the header, text that explains the project!
## Static Folder
### CSS
1. about.css
  - styling for about.html
2. choropleth.css
  - styling for index.html choropleth
3. scatter.css
  - styling for scatter.html
4. styledLayerControl.css
  - styling for index.html legend boxes
### Data
1. Clean
  - each year's data as seperate CSV { year }.csv
  - combined_with_avgHappy.csv contains all the data, as well as a column of the average Happiness Score
  - countries.csv is a list of all the countries
2. Cleaned
  - Two files that never ended up being used, but contain the most improved/diminished happiness scores, and the top 10 averages
3. Geojson
  - contains geojson files for each years countries
4. Raw
  - all the raw data
### JS
1. bar_chart.js
  - never used, creates a bar chart using the data
2. choropleth.js
  - javascript for the choropleth package used with plotly
3. config.js
  - keys created for this deployment
4. country.js
  - javascript to create and update the table and graph of data on country.html
5. heatmap.js
  - javascript that creates the choropleth and legends for index.html
6. scatter.js
  - creates and transitions the scatter plot on scatter.html
7. styledLayerControl.js
  - package used to help create multiple legend boxes on index.html
### Python Stuff
Contains a lot of jupyter notebooks that were used in the process to manipulate the data and geojson files
