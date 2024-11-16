// Load Sentinel-5P NO2 dataset
var s5p = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('NO2_column_number_density');

// Define the region of interest (Iran)
var iran = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
  .filter(ee.Filter.eq('country_na', 'Iran'));

// Set the date range for analysis
var startDate = '2024-07-01';
var endDate = '2024-09-30';

// Filter data for the date range and region
var no2Data = s5p
  .filterDate(startDate, endDate)
  .filterBounds(iran)
  .mean()
  .clip(iran);

// Define visualization parameters
var no2Vis = {
  min: 0.0001,
  max: 0.0005,
  palette: ['blue', 'green', 'yellow', 'orange', 'red']
};

// Add NO2 data to the map
Map.centerObject(iran, 5); // Adjust the zoom level as needed
Map.addLayer(no2Data, no2Vis, 'Mean NO2 Concentration');

// Add boundaries for better visualization
Map.addLayer(iran, {color: 'black'}, 'Iran Boundary');

// Print information to the console for analysis
print('NO2 data:', no2Data);
