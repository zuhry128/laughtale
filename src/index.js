import setItem from "./browserStorage"

const usernameInput = document.getElementById('usernameInput')
const passwordInput = document.getElementById('passwordInput')
const loginButton   = document.getElementById('loginSubmit')

loginButton.addEventListener('click', () => {
  const usernameInputValue = usernameInput.value
  const passwordInputValue = passwordInput.value
  console.log(`detected inputs: ${usernameInputValue} ${passwordInputValue}`)

  try {
    setItem(usernameInputValue, passwordInputValue)
  } catch(err) {
    console.log(err)
  }
})

