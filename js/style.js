export default {
  version: 8,
  name: "Albers USA",
  metadata: {
    "mapbox:autocomposite": true,
    "mapbox:type": "template",
    "mapbox:sdk-support": {
      js: "1.9.0",
      android: "8.6.0",
      ios: "5.6.0"
    },
    "mapbox:groups": {},
    "mapbox:uiParadigm": "layers"
  },
  sources: {
    composite: {
      type: "vector",
      tiles: [
        window.location.origin +
          window.location.pathname +
          "/data/tiles/{z}/{x}/{y}.pbf"
      ],
      minzoom: 2,
      maxzoom: 9
    }
  },
  sprite: window.location.origin + window.location.pathname + "/sprites/sprite",
  glyphs:
    window.location.origin +
    window.location.pathname +
    "/fonts/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "#fff" }
    },
    {
      id: "county-fill",
      type: "fill",
      source: "composite",
      "source-layer": "us_county_albersusa",
      layout: {},
      paint: { "fill-color": "#fff" }
    },
    {
      id: "county-boundaries",
      type: "line",
      source: "composite",
      "source-layer": "us_county_albersusa",
      layout: {},
      paint: { "line-color": "black", "line-width": 0.5, "line-opacity": 0.5 }
    },
    {
      id: "state-boundaries",
      type: "line",
      source: "composite",
      "source-layer": "us_state_albersusa",
      layout: {},
      paint: { "line-color": "black", "line-width": 2, "line-opacity": 0.25 }
    },
    {
      id: "place-points-2",
      type: "symbol",
      source: "composite",
      minzoom: 5,
      "source-layer": "us_places_albersusa",
      filter: ["<=", "scalerank", 3],
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["GR"],
        "text-size": 14
      },
      paint: {
        "text-color": "#000",
        "text-opacity": 1,
        "text-halo-color": "#fff",
        "text-halo-width": 1.25,
        "text-halo-blur": 0
      }
    },
    {
      id: "place-points-1",
      type: "symbol",
      source: "composite",
      "source-layer": "us_places_albersusa",
      minzoom: 2,
      filter: ["<=", "scalerank", 1],
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["GR"],
        "text-size": 14
      },
      paint: {
        "text-color": "#000",
        "text-opacity": 1,
        "text-halo-color": "#fff",
        "text-halo-width": 1.25,
        "text-halo-blur": 0
      }
    }
  ]
};
