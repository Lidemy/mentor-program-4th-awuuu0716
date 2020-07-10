/* eslint no-bitwise: ["error", { "allow": ["&","<<","^"] }] */
// 請實作以上函式，回傳 a+b 的結果
// 但是函式裡面不能出現 +-*/ 任何一個符號
function add(a, b) {
  // 如果進位為零代表都算完了
  if (b === 0) return a;
  // 找出進位值
  const carry = (a & b) << 1;
  // 不進位的情況下的加總
  const sum = a ^ b;
  // 進入下一個遞迴，直到進位值為零
  return add(sum, carry);
}

add(123, 456);
