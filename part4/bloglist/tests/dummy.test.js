const listHelper = require('../utils/list_helper');

// eslint-disable-next-line no-undef
test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  // eslint-disable-next-line no-undef
  expect(result).toBe(1);
});
