module.exports = function imageUrlBuilder() {
  const chainable = {
    width: () => chainable,
    height: () => chainable,
    fit: () => chainable,
    url: () => "https://mocked.cdn/image.jpg",
  };

  return {
    image: () => chainable,
  };
};
