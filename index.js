let firstNumber = '0'
let secondNumber = '0'
let sign = ''

const multi = document.querySelector('.multiply').innerHTML
const division = document.querySelector('.division').innerHTML
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', multi, division];

const out = document.querySelector('.output p')


function square() {
    if (secondNumber === '0') {
        firstNumber **= 2
        out.textContent = firstNumber
    } else if (secondNumber !== '' && sign !== '') {
        secondNumber **= 2
        out.textContent = `${firstNumber} ${sign} ${secondNumber}`
    }
}

function clear() {
    firstNumber = '0'
    secondNumber = '0'
    sign = ''
    out.textContent = firstNumber
}

function rev() {
    if (secondNumber == '0' && sign == '') {
        firstNumber *= -1
        out.textContent = `${firstNumber} ${sign}`
    } else if (secondNumber !== '' && sign !== '') {
        if (sign == '+') {
            sign = '-'
            out.textContent = `${firstNumber} ${sign} ${secondNumber}`
        } else if (sign == '-') {
          sign = '+'
          out.textContent = `${firstNumber} ${sign} ${secondNumber}`
        } else {
        secondNumber *= -1
        out.textContent = `${firstNumber} ${sign} ${secondNumber}`
        }
    }
}

function back() {
    if ((secondNumber == '0' || secondNumber == '') && sign == '') {
        if (firstNumber[0] == '-' && firstNumber.length === 2) {
            firstNumber = '0'
        }
        firstNumber = `${firstNumber}`
        firstNumber = firstNumber.substring(0, firstNumber.length - 1)
        out.textContent = firstNumber
        if (out.textContent === '') {
            firstNumber = '0'
            secondNumber = '0'
            sign = ''
            out.textContent = '0'
        }
    }
    else if (secondNumber != '' && sign != '') {
        secondNumber = `${secondNumber}`
        if (secondNumber[0] == '-' && secondNumber.length === 2) {
            secondNumber = '0'
            sign = ''
        }
        secondNumber = secondNumber.substring(0, secondNumber.length - 1)
        out.textContent = `${firstNumber} ${sign} ${secondNumber}`
        if (secondNumber === '') {
            sign = ''
            secondNumber = '0'
            out.textContent = `${firstNumber} ${sign}`
        }
    }
    else if (secondNumber == '' && sign != '') {
        sign = ''
        out.textContent = `${firstNumber} ${sign} ${secondNumber}`
    }
    else if (secondNumber == '0' && sign != '') {
        secondNumber = ''
        out.textContent = `${firstNumber}`
    }
}

document.addEventListener('keypress', (event) => {
    let key = event.key
    if (key === '*') {
        key = multi
    }
    if (key === '/') {
        key = division
    }
    if (digit.includes(key)) {
        if (secondNumber === '0' && sign === '') {
            if (key === '0' && toString(firstNumber).startsWith('0') && !firstNumber.includes('.')) {
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
                } else if (toString(firstNumber).startsWith('0') && firstNumber.length > 0 && !firstNumber.includes('.')) {
                    firstNumber = firstNumber.substring(1, firstNumber.length)
                    out.textContent = firstNumber
                } else {
                    firstNumber += key
                    out.textContent = firstNumber
                }
            }
        }
        else {
            if (firstNumber != '' && sign == '' && secondNumber != '') {
                secondNumber = '0'
            }
            if (key === '0' && toString(secondNumber).startsWith('0') && !secondNumber.includes('.')) {
                secondNumber = '0'
                out.textContent = `${firstNumber} ${sign} ${secondNumber}`
            } else {
                if (key === '.' && secondNumber.length < 1) {
                    secondNumber = '0.'
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                } else if (key === '.' && secondNumber.length >= 2 && secondNumber.includes('.')) {
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                } else if (key === '.' && secondNumber.length >= 2 && !secondNumber.includes('.')) {
                    secondNumber = `${secondNumber}.`
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                } else if (toString(secondNumber).startsWith('0') && secondNumber.length > 0 && !secondNumber.includes('.')) {
                    secondNumber = secondNumber.substring(1, secondNumber.length)
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                } else {
                    secondNumber += key
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                }
            }
        }
        if (firstNumber.length > 1 && firstNumber[0] === '0' && firstNumber[1] !== '.') {
            firstNumber = firstNumber.substring(1, firstNumber.length)
            out.textContent = firstNumber
        } else if (secondNumber.length > 1 && secondNumber[0] === '0' && secondNumber[1] !== '.') {
            secondNumber = secondNumber.substring(1, secondNumber.length)
            out.textContent = `${firstNumber} ${sign} ${secondNumber}`
        }
        if (firstNumber == '0' && key == '0' && sign == '') {
            firstNumber = '0'
            out.textContent = firstNumber
        }
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
        return
    }

    if (key === '=' || key === 'Enter') {
        if (secondNumber === '') {
            secondNumber = firstNumber
        }
        switch (sign) {
            case '+':
                firstNumber = (+firstNumber) + (+secondNumber)
                break
            case '-':
                firstNumber -= secondNumber
                break
            case `${multi}`:
                firstNumber *= secondNumber
                break
            case `${division}`:
                if (secondNumber === '0') {
                    out.textContent = `it's impossible bro`;
                    firstNumber = '0'
                    secondNumber = '0'
                    sign = ''
                    return
                }
                firstNumber /= secondNumber
                break
        }
        secondNumber = '0'
        sign = ''
        out.textContent = firstNumber
    }

    if (key === 'Backspace') {
        back()
    }
})

