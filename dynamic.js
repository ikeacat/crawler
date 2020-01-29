var versionNumber = "1.1"
var ginfo = {};

function loadStartMenu() {
    document.title = "Index of /crawler"
    document.getElementById("indextitle").innerHTML = "Index of /crawler";
    var darkSetting = localStorage.getItem("darkSetting")
    if(darkSetting == "dark") {
        console.log("Found Dark mode.")
        document.getElementById("csslink").setAttribute("href","darkMode.css");
        var dm = `<li><a id='dmswitch' href='javascript:darkMode("light");'>switchToLightMode.exe</a></li>`
    } else if(darkSetting == "light") {
        console.log("Found Light mode.")
        document.getElementById("csslink").setAttribute("href","lightMode.css");
        var dm = `<li><a id='dmswitch' href='javascript:darkMode("dark");'>switchToDarkMode.exe</a></li>`
    } else {
        console.log("No darkSetting thing, assuming light.")
        var dm = `<li><a id='dmswitch' href='javascript:darkMode("dark");'>switchToDarkMode.exe</a></li>`
        document.getElementById("csslink").setAttribute("href","lightMode.css");
        localStorage.setItem("darkSetting","light");
    }
    document.getElementById("indexlist").innerHTML = `<ul id='insertLater'>
    <li><a href='javascript:startNewGame()'>/startNewGame</a>  <i>Will delete old save.</i></li>
    <li>/continueOldGame</li>` + dm +
    `</ul><hr>`;
    var vnumber = getLSVNum()
    document.getElementById("extras").innerHTML = `<h6>Version ` + versionNumber + `</h6><h6>Autosave number: ` + vnumber + `</h6><h6>Automagically saves (if it doesn't it will tell you)</h6>`;
    console.log("Done loading start menu.");
}

function getLSVNum() {
    var vnum = localStorage.getItem("originalSaveVersion");
    if(vnum != null) {
        if(vnum != versionNumber) {
            var message = vnum + " Your save may not be compatible, depending on how far back it was made. If it is broken, sorry."
            return message;
        }
        if(vnum == versionNumber) {
            return vnum + " Your save was made with this version.";
        }
    } else {
        return "No save found. Whoops!";
    }
}

function loadDirectory(dir) {
    if(dir == "/home") {
        localStorage.setItem("activeDirectory","/home")
        clearPage();
        document.getElementById("indextitle").innerHTML = "Index of /home";
        document.getElementById("indexlist").innerHTML = "<ul id='homelist'></ul>";
        document.getElementById("homelist").innerHTML = `<li><a href='javascript:loadDirectory("/home/Downloads")'>/Downloads</a></li>
        <li><a href='javascript:cat(1)'>hello.rtf</a></li>
        <li><a href='javascript:cat(2)'>introduction.mission</a></li>`;
    }
    if(dir == "/home/Downloads") {
        localStorage.setItem("activeDirectory","/home/Downloads")
        clearPage();
        var downloadsLS = localStorage.getItem("downloads");
        if(downloadsLS != null) {
            var downloadsDLS = downloadsLS.replace("undefined","")
        }
        console.log(downloadsDLS)
        document.getElementById("indextitle").innerHTML = "Index of /home/Downloads";
        document.getElementById("indexlist").innerHTML = `<ul><li><a href='javascript:loadDirectory("/home")'>/..</a></li>` + downloadsDLS + "</ul>";
    }
}

function clearPage() {
    document.getElementById("indextitle").innerHTML = "";
    document.getElementById("indexlist").innerHTML = "";
    document.getElementById("filename").innerHTML = "";
    document.getElementById("filecontents").innerHTML = "";
    document.getElementById("extras").innerHTML = "";
}

function startNewGame() {
    var saveDMS = localStorage.getItem("darkSetting");
    localStorage.clear();
    localStorage.setItem("darkSetting",saveDMS);
    localStorage.setItem("originalSaveVersion",versionNumber);
    clearPage();
    document.getElementById("indextitle").innerHTML = "NAID Signup";
    document.getElementById("indexlist").innerHTML = "<p>Set a username and password before using NAID devices. This cannot be changed after submitted.</p>"
    document.getElementById("filename").innerHTML = "<p>Username</p><input id='name'></input><p>Password</p><input id='pword'></input><br><br><button onclick='setUsername()'>Continue</button>";
}

