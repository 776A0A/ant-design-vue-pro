function form(method) {
  let res = null;
  switch (method) {
    case 'POST':
      res = { message: 'OK' };
      break;

    default:
      res = { message: 'ERROR' };
      break;
  }

  return res;
}

module.exports = form;