document.querySelector('.back').onclick = () => back()
document.querySelector('.reverse').onclick = () => rev()
document.querySelector('.clear').onclick = () => clear()
document.querySelector('.square').onclick = () => square()

document.querySelector('.calculator').onclick = (event) => {
    if (!event.target.classList.contains('item')) return
    if (event.target.classList.contains('output')) return
    if (event.target.classList.contains('reverse')) return
    if (event.target.classList.contains('clear')) return
    if (event.target.classList.contains('square')) return
    if (event.target.classList.contains('back')) return

    const key = event.target.textContent
    out.textContent = ''

    if (digit.includes(key)) {
        if (secondNumber === '0' && sign === '') {
            if (key === '0' && toString(firstNumber).startsWith('0') && !firstNumber.includes('.')) {
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
                } else if (toString(firstNumber).startsWith('0') && firstNumber.length > 0 && !firstNumber.includes('.')) {
                    firstNumber = firstNumber.substring(1, firstNumber.length)
                    out.textContent = firstNumber
                } else {
                    firstNumber += key
                    out.textContent = firstNumber
                }
            }
        }
        else {
            if (firstNumber != '' && sign == '' && secondNumber != '') {
                secondNumber = '0'
            }
            if (key === '0' && toString(secondNumber).startsWith('0') && !secondNumber.includes('.')) {
                secondNumber = '0'
                out.textContent = `${firstNumber} ${sign} ${secondNumber}`
            } else {
                if (key === '.' && secondNumber.length < 1) {
                    secondNumber = '0.'
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                } else if (key === '.' && secondNumber.length >= 2 && secondNumber.includes('.')) {
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                } else if (key === '.' && secondNumber.length >= 2 && !secondNumber.includes('.')) {
                    secondNumber = `${secondNumber}.`
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                } else if (toString(secondNumber).startsWith('0') && secondNumber.length > 0 && !secondNumber.includes('.')) {
                    secondNumber = secondNumber.substring(1, secondNumber.length)
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                } else {
                    secondNumber += key
                    out.textContent = `${firstNumber} ${sign} ${secondNumber}`
                }
            }
        }
        if (firstNumber.length > 1 && firstNumber[0] === '0' && firstNumber[1] !== '.') {
            firstNumber = firstNumber.substring(1, firstNumber.length)
            out.textContent = firstNumber
        } else if (secondNumber.length > 1 && secondNumber[0] === '0' && secondNumber[1] !== '.') {
            secondNumber = secondNumber.substring(1, secondNumber.length)
            out.textContent = `${firstNumber} ${sign} ${secondNumber}`
        }
        if (firstNumber == '0' && key == '0' && sign == '') {
            firstNumber = '0'
            out.textContent = firstNumber
        }
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
        return
    }

    if (key === '=') {
        if (secondNumber === '') {
            secondNumber = firstNumber
        }
        switch (sign) {
            case '+':
                firstNumber = (+firstNumber) + (+secondNumber)
                break
            case '-':
                firstNumber -= secondNumber
                break
            case `${multi}`:
                firstNumber *= secondNumber
                break
            case '÷':
                if (secondNumber === '0') {
                    out.textContent = `it's impossible bro`;
                    firstNumber = '0'
                    secondNumber = '0'
                    sign = ''
                    return
                }
                firstNumber /= secondNumber
                break
        }
        secondNumber = '0'
        sign = ''
        out.textContent = firstNumber
    }
}