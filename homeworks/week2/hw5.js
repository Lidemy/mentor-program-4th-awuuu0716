function join(arr, s) {
    let result = "";
    for (let i = 0; i < arr.length; i++) {
        let word1 = typeof arr[i] == "undefined" ? "" : arr[i];
        let word2 = i == arr.length - 1 ? "" : s;
        result += word1 + word2;
    }
    return result;
}

function repeat(string, n) {
    let result = "";
    for (let i = 0; i < n; i++) result += string;
    return result
}

console.log(join(["a", "b", "c"], "!"))
console.log(repeat('a', 5));
