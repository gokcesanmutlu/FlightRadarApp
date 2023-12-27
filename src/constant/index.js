//Flight 
export const options = {
  method: 'GET',
  url: 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary',
  params: {
    bl_lat: '34.596201',
    bl_lng: '25.826312',
    tr_lat: '43.693244',
    tr_lng: '44.822849',
    limit: '300'
  },
  headers: {
    'X-RapidAPI-Key': 'e9c16c084emshd6bbf6324cb96b6p1cb160jsn86b2c4eb08e7',
    'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
  }
};

//flight Detail
export const options2 = {
  method: 'GET',

  headers: {
    'X-RapidAPI-Key': '9e3aa64bb5msh539aa13f31eb687p15bd32jsne1db6cb4fd9e',
    'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
  }
};