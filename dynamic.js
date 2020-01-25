var versionNumber = "1.0.1"

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
    <li>/startNewGame</li>
    <li>/continueOldGame</li>` + dm +
    `</ul><hr>`;
    var vnumber = getLSVNum()
    document.getElementById("extras").innerHTML = `<h6>Version ` + versionNumber + `</h6><h6>Autosave number: ` + vnumber + `</h6><h6>Automagically saves (if it doesn't it will tell you)</h6>`;
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
        return "No save found. Whoops!"
    }
}

function darkMode(dms) {
    var darkSetting = localStorage.getItem("darkSetting")
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