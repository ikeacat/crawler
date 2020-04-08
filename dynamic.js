var versionNumber = "1.2"

function startGame() {
  document.getElementsByClassName("HSBody")[0].classList.remove("HSBody");
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
  <button class='defbutton noButtonGoUp' onclick='submitCreds()'>Submit to NNAID</button>`;
}

function submitCreds() {
  localStorage.clear()
  var usrnm = document.getElementById("un").value;
  var paswd = document.getElementById("pw").value;
  localStorage.setItem("username", usrnm);
  localStorage.setItem("password", paswd);
  messageFromDirector();
}

function messageFromDirector() {
  var usrnm = localStorage.getItem("username");
  document.getElementById("rootDIV").innerHTML = `<h1>Message from the Director</h1>
  <p>Hello, ` + usrnm + `,</p>
  <p>Welcome to the NNAID! I am glad to have you join us.<br>
  I will let you get yourself situated.<br>
  Once you are done, go to the missions page and select the 'Introduction' mission.<br></p>
  <button class='defbutton' onclick='homeScreen()'>Continue to Home Screen</button>`;
}

function homeScreen() {
  document.getElementById("rootDIV").innerHTML = `<div><div id='infoCard' class='defaultCardDynamic HSInfoCard'><h1 class='leftfifty welcomeMessage'>Welcome, <span id='un'></span>!</div>
  <div class='defaultCardDynamic HSCardTopMargin HSMissionCard' style='height: 250px;'><h1 class='leftfifty' style='top:140px;'>Missions</h1></div></div>`;
  document.getElementById("un").innerHTML = localStorage.getItem("username");
}