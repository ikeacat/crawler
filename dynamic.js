var downloads = new Array;
var versionNumber = "1.0.0.1"

function loadStartMenu() {
  document.title = "Index of /crawler";
  var startedGame = localStorage.getItem("startedGame");
  if (startedGame === null) {
    var addMe = "";
  }
  if (startedGame === "True") {
    var addMe = "<li style='color:red'>/continuesave (Not Avalaible)</li>";
  }
  var darkSetting = localStorage.getItem("darkSetting");
  console.log("got le dark setting");
  if (darkSetting == "dark") {
    document.getElementById("csslink").setAttribute("href","darkMode.css");
    console.log("Detected Dark mode.");
  } else if (darkSetting = "light") {
    document.getElementById("csslink").setAttribute("href","lightMode.css");
    console.log("Detected Light mode.");
  } else {
    document.getElementById("csslink").setAttribute("href","lightMode.css");
    console.log("'darkSetting' is not 'dark' or 'light'. Assuming Light.");
    localStorage.setItem("darkSetting","light");
    console.log("Set to " + localStorage.getItem("darkSetting"));
  }
  console.log("finished le dark setting");
  var initSMList =
    `<ul>
  <li><a href='javascript:startNewGame()'>/startnewgame</a></li>` +
    addMe +
    "</ul><p>Dont worry, the game remembers what directory you were in, as long as Local Storage isn't cleared. If it is, there is nothing I can do. It will not save what file you are in when the tab was closed, just the directory.</p>";
  document.getElementById("indextitle").innerHTML =
    "<h1>Index of /crawler</h1>";
  document.getElementById("indexlist").innerHTML = initSMList;
  document.getElementById("indexlist").innerHTML += "<h6>Version " + versionNumber + "</h6>";
};

function loadOldGame() {
  if(localStorage.getItem("startedGame") === "True") {
    dynamicLoadDir();
  }
}
function startNewGame() {
  var saveDarkModeSetting = localStorage.getItem("darkSetting");
  localStorage.clear();
  localStorage.setItem("startedGame", "True");
  localStorage.setItem("downloads", JSON.stringify(downloads));
  localStorage.setItem("darkSetting", saveDarkModeSetting);
  loadDir("/home");
}

function loadDir(dir) {
  if (dir === "/home") {
    document.title = "Index of /home";
    localStorage.setItem("directory", "/home"); // Local Storage is for saving purposes.
    clearPage()
    document.getElementById("indextitle").innerHTML = "<h1>Index of /home</h1>";
    document.getElementById("indexlist").innerHTML = "<ul id='ULL'><li><a href='javascript:loadDir(`/home/Downloads`)'>/Downloads</a></li><li><a href='javascript:getFile(1)'>intro.rtf</a></li><li><a href='javascript:getFile(2);'>intro.mission</a></li></ul>";
  }
  if (dir === "/home/Downloads") {
    localStorage.setItem("directory", "/home/Downloads");
    document.title = "Index of /home/Downloads";
    clearPage();
    document.getElementById("indextitle").innerHTML = "<h1>Index of /home/Downloads</h1>";
    document.getElementById("indexlist").innerHTML = '<ul id="ull"><li><a href="javascript:loadDir(\'/home\')">/..</a></li></ul>';
    var namessuck = []
    var downloadsFLS = localStorage.getItem("downloads")
    var parsedDFLS = JSON.parse(downloadsFLS);
    namessuck.push(parsedDFLS)
    console.log(parsedDFLS)
    var i;
    for (i = 0; namessuck[i] != null; i++) {
      document.getElementById("ull").innerHTML += downloads[i];
    }
  }
}

function updateDownloads() {
  var ds = JSON.stringify(downloads);
  localStorage.setItem("downloads",ds);
}
function clearPage() {
  document.getElementById("indextitle").innerHTML = "";
  document.getElementById("indexlist").innerHTML = "";
  document.getElementById("filename").innerHTML = "";
  document.getElementById("filecontents").innerHTML = "";
  document.getElementById("extras").innerHTML = "";
};

function dynamicLoadDir() { // Shall be used in all Go Back buttons because of reference ID system
  var cd = localStorage.getItem("directory");
  loadDir(cd);
}

