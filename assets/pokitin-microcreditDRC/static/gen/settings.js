if (window.microcreditDRC == null) {
  window.microcreditDRC = {};
}

microcreditDRC.settings = {
  show_navigation: true,
  background_color: "white",
  text_color: "black",
  storyboard: "static/storyboard.json",
  map: {
    transition_duration: 750,
    africa_bounds: [[-20.2, -37.3], [54.3, 39.0]],
    default_fill_color: "#BEBEBE",
    highlighted_fill_color: "#EC7014",
    choropleth_bucket_number: 4,
    choropleth_color_scale: ["rgb(255,255,212)", "rgb(254,227,145)", "rgb(254,196,79)", "rgb(254,153,41)", "rgb(236,112,20)", "rgb(204,76,2)", "rgb(140,45,4)"],
    choropleth_type_scale: "log",
    legend_max_width: 310,
    bubble_default_color: "#F7F8FF",
    bubble_default_border_color: "#555751",
    bubble_highlighted_color: "#FF5C5C",
    bubble_default_size: 1,
    bubble_size_range: [2, 5],
    tooltip_style: {
      style: {
        classes: "qtip-light qtip-tipsy qtip-rounded",
        tip: {
          corner: false
        }
      },
      position: {
        target: 'mouse',
        adjust: {
          x: -80,
          y: -50
        }
      }
    },
    data: {
      microfinance_africa: "static/data/microfinance_africa.csv",
      microfinance_geocoded: "static/data/microfinance_geocoded.csv",
      microfinance_kivus: "static/data/microfinance_kivus.csv",
      geojson: "static/map/africa.topo.json"
    }
  }
};
