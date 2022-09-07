const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "", // take on themoviedb.org
  originalImage: (imgpath) => `https://image.tmdb.org/t/p/original/${imgpath}`,
  w500img: (imgpath) => `https://image.tmdb.org/t/p/w500/${imgpath}`,
};

export default apiConfig;
