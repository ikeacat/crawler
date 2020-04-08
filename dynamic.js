var versionNumber = "1.2"

function startGame() {
  document.getElementsByClassName("HSBody")[0].classList.remove("HSBody")
  document.getElementById("rootDIV").innerHTML = `<button class='connectButton' onclick='naidsetup()'>Connect</button>`;
}

function naidsetup() {
  document.getElementById("rootDIV").innerHTML = `<h1>Welcome to the National North American Investigative Department! (NNAID)</h1>
  <p>To get started, please enter a password and name.</p><br>
  <h5>Name: </h5>
  <input id='un' />
  <br>
  <h5>Password: </h5>
  <input id='pw' />
  <br><br><br>
  <button class='defbutton noButtonGoUp'>Submit to NNAID</button>`
}