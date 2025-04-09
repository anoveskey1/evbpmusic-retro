const getPortraitImageWidth = (width: number = window.innerWidth): number => {
  switch (true) {
    case width <= 480:
      return 300;
    case width >= 480 && width < 768:
      return 400;
    case width >= 768 && width < 1024:
      return 400;
    default:
      return 400; // default width for larger screens
  }
};

export default getPortraitImageWidth;
