module.exports = {
  createClient: () => ({
    fetch: jest.fn(),
    config: jest.fn(),
  }),
};