function getFile(refid) {
  if(refid === 1) {
    clearPage();
    document.getElementById("filename").innerHTML = "<p>intro.rtf; RefID: 1</p>";
    document.getElementById("filecontents").innerHTML = `<p>Hello Agent,<br>
    I am Chief Olson with the National Nation Investigative Department (NNID).<br>
    Welcome to our Digital Citizen Crimestopper Program aka DiCiCrOp. DiCiCrOp is working with citizens of The Nation to solve crime.<br>
    You are the first citizen to test the program.<br><br>
    Your Duties:<br>
    1. Do What you are told.<br>
    2. Obey the law applicable to you.<br>
    3. Report crime related to your assignment.<br><br>
    I have attached the private key to our mission files. It will download to your downloads folder. Once ran, it will automatically unlock all mission files from us.<br><br>
    Good luck,<br>
    Chief Olson<br>
    NNID<br><br></p>
    <p>ATTACHMENTS:<br>
    <a href='javascript:downloadFile(3);'>nnidmissionencryptionprivatekey.ppk (RefID: 3)</a></p><br><br>
    <span>[ <a href='javascript:dynamicLoadDir();'>Go Back</a> ] [ <a href='javascript:deleteFile(1);'>Delete</a> ]`;
  }
  if(refid == 2) {
    clearPage();
    document.getElementById("filename").innerHTML = "<p>intro.mission; RefID: 2</p>";
    var ranEncFile = localStorage.getItem("allowMissionFiles");
    if(ranEncFile == "True") {
      var checkMissionStatus = missionCheck(1,1);
      document.getElementById("filecontents").innerHTML = `<p>Found encryption key installed, decrypting...<br><br>
      Mission ID: 1<br><br>
      Mission: Intro<br><br>
      Mission Source: National Nation Investigative Department (NNID)<br><br>
      Description: Learn how to use the browser, file explorer, and mission program. Extra instructions will be provided upon acception. - Olson<br><br>
      </p><span id='addShidHere'></span><br><br>`;
      if(checkMissionStatus === "notStarted") {
        document.getElementById('addShidHere').innerHTML = "[ <a href='javascript:missionCheck(2,1,1);' id='amButton'>Accept Mission</a> ] [ <a href='javascript:dynamicLoadDir();'>Go Back</a> ]"
      }
      if(checkMissionStatus === "started") {
      	document.getElementById("addShidHere").innerHTML = "[ Mission already accepted. ] [ <a href='javascript:dynamicLoadDir();'>Go Back</a> ]";
      }
    }
    if(ranEncFile != "True") {
      document.getElementById("filecontents").innerHTML = "<p>ERROR: Cannot decode encoded file. Calls for 'nnidmissionencryptionprivatekey.ppk'.<br><br></p><span>[ <a href='javascript:dynamicLoadDir();'>Go Back</a> ]</span>";
    }
  }
  if(refid == 3) {
    clearPage();
    document.getElementById("filename").innerHTML = "<p>nnidmissionencryptionprivatekey.ppk; RefID: 3</p><br><br>";
    if(localStorage.getItem("disableNEPK") != "True") {
      document.getElementById("filecontents").innerHTML = `<p>READING FILE...<br><br>
      <a href='javascript:miscFunction(1,3)'>Decode File</a><br>
      <div id='adf'></div>`;
    }
    if(localStorage.getItem("disableNEPK") == "True") {
      document.getElementById("filecontents").innerHTML = "<p>File was already executed. <span>[ <a href='javascript:dynamicLoadDir()'>Go Back</a> ]</span></p>";
    }
  }
  if(refid == 4) {
  	clearPage();
  	
  }
}

function downloadFile(refid) {
  if(refid == 3) {
  	var checkAgainst = "<li><a href='javascript:getFile(3);'>nnidmissionencryptionprivatekey.ppk</a></li>"
  	var check = downloads.includes(checkAgainst);
  	if(check === false) {
    	downloads.push(checkAgainst);
    	updateDownloads();
	}
	if(check === true) {
		doNothing();
	}
  updateDownloads()
  }
  if(refid == 4) {
    var checkAgainst = "<li><a href='javascript:getFile(4)'>nnidmission1.txt</a></li>";
    var check = downloads.includes(checkAgainst)
    if(check === false) {
  	 downloads.push('<li><a href="javascript:getFile(4)">nnidmission1.txt</a></li>');
  	 updateDownloads();
    }
    if(check === true) {
      doNothing();
    }
  }
}

function miscFunction(functionnum, refid) {
  if(functionnum == 1) { // Decode File
    if(refid == 3) {
      if(localStorage.getItem("disableNEPK") != "True") {
        document.getElementById("adf").innerHTML = `<p>Added 13 allowed IPs<br>
        Added 4 private keys<br>
        Edited config for keys to apply to .mission files.<br><br></p>
        <span>[ <a href='javascript:dynamicLoadDir()'>Done</a> ]</span>`;
        localStorage.setItem("allowMissionFiles","True");
        localStorage.setItem("disableNEPK","True");
      }
    }
  }
}

function missionCheck(action, missionID, missionAction) {
  if(action == 1) { // Check for mission completion and acceptance.
    if(missionID == 1) { // intro.mission
      var checkStatus = localStorage.getItem("mission1");
      if(checkStatus === null) {
        return "notStarted";
      }
      if(checkStatus === "notStarted") {
      	return "notStarted";
      }
      if(checkStatus === "started") {
        return "started";
      }
      if(checkStatus === "complete") {
        return "complete";
      }
      if(checkStatus === "aborted") {
        return "aborted";
      }
    }
  }
  if(action === 2) { // Call for accept, complete, or abort.
    if(missionID === 1) { // intro.mission; Contains specific element ID's that might not be in other mission file HTML
      if(missionAction === 1) { // Write to LS "started"
        localStorage.setItem("mission1", "started");
        document.getElementById("amButton").innerHTML = "Mission accepted.";
        document.getElementById("amButton").setAttribute("href", "javascript:doNothing();");
        downloadFile(4);
        document.getElementById("filecontents").innerHTML += "<p>Downloaded nnidmission1.txt (RefID: 4) to /home/Downloads.</p>";
      }
    }
  }
}

function doNothing() {
  console.log("Did nothing!");
}

function debug(num) {
  if(num === 1) {
    document.getElementById("csslink").setAttribute("href","darkMode.css");
  }
}

function changeMode(dlm) {
  if(dlm == "darkMode") {
    document.getElementById("csslink").setAttribute("href","darkMode.css");
    localStorage.setItem("darkSetting","dark");
  }
  if(dlm == "lightMode") {
    document.getElementById("csslink").setAttribute("href","lightMode.css");
    localStorage.setItem("darkSetting","light");
  }
}