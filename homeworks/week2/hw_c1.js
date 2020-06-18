function search(arr, n) {
  let l = 0;
  let r = arr.length - 1;
  let m = Math.floor((r - l) / 2);

  while (l <= r) {
    if (arr[m] === n) {
      return m;
    }
    if (arr[m] < n) {
      l = m + 1;
      m = l + Math.floor((r - l) / 2);
    } else {
      r = m - 1;
      m = l + Math.floor((r - l) / 2);
    }
  }
  return -1;
}

console.log(search([8, 9, 43, 55, 66], 9));
