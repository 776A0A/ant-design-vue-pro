function chart(method) {
  let res = null;
  switch (method) {
    case 'GET':
      // res = [10, 40, 90, 30, 20, 50];
      res = Array.from({ length: 6 }, () => Math.random() * 100);
      break;

    default:
      res = null;
      break;
  }

  return res;
}

module.exports = chart;
