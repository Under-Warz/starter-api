class Pagination {
  // Add pagination headers to response
  static setResponseHeaders(res, currentPage, limit, total) {
    res.set('X-Pagination-Page', currentPage);
    res.set('X-Pagination-Limit', limit);
    res.set('X-Pagination-Page-Count', Math.ceil(total / limit));
    res.set('X-Pagination-Item-Count', total);
  }
}

export default Pagination;
