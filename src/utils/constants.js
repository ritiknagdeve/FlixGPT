export const nowPlayingAPIURL = 'https://api.themoviedb.org/3/movie/now_playing?page=1';

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmNhOWE2ZTYzZTE2NWY3YWJhYWM2Y2I2N2JiNDg0OCIsIm5iZiI6MTc1MjM0MjE4Ny44NjIwMDAyLCJzdWIiOiI2ODcyOWVhYjJkMjM5OWRiOGM1NDIxMDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.D-dUhf9OCTW-VSrOoOyyDrd8_Uay1ASM4F5xuZwvaOI'
  }
};

export const imgCDNURL = "https://image.tmdb.org/t/p/w300"