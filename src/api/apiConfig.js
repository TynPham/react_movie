const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "3b92846b32d91a3d43f1b663a727fcc2",
  originalImage: (imgpath) => `https://image.tmdb.org/t/p/original/${imgpath}`,
  w500img: (imgpath) => `https://image.tmdb.org/t/p/w500/${imgpath}`,
};

export default apiConfig;
