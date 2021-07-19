const pagination = (rowsPerPage, currentPage, data) => {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = currentPage * rowsPerPage;

  const results = {};

  results.total = {
    pages: Math.ceil(data.length / rowsPerPage)
  };

  if (endIndex < data.length) {
    results.next = {
      page: currentPage + 1,
      limit: rowsPerPage
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: currentPage - 1,
      limit: rowsPerPage
    };
  }

  results.results = data.slice(startIndex, endIndex);
  return results;
};

export default pagination;