function reverse(string) {
    result = "";
    for (let i = string.length - 1; i >= 0; i--) result += string[i];
    console.log(result)
}

reverse('1,2,3,2,1')
