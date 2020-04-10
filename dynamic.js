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
  if(usrnm == "") {
    usrnm = "Dunce";
  }
  localStorage.setItem("username", usrnm);
  localStorage.setItem("password", paswd);
  localStorage.setItem("rainbow","true");
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
  var rainbow = localStorage.getItem('rainbow');
  document.getElementById("rootDIV").innerHTML = `<div><div id='infoCard' class='defaultCardDynamic HSInfoCard'><h1 class='leftfifty welcomeMessage' id='welcome'>Welcome, <span id='un'></span>!</div>
  <div class='defaultCardDynamic HSCardTopMargin HSMissionCard' id='MissionCard' style='height: 250px;'><h1 class='leftfifty HSCardText'>Missions</h1></div>
  <a href='javascript:settingsPage()' class='noAUnderline'><div class='defaultCardDynamic HSCardTopMargin HSSettingsCard' id='SettingCard'><h1 class='leftfifty HSCardText'>Settings</h1></div></a></div>`;
  document.getElementById("un").innerHTML = localStorage.getItem("username");
  if(rainbow == "false") {
    document.getElementById("MissionCard").classList.add("altHSBGAni");
    document.getElementById("SettingCard").classList.add("altHSBGAni");
    document.getElementById("welcome").classList.add("noRainbowAniWelcome");
  }
}

function settingsPage() {
  document.getElementById("rootDIV").innerHTML = `<div id='settingsCard' class='defaultCardDynamic HSInfoCard'><div class='leftfifty'>
  <h1 style='font-size:60px;'>Settings</h1>
  <br>
  <h2>Home Screen</h2>
  <p>Rainbow animations around boxes & on text</p>
  <input type="radio" id="yesrainbow" name="rainbowanihsbox" value="yes">
  <label for="yesrainbow">Have the rainbow</label><br>
  <input type="radio" id="norainbow" name="rainbowanihsbox" value="no">
  <label for="norainbow">No Rainbow (green / black)</label><br><br>
  <button class='noButtonGoUp defbutton' onclick='saveSettings()'>Save</button>
  <br><br><br>
  </div></div>`
  checkTrueValues();
}

function checkTrueValues() {
  var rainbowVal = localStorage.getItem("rainbow");
  if(rainbowVal == "true") {
    document.getElementById("yesrainbow").checked = true;
  } else if(rainbowVal == "false") {
    document.getElementById("norainbow").checked = true;
  } else { // Go To default value.
    localStorage.setItem("rainbow","true");
    checkTrueValues();
  }
}

function saveSettings() {
  var rainbowVals = document.getElementsByName("rainbowanihsbox");
  if(rainbowVals[0].checked == true) {
    localStorage.setItem("rainbow","true")
  } else if (rainbowVals[1].checked == true) {
    localStorage.setItem("rainbow","false")
  }
  homeScreen();
}