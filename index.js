let firstNumber = ''
let secondNumber = ''
let sign = ''
let finish = false

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '×', '÷'];

const out = document.querySelector('.output p')


function square() {
    if (secondNumber === '') {
        firstNumber **= 2
        out.textContent = firstNumber
    } else if (secondNumber !== '' && sign !== '') {
        secondNumber **= 2
        out.textContent = `${firstNumber} ${sign} ${secondNumber}`
    }
}

function clear() {
    firstNumber = ''
    secondNumber = ''
    sign = ''
    out.textContent = '0'
}

function rev() {
    if (secondNumber === '') {
        firstNumber *= -1
        out.textContent = firstNumber
    } else if (secondNumber !== '' && sign !== '') {
        secondNumber *= -1
        out.textContent = `${firstNumber} ${sign} ${secondNumber}`
    }
}

function back() {
    if (secondNumber === '' && sign === ''){
        firstNumber = firstNumber.substring(0, firstNumber.length - 1)
        out.textContent = firstNumber
        if (out.textContent === '') {
            firstNumber = ''
            secondNumber = ''
            sign = ''
            out.textContent = 0
        }
    } else if (secondNumber !== '' && sign !== '') {
       secondNumber = secondNumber.substring(0, secondNumber.length - 1)
       out.textContent = `${firstNumber} ${sign} ${secondNumber}`
    } else if (secondNumber === '' && sign !== ''){
        sign = ''
        out.textContent = firstNumber
    } 
}

document.querySelector('.back').onclick = () => back()
document.querySelector('.reverse').onclick = () => rev()
document.querySelector('.clear').onclick = () => clear()
document.querySelector('.square').onclick = () => square()

document.querySelector('.calculator').onclick = (event) => {
    if(!event.target.classList.contains('item')) return
    if(event.target.classList.contains('output')) return
    if(event.target.classList.contains('reverse')) return
    if(event.target.classList.contains('clear')) return
    if(event.target.classList.contains('square')) return
    if(event.target.classList.contains('back')) return

    const key = event.target.textContent
    out.textContent = ''

    if (digit.includes(key)) {
        if (secondNumber === '' && sign === '') {
            if (key === '0' && firstNumber.startsWith('0') && !firstNumber.includes('.')) {
                firstNumber = '0'
                out.textContent = firstNumber
            } else {
                if (key === '.' && firstNumber.length < 1) {
                    firstNumber = '0.'
                    out.textContent = firstNumber
                } else if (key === '.' && firstNumber.length >= 2 && firstNumber.includes('.')) {
                    out.textContent = firstNumber
                } else if (key === '.' && firstNumber.length >= 2 && !firstNumber.includes('.')) {
                    firstNumber = `${firstNumber}.`
                    out.textContent = firstNumber
                } else if (firstNumber.startsWith('0') && firstNumber.length > 0 && !firstNumber.includes('.')) {
                    firstNumber = firstNumber.substring(1, firstNumber.length)
                    out.textContent = firstNumber
                } else {
                    firstNumber += key
                    out.textContent = firstNumber
                }
            }
        }
        else if (firstNumber !== '' && secondNumber !== '' && finish) {
            secondNumber = key
            out.textContent = `${firstNumber} ${sign} ${secondNumber}`
            finish = false
        }
        else {
            if (key === '0' && secondNumber.startsWith('0') && !secondNumber.includes('.')) {
                secondNumber = '0'
                out.textContent = `${firstNumber} ${sign} ${secondNumber}`
            } else {
                if (key === '.' && secondNumber.length < 1) {
                    secondNumber = '0.'
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                } else if (key === '.' && secondNumber.length > 1 && secondNumber.includes('.')) {
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                } else if (key === '.' && secondNumber.length > 1 && !secondNumber.includes('.')) {
                    secondNumber = `${secondNumber}.`
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                } else if (secondNumber.startsWith('0') && secondNumber.length > 0 && !secondNumber.includes('.')) {
                    secondNumber = secondNumber.substring(1, secondNumber.length)
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                } else {
                    secondNumber += key
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                }
            }
        }
        console.table(firstNumber, secondNumber, sign)
        return
    }

    if (action.includes(key)) {
        if (firstNumber[firstNumber.length - 1] === '.') {
            firstNumber = firstNumber.substring(0, firstNumber.length - 1)
        }
        if (firstNumber === '') {
            firstNumber = '0'
            out.textContent = firstNumber
        }
        sign = key
        out.textContent = `${firstNumber} ${sign} ${secondNumber}`
        console.table(firstNumber, secondNumber, sign)
        return
    }

    if (key === '=') {
        if (secondNumber === '') secondNumber = firstNumber
        switch (sign) {
            case '+':
                firstNumber = (+firstNumber) + (+secondNumber)
                break
            case '-':
                firstNumber -= secondNumber
                break
            case '×':
                firstNumber *= secondNumber
                break
            case '÷':
                if (secondNumber === '0') {
                    out.textContent = `it's impossible bro`;
                    firstNumber = ''
                    secondNumber = ''
                    sign = ''
                    return
                }
                firstNumber /= secondNumber
                break
        }
        finish = true
        out.textContent = firstNumber
        console.table(firstNumber, secondNumber, sign)
    }
}