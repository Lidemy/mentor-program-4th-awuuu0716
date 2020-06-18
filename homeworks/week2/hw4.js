function printFactor(n) {
    for (let i = 1; i <= n; i++) n % i == 0 ? console.log(i) : null;
}

printFactor(100);
