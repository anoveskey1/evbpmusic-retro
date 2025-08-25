module.exports = function imageUrlBuilder() {
  return {
    image: () => ({
      url: () => "https://mocked.cdn/image.jpg",
    }),
  };
};
