//Globalnie pobrane elementy
const displaySelect = document.querySelector('#select1')
const hidingSelect = document.querySelector('.nextSelect')
const movButton = document.querySelector('.MOV')
const xchgButton = document.querySelector('.XCHG')
const notButton = document.querySelector('.NOT')
const incButton = document.querySelector('.INC')
const decButton = document.querySelector('.DEC')
const andButton = document.querySelector('.AND')
const orButton = document.querySelector('.OR')
const xorButton = document.querySelector('.XOR')
const addButton = document.querySelector('.ADD')
const subButton = document.querySelector('.SUB')
const AL = document.querySelector('#registerInput1')
const AH = document.querySelector('#registerInput2')
const BL = document.querySelector('#registerInput3')
const BH = document.querySelector('#registerInput4')
const CL = document.querySelector('#registerInput5')
const CH = document.querySelector('#registerInput6')
const DL = document.querySelector('#registerInput7')
const DH = document.querySelector('#registerInput8')
const sendButton = document.querySelector('.send')
const firstOperationSelect = document.querySelector('#select1')
const secoundOperationSelect = document.querySelector('#select2')
const buttons = document.querySelectorAll('.actionButton')
const registerValues = document.querySelectorAll('.registerValue')
const input = document.querySelectorAll('.registerValue')
const error = document.querySelector('#error1')

//Funkcja do ukrycia erroru
sendButton.addEventListener('click', hideError)
//Globalna funkcja wyboru działania
let currentAction = null

sendButton.addEventListener('click', function () {
	switch (currentAction) {
		case 'mov':
			mov()
			break
		case 'xchg':
			xchg()
			break
		case 'not':
			not()
			break
		case 'inc':
			inc()
			break
		case 'dec':
			dec()
			break
		case 'and':
			and()
			break
		case 'or':
			or()
			break
		case 'xor':
			xor()
			break
		case 'add':
			add()
			break
		case 'sub':
			sub()
			break
	}
})

//Globalne funkcje do ukrywania/odkrywania wyboru drugiego rejestru

function show() {
	hidingSelect.classList.add('show')
}

function hide() {
	hidingSelect.classList.remove('show')
}
function hideError() {
	error.textContent = ''
}

//Listenery do powyższej funkcji

movButton.addEventListener('click', show)
xchgButton.addEventListener('click', show)
notButton.addEventListener('click', hide)
incButton.addEventListener('click', hide)
decButton.addEventListener('click', hide)
andButton.addEventListener('click', show)
orButton.addEventListener('click', show)
xorButton.addEventListener('click', show)
addButton.addEventListener('click', show)
subButton.addEventListener('click', show)
buttons.forEach(buttons => {
	buttons.addEventListener('click', hideError)
})

// Zabezpieczenie przed niewypełnieniem wartości rejestrów

function registerValid() {
	if (
		AL.value.length === 2 &&
		AH.value.length === 2 &&
		BL.value.length === 2 &&
		BH.value.length === 2 &&
		CL.value.length === 2 &&
		CH.value.length === 2 &&
		DL.value.length === 2 &&
		DH.value.length === 2
	) {
		buttons.forEach(buttons => {
			buttons.disabled = false
		})
	} else {
		buttons.forEach(buttons => {
			buttons.disabled = true
		})
	}
}
input.forEach(input => {
	input.addEventListener('keyup', registerValid)
})
//Zabezpieczenie przed wpisaniem znaków nie należących do formatu Hexadecimal
//Pobranie wszystkich input text

// Funkcja zabezpieczająca
function HexListener() {
	let regEx = /^[0-9a-fA-F]+$/
	let isHex = regEx.test(this.value.toString())
	if (!isHex) {
		this.value = this.value.slice(0, -1)
	}
}
//Dodanie Listenera dla każdego elementu NodeListy
input.forEach(input => {
	input.addEventListener('keyup', HexListener)
})

//FUNKCJE:

// Początek funkcji MOV

movButton.addEventListener('click', function () {
	displaySelect.classList.add('show')
	buttons.forEach(buttons => {
		buttons.classList.remove('use')
	})
	movButton.classList.add('use')
	currentAction = 'mov'
})

function mov() {
	if (firstOperationSelect.value !== secoundOperationSelect.value) {
		const firstValueAdd = firstOperationSelect.value
		const secoundValueAdd = secoundOperationSelect.value
		let firstValue = document.querySelector(firstValueAdd)
		let secoundValue = document.querySelector(secoundValueAdd)
		secoundValue.value = firstValue.value
	} else {
		error.classList.add('show')
		error.textContent = 'Nie można wybrać jednakowych rejestrów'
	}
}

//Początek funkcj xchng

xchgButton.addEventListener('click', function () {
	displaySelect.classList.add('show')
	buttons.forEach(buttons => {
		buttons.classList.remove('use')
	})
	xchgButton.classList.add('use')
	currentAction = 'xchg'
})

