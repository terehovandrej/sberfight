const numbarith = (numb, arith) => {
    return maxOfExpressions(generateExspressions(addZero(numb), permutator(arith)))
}

// добавляет 0 в начала массива с числами
const addZero = (numb) => {
    let numbs = numb
    numbs.unshift(0)
    return numbs
}

// генерит массив комбинаций arith
const permutator = (inputArr) => {
    let result = [];
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }
    permute(inputArr)

    return result;
}

// генерит массив комбинаций arith и numbs
const generateExspressions = (numbs, arithCombination) => {
    let expressions = []
    for (let i = 0; i < arithCombination.length ; i++) {
        let exp = []
        for (let j = 0; j < numbs.length ; j++) {
            exp.push(numbs[j])
            if (j === arithCombination[i].length) break
            exp.push(arithCombination[i][j])
        }
        expressions.push(exp)
    }
    return expressions
}

// вычисляет выражение
const calculateExp = (expression) => {
    let result = expression
    while (result.length >= 3){
        let subarr = expression.slice(0, 3)
        result.splice(0, 3)
        let subres = eval(subarr.join(' '))
        // не знаю как должно обрабатывать деление на 0, пусть будет возвращать null
        if (subres === Infinity || subres === -Infinity || isNaN(subres)) return null;
        result.unshift(subres)
    }
    return result
}

// находит максимальное результат выражения
const maxOfExpressions = (expressions) => {
    let subresult = []
    for (let i = 0; i < expressions.length; i++) {
        subresult.push(calculateExp(expressions[i]))
    }
    return Math.max(...subresult)
}

console.log(numbarith([3, 4], ['+', '-']))
console.log(numbarith([5, 3, 4], ['+', '-', '*']))
console.log(numbarith([1, 0, 4], ['+', '/', '*']))
