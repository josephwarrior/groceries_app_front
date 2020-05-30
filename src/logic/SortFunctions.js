export function ascendingByCategory(a, b) {
  if (a.category < b.category) {
    return -1;
  }
  if (a.category > b.category) {
    return 1;
  }
  return 0;
}

export function descendingByCategory(a, b) {
  if (a.category > b.category) {
    return -1;
  }
  if (a.category < b.category) {
    return 1;
  }
  return 0;
}

export function ascendingByName(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export function descendingByName(a, b) {
  if (a.name > b.name) {
    return -1;
  }
  if (a.name < b.name) {
    return 1;
  }
  return 0;
}

export function ascendingByRemainingStock(a, b) {
  if (a.stock / a.target < b.stock / b.target) {
    return -1;
  }
  if (a.stock / a.target > b.stock / b.target) {
    return 1;
  }
  return 0;
}

export function descendingByRemainingStock(a, b) {
  if (a.stock / a.target > b.stock / b.target) {
    return -1;
  }
  if (a.stock / a.target < b.stock / b.target) {
    return 1;
  }
  return 0;
}

export function ascendingById(a, b) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}