function xchg() {
	if (firstOperationSelect.value !== secoundOperationSelect.value) {
		const firstValueAdd = firstOperationSelect.value
		const secoundValueAdd = secoundOperationSelect.value
		let firstValue = document.querySelector(firstValueAdd)
		let secoundValue = document.querySelector(secoundValueAdd)
		let temporaryValue = null
		temporaryValue = secoundValue.value
		secoundValue.value = firstValue.value
		firstValue.value = temporaryValue
	} else {
		error.textContent = 'Nie można wybrać jednakowych rejestrów'
	}
}

//Funkcja zmieniająca wartość rejestru na format 8 bitowy
function transformValueToEightBytesFormat(value) {
	let firstFourBytes = parseInt(value[0], 16).toString(2)
	let nextFourBytes = parseInt(value[1], 16).toString(2)
	if (firstFourBytes) {
		const zeroString = '0'
		firstFourBytes = zeroString.repeat(4 - firstFourBytes.length) + firstFourBytes
	}
	if (nextFourBytes) {
		const zeroString = '0'
		nextFourBytes = zeroString.repeat(4 - nextFourBytes.length) + nextFourBytes
	}
	const binaryValue = firstFourBytes.concat(nextFourBytes)
	return binaryValue
}
// Początek funkcji NOT

notButton.addEventListener('click', function () {
	displaySelect.classList.add('show')
	buttons.forEach(buttons => {
		buttons.classList.remove('use')
	})
	notButton.classList.add('use')
	currentAction = 'not'
})

function not() {
	const firstValueAdd = firstOperationSelect.value
	let firstValue = document.querySelector(firstValueAdd)
	const binaryValue = transformValueToEightBytesFormat(firstValue.value)
	const bits = [...binaryValue]
	const negatedBits = bits.map(byte => (byte == 1 ? 0 : 1))
	const negatedBinary = parseInt(negatedBits.join(''), 2).toString(16)
	firstValue.value = negatedBinary.length == 1 ? '0' + negatedBinary : negatedBinary
}

//Początek funkcji INC
incButton.addEventListener('click', function () {
	displaySelect.classList.add('show')
	buttons.forEach(buttons => {
		buttons.classList.remove('use')
	})
	incButton.classList.add('use')
	currentAction = 'inc'
})

function inc() {
	const firstValueAdd = firstOperationSelect.value
	let firstValue = document.querySelector(firstValueAdd)
	let decData = parseInt(firstValue.value, 16)
	decData++
	let incDataHex = decData.toString('16')
	incDataHex.length == 1 ? (incDataHex = '0' + incDataHex) : ''
	incDataHex = incDataHex[incDataHex.length - 2] + incDataHex[incDataHex.length - 1]
	firstValue.value = incDataHex
}

//Początek funkcji DEC

decButton.addEventListener('click', function () {
	displaySelect.classList.add('show')
	buttons.forEach(buttons => {
		buttons.classList.remove('use')
	})
	decButton.classList.add('use')
	currentAction = 'dec'
})

function dec() {
	const firstValueAdd = firstOperationSelect.value
	let firstValue = document.querySelector(firstValueAdd)
	let decData = parseInt(firstValue.value, 16)
	let result
	if (decData - 1 < 0) {
		result = 'FF'
	} else {
		decData--
		let decDataHex = decData.toString('16')
		decDataHex.length == 1 ? (result = '0' + decDataHex) : (result = decDataHex)
	}
	firstValue.value = result
}

//Początek funkcji AND

andButton.addEventListener('click', function () {
	displaySelect.classList.add('show')
	buttons.forEach(buttons => {
		buttons.classList.remove('use')
	})
	andButton.classList.add('use')
	currentAction = 'and'
})

function and() {
	if (firstOperationSelect.value !== secoundOperationSelect.value) {
		const firstValueAdd = firstOperationSelect.value
		const secoundValueAdd = secoundOperationSelect.value
		let firstValue = document.querySelector(firstValueAdd)
		let secoundValue = document.querySelector(secoundValueAdd)
		const firstEightBytes = [...transformValueToEightBytesFormat(firstValue.value)]
		const secoundEightBytes = [...transformValueToEightBytesFormat(secoundValue.value)]
		let transformedOperation = []
		for (let i = 0; i < 8; i++) {
			transformedOperation[i] = firstEightBytes[i] * secoundEightBytes[i]
		}
		transformedOperation = parseInt(transformedOperation.join(''), 2).toString(16)
		transformedOperation = transformedOperation.length == 1 ? '0' + transformedOperation : transformedOperation
		firstValue.value = transformedOperation
	} else {
		error.textContent = 'Nie można wybrać jednakowych rejestrów'
	}
}

//Początek funkcji OR

orButton.addEventListener('click', function () {
	displaySelect.classList.add('show')
	buttons.forEach(buttons => {
		buttons.classList.remove('use')
	})
	orButton.classList.add('use')
	currentAction = 'or'
})

