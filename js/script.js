const btnClose = document.querySelector(".header__close-btn")
const btnOpen = document.querySelector(".header__menu-mob-btn")
const mobMenu = document.querySelector(".header__box-mob-menu")
const body = document.querySelector("body")

btnOpen.addEventListener("click", function () {
    mobMenu.classList.add("header__box-mob-menu--open")
    body.classList.add("overflow-y-off")
})

btnClose.addEventListener("click", function () {
    mobMenu.classList.remove("header__box-mob-menu--open")
    body.classList.remove("overflow-y-off")
})

//mask-phone_______________________________
let phoneInputs = document.querySelectorAll('input[data-tel-input]')
let telValidate = false

function getInputNumbersValue (input) {
    return input.value.replace(/\D/g, '')
}

function onPhonePaste (e) {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input)
    let pasted = e.clipboardData || window.clipboardData
    if (pasted) {
        let pastedText = pasted.getData('Text')
        if (/\D/g.test(pastedText)) {
            input.value = inputNumbersValue
            return
        }
    }
}

function onPhoneInput (e) {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = ""

    if (!inputNumbersValue) {
        return input.value = ""
    }

    if (input.value.length != selectionStart) {
        if (e.data && /\D/g.test(e.data)) {
            input.value = inputNumbersValue
        }
        return
    }
    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue
        let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7"
        formattedInputValue = input.value = firstSymbols + " "
        if (inputNumbersValue.length > 1) {
            formattedInputValue += '(' + inputNumbersValue.substring(1, 4)
        }
        if (inputNumbersValue.length >= 5) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7)
        }
        if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9)
        }
        if (inputNumbersValue.length >= 10) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11)
        }
    } else {
        formattedInputValue = '+7(' + inputNumbersValue.substring(0, 16)
    }
    input.value = formattedInputValue
}
function onPhoneKeyDown (e) {
    let inputValue = e.target.value.replace(/\D/g, '')
    if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = ""
    }
}

for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener('keydown', onPhoneKeyDown)
    phoneInput.addEventListener('input', onPhoneInput, false)
    phoneInput.addEventListener('paste', onPhonePaste, false)
    phoneInput.addEventListener('blur', InputValidateTel)
}


//Validate____________________________________________________________
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
let inputsEmail = document.querySelectorAll('input[data-email-input]')

for (let inputEmail of inputsEmail) {
    inputEmail.addEventListener('blur', onInput)
}

function InputValidateTel(e){
    let str = e.target.value
    if (str[0] == '+'){
        if (str.length == 18){
            e.target.classList.remove('invalid-input')
        }
        else {
            e.target.classList.add('invalid-input')
            e.target.addEventListener('input', InputValidateTel)
        }
    }
    else if (str[0] == '8'){
        if (str.length == 17){
            e.target.classList.remove('invalid-input')
        }
        else {
            e.target.classList.add('invalid-input')
            e.target.addEventListener('input', InputValidateTel)
        }
    }
}

function isEmailValid(value) {
 	return EMAIL_REGEXP.test(value)
}

function onInput(e) {
	if (isEmailValid(e.target.value)) {
		e.target.classList.remove('invalid-input')
	} else {
		e.target.classList.add('invalid-input')
        e.target.addEventListener('input', onInput)
	}
}

