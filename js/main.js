import style from "./style.js";
import dates from "./dates.js";

const map = new mapboxgl.Map({
  container: "map",
  style: style,
  center: [-1.65, 1],
  zoom: 4,
  bearing: 0,
  pitch: 0,
  minZoom: 3.5,
  maxZoom: 8,
  hash: true
});

// Configure choropleth color scheme
const setMapStyle = () => {
  map.setPaintProperty("county-fill", "fill-color", [
    "step",
    ["number", ["feature-state", "value"], 0],
    "#f6eff7",
    5,
    "#bdc9e1",
    24,
    "#67a9cf",
    114,
    "#02818a"
  ]);
};

// Update the county
const updateMap = date => {
  caseData.forEach(county => {
    map.setFeatureState(
      {
        source: "composite",
        sourceLayer: "us_county_albersusa",
        // Set feature state for the feature with the id matching the FIPS code
        id: county.countyFIPS
      },
      // Look up the data for the current date from the time slider
      { value: parseInt(county[date]) }
    );
  });
};

// Load csv cases per county
// Load csv cases per county
map.on("style.load", function() {
  fetch("data/covid-cases.csv")
    .then(response => response.text())
    .then(data => {
      window.caseData = d3.csvParse(data);
      setMapStyle();
      // Apply style for the most recently available date
      updateMap(dates[dates.length - 1]);
    });
});

// Set up the date slider
const slider = document.getElementById("slider");
slider.addEventListener("input", e => {
  updateMap(dates[slider.value]);
});