function setUsername() {
    ginfo.username = document.getElementById("name").value;
    ginfo.password = document.getElementById("pword").value;
    var email = ginfo.username + "@naid.gov"
    email = email.replace(" ", ".")
    console.log(email)
    ginfo.email = email
    localStorage.setItem("un", ginfo.username);
    localStorage.setItem("pw", ginfo.password);
    localStorage.setItem("email", ginfo.email);
    loadDirectory("/home");
}

function darkMode(dms) {
    var darkSetting = localStorage.getItem("darkSetting");
    if(dms == "dark") {
        localStorage.setItem("darkSetting","dark");
        document.getElementById("csslink").setAttribute("href","darkMode.css");
        document.getElementById("dmswitch").innerHTML = 'switchToLightMode.exe';
        document.getElementById("dmswitch").setAttribute("href","javascript:darkMode('light')");
    } else if (dms == "light") {
        localStorage.setItem("darkSetting","light");
        document.getElementById("csslink").setAttribute("href","lightMode.css");
        document.getElementById("dmswitch").innerHTML = 'switchToDarkMode.exe';
        document.getElementById("dmswitch").setAttribute("href","javascript:darkMode('dark')");
    }
}

function cat(refid) {
    if(refid == 1) {
        clearPage();
        document.getElementById("filename").innerHTML = "<p>hello.email; RefID: 1</p>";
        document.getElementById("filecontents").innerHTML = `<p>
        <b>To: </b> ` + localStorage.getItem("email") +
        `<br><br><b>From: </b>cdebordeaux@naid.gov<br><br>
        <b>Subject: </b>Hello!<br><br>
        Hello,<br><br>
        Welcome to the NAID Crimestopper Program!<br><br>
        I hope you are doing well.<br><br>
        As you can see, Y2K didn't happen. My heart rate went up 200 bpm once the clock hit midnight last night!.<br><br>
        Anyways, lets get down to business.<br>
        This entire job you have will be on a case by case basis. For now, lets start you off with an intro case. Easy and smooth.<br>
        This will be described in the mission file. Download the attachment, run it, and you will be able to access all NAID mission files.<br><br>
        - Catherine De Bordeaux</p><br><br>
        <span>ATTACHMENT: <a href='javascript:download(3)'>missionkey.ppk</a></span>
        <span>[ <a href='javascript:loadDirectory("/home");'>Back</a> ]</span>`;
    }
    if(refid == 2) {
        clearPage();
        document.getElementById("filename").innerHTML = "<p>introduction.mission; RefID: 2</p><br>";
        var lscheck = localStorage.getItem("ranNAIDKey");
        document.getElementById("filecontents").innerHTML = "<p>REQUISITES:<br><br>NAID Private Key 1: <span id='check1'>Waiting for Check<span><br>NAID Private Key 4: <span id='check2'>Waiting for Check</span><br><br><span>[ <a href='javascript:runFile(2)'>Start Check</a> ]</span><br><br><span id='amf'></span>"
    }
    if(refid == 3) {
        clearPage();
        document.getElementById("filename").innerHTML = "<p>missionkey.ppk; RefID: 3</p>";
        document.getElementById("filecontents").innerHTML = "<p>NAID Mission Private Key Bundle. Run file to continue.</p><br><br><span>[ <a href='javascript:runFile(3)'>Run File</a> ]</span><br><br><p id='cont'></p>"
    }
}

function runFile(refid) {
    if(refid == 3) {
        if(localStorage.getItem("ranNAIDKey") != "true") {
            document.getElementById("cont").innerHTML = "Added 15 private keys.<br>Added private key reader<br>Added NAID SSH key.<br><br><span>[ <a href='javascript:dynamicLD()'>Done</a> ]</span>";
            localStorage.setItem("ranNAIDKey","true");
        } else {
            document.getElementById("cont").innerHTML = "ERROR! Keys already in system. Not proceeding. Duplicates may cause problems.<br><span>[ <a href='javascript:dynamicLD()'>Ok</a> ]</span>";
            document.getElementById("cont").setAttribute("style","color:red");
        }
    }
}
function dynamicLD() {
    var LSAD = localStorage.getItem("activeDirectory");
    loadDirectory(LSAD);
}

function download(refid) {
    if(refid == 3) {
        ginfo.downloads += "<li><a href='javascript:cat(3)'>missionkey.ppk</a></li>";
        updateDownloads();
    }
}

function updateDownloads() {
    localStorage.setItem("downloads",ginfo.downloads);
}