function or() {
	if (firstOperationSelect.value !== secoundOperationSelect.value) {
		const firstValueAdd = firstOperationSelect.value
		const secoundValueAdd = secoundOperationSelect.value
		let firstValue = document.querySelector(firstValueAdd)
		let secoundValue = document.querySelector(secoundValueAdd)
		const firstEightBytes = [...transformValueToEightBytesFormat(firstValue.value)]
		const secoundEightBytes = [...transformValueToEightBytesFormat(secoundValue.value)]
		let transformedOperation = []
		for (let i = 0; i < 8; i++) {
			transformedOperation[i] = firstEightBytes[i] == '1' || secoundEightBytes[i] == '1' ? 1 : 0
		}
		transformedOperation = parseInt(transformedOperation.join(''), 2).toString(16)
		transformedOperation = transformedOperation.length == 1 ? '0' + transformedOperation : transformedOperation
		firstValue.value = transformedOperation
	} else {
		error.textContent = 'Nie można wybrać jednakowych rejestrów'
	}
}

//Początek funkcji XOR

xorButton.addEventListener('click', function () {
	displaySelect.classList.add('show')
	buttons.forEach(buttons => {
		buttons.classList.remove('use')
	})
	xorButton.classList.add('use')
	currentAction = 'xor'
})

function xor() {
	if (firstOperationSelect.value !== secoundOperationSelect.value) {
		const firstValueAdd = firstOperationSelect.value
		const secoundValueAdd = secoundOperationSelect.value
		let firstValue = document.querySelector(firstValueAdd)
		let secoundValue = document.querySelector(secoundValueAdd)
		const firstEightBytes = [...transformValueToEightBytesFormat(firstValue.value)]
		const secoundEightBytes = [...transformValueToEightBytesFormat(secoundValue.value)]
		let transformedOperation = []
		for (let i = 0; i < 8; i++) {
			if (firstEightBytes[i] == '1' || secoundEightBytes[i] == '1') {
				if (firstEightBytes[i] == '1' && secoundEightBytes[i] == '1') {
					transformedOperation[i] = 0
				} else {
					transformedOperation[i] = 1
				}
			} else {
				transformedOperation[i] = 0
			}
		}
		transformedOperation = parseInt(transformedOperation.join(''), 2).toString(16)
		transformedOperation = transformedOperation.length == 1 ? '0' + transformedOperation : transformedOperation
		firstValue.value = transformedOperation
	} else {
		error.textContent = 'Nie można wybrać jednakowych rejestrów'
	}
}

//Początek funkcji ADD

addButton.addEventListener('click', function () {
	displaySelect.classList.add('show')
	buttons.forEach(buttons => {
		buttons.classList.remove('use')
	})
	addButton.classList.add('use')
	currentAction = 'add'
})

function add() {
	if (firstOperationSelect.value !== secoundOperationSelect.value) {
		const firstValueAdd = firstOperationSelect.value
		const secoundValueAdd = secoundOperationSelect.value
		let firstValue = document.querySelector(firstValueAdd)
		let secoundValue = document.querySelector(secoundValueAdd)
		const decFirstData = parseInt(firstValue.value, 16)
		const decSecoundData = parseInt(secoundValue.value, 16)
		let result = (decFirstData + decSecoundData).toString(16)
		result = result[result.length - 2] + result[result.length - 1]
		result.length == 2 ? '' : (result = '0' + result)
		firstValue.value = result
	} else {
		error.textContent = 'Nie można wybrać jednakowych rejestrów'
	}
}

//Początek funckji SUB

subButton.addEventListener('click', function () {
	displaySelect.classList.add('show')
	buttons.forEach(buttons => {
		buttons.classList.remove('use')
	})
	subButton.classList.add('use')
	currentAction = 'sub'
})

function sub() {
	if (firstOperationSelect.value !== secoundOperationSelect.value) {
		const firstValueAdd = firstOperationSelect.value
		const secoundValueAdd = secoundOperationSelect.value
		let firstValue = document.querySelector(firstValueAdd)
		let secoundValue = document.querySelector(secoundValueAdd)
		const decFirstData = parseInt(firstValue.value, 16)
		const decSecoundData = parseInt(secoundValue.value, 16)
		let result
		if (decFirstData - decSecoundData >= 0) {
			result = (decFirstData - decSecoundData).toString('16')
		} else {
			const higherValue = decFirstData < decSecoundData ? decSecoundData : decFirstData
			const lowerValue = decFirstData > decSecoundData ? decSecoundData : decFirstData
			const valueAfterCalc = 255 - higherValue + 1
			result = (lowerValue + valueAfterCalc).toString('16')
		}
		result.length == 2 ? '' : (result = '0' + result)
		firstValue.value = result
	} else {
		error.textContent = 'Nie można wybrać jednakowych rejestrów'
	}
}
