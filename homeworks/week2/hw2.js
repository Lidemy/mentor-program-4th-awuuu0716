function capitalize(string) {
    let firstWord = string[0].toUpperCase();
    return firstWord + string.slice(1);
}

console.log(capitalize('hello'));
