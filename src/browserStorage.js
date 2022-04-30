const date = new Date().getUTCMilliseconds()
function setItem(username, password) {
  if(typeof(Storage) !== "undefined") {
  localStorage.setItem("id", date)
  localStorage.setItem("username",username)
  localStorage.setItem("password",password)
  console.log(`username is: ${username} password is: ${password}` )
  } else {
    alert("this browser did not support browser storage")
  }
}

export default setItem
