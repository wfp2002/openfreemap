import "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js";

const middleOfUSA = [-100, 40];

async function getLocation() {
  try {
    const response = await fetch("http://ip-api.com/json/");
    const json = await response.json();
    if (typeof json.lat === "number" && typeof json.lon === "number") {
      return [json.lon, json.lat];
    }
  } catch (error) {}
  return middleOfUSA;
}

async function init() {
  
  const map = new maplibregl.Map({
    style: "/styles/dark.json",
    // style: "https://tiles.openfreemap.org/styles/liberty",
    center: middleOfUSA,
    zoom: 2,
    container: "map",
  });

  const location = await getLocation();



  if (location !== middleOfUSA) {
    map.flyTo({ center: location, zoom: 10 });


    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      //offset: 0,        // colado no ponto
      offset: [0, -10],
      className: "aprs-label"
    })
      .setLngLat(location)
      .setHTML(`<span>PU2ONU-9</span>`)
      .addTo(map);  // 👈 ISSO abre automaticamente

      


    new maplibregl.Marker({
      element: createAprsMarker("mario"),
      rotation: 0, // heading APRS
      rotationAlignment: "map"
    })
      .setLngLat(location)
      .addTo(map);


    /*
    new maplibregl.Popup({
      closeOnClick: false,
    })
      .setLngLat(location)
      .setHTML("<h3>You are approximately here!</h3>")
      .addTo(map);
      */
  }
      
}

function createAprsMarker(type = "qth") {
  const el = document.createElement("div");

  const icons = {
    car: "🚗 ",
    truck: "🚚 ",
    igate: "📡",
    bike: "🏍️",
    bicycle: "🚲",
    bus: "🚌",
    taxi: "🚕",
    tower: "🗼",
    plane: "✈️",
    helicopter: "🚁",
    boat: "🚤",
    fixed: "🏠",
    qth: "🏠",
    wx: "🌦️",
    rain: "🌧️",
    sun: "☀️",
    sos: "🆘",
    police: "🚓",
    fire: "🚒",
    ambulance: "🚑",
    walk: "🏃",
    compass: "🧭",
    satelite: "🛰️",
    mario: "🍄"
  };


  el.className = "aprs-marker";
  el.innerHTML = icons[type] || icons.qth;

  return el;
}



init();
