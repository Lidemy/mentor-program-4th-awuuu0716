const multiply = (a, b) => {
  if (a === '0' || b === '0') return '0';
  const waitToAddNum = [];
  let addZero = 0;
  for (let i = b.length - 1; i >= 0; i -= 1) {
    let carry = 0;
    let tempNumStr = '';

    for (let j = a.length - 1; j >= 0; j -= 1) {
      const multiNum = a[j] * b[i];
      const tempSum = multiNum + carry;
      carry = Math.floor(tempSum / 10);
      if (j === 0) {
        tempNumStr = `${tempSum}${tempNumStr}`;
      } else {
        tempNumStr = `${tempSum % 10}${tempNumStr}`;
      }
    }
    waitToAddNum.push(tempNumStr + '0'.repeat(addZero));
    addZero += 1;
  }

  const answer = waitToAddNum.reduce((x, y) => {
    let carry = 0;
    let tempSum = 0;
    let tempStr = '';
    const arrA = x.split('');
    const arrB = y.split('');
    while (arrA.length > 0 || arrB.length > 0) {
      const numA = arrA.pop() || '0';
      const numB = arrB.pop();
      tempSum = Number(numA) + Number(numB) + carry;
      carry = Math.floor(tempSum / 10);
      tempStr = `${
        arrA.length === 0 && arrB.length === 0 ? tempSum : tempSum % 10
      }${tempStr}`;
    }

    return tempStr;
  });

  return answer;
};

multiply('124902814902890825902840917490127902791247902479027210970941724092174091274902749012740921759037590347438758957283947234273942304239403274093275902375902374092410937290371093719023729103790123', '1239128192048129048129021830918209318239018239018239018249082490182490182903182390128390128903182309812093812093820938190380192381029380192381092380192380123802913810381203');
