class Sort {
  // Check sort key is available
  static checkSortAvailability(next, sortableKeys, sortKey) {
    let error = new Error('The :sort key \'' + sortKey + '\' is not available for this resource. Possible values : \'' + sortableKeys.join('\', \'') + '\'');
    error.code = 400;

    if (sortableKeys.indexOf(sortKey) === -1) return next(error);
  }

  // Check how key is asc or desc
  static checkHowAvailability(next, howKey) {
    howKey = howKey.toLowerCase();

    let error = new Error('The :how key \'' + howKey + '\' must be \'asc\' or \'desc\'');
    error.code = 400;

    if (howKey !== "asc" && howKey !== "desc") return next(error);
  }

  // Add sort headers to response
  static setResponseHeaders(res, sortKey, howKey) {
    res.set('X-Sort-By', sortKey);
    res.set('X-Sort-How', howKey);
  }
}

export default Sort;
