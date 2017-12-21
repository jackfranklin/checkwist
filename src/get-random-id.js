// @flow

export const getRandomId = () =>
  Math.random()
    .toString(36)
    .substr(2, 5)
