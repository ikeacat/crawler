function loadStartMenu() {
    document.title = "Index of /crawler"
    document.getElementById("indextitle").innerHTML = "Index of /crawler";
    document.getElementById("indexlist").innerHTML = `<ul id='insertLater'>
    <li>/startNewGame</li>
    <li>/continueOldGame</li>
    <ul>`;
    var darkSetting = localStorage.getItem("darkSetting")
    if(darkSetting == "dark") {
        console.log("Found Light mode.")
        document.getElementById("insertLater").innerHTML += "<li>activateLightMode.exe</li>"
    } else if(darkSetting == "light") {
        console.log("Found Dark mode.")
        document.getElementById("insertLater").innerHTML += "<li><a>activateDarkMode.exe</a></li>"
    } else {
        console.log("No darkSetting thing, assuming light.")
        document.getElementById("insertLater").innerHTML += "<li>activateDarkMode.exe</li>"
        localStorage.setItem("darkSetting","light")
    }
}

function darkMode(dms) {
    var darkSetting = localStorage.getItem("darkSetting")
    if(dms == "dark") {
        localStorage.setItem("darkSetting","dark");
        document.getElementById("csslink").setAttribute("href","darkMode.css");
    } else if (dms == "light") {
        localStorage.setItem("darkSetting","light");
        document.getElementById("csslink").setAttribute("href","lightMode.css");
    }
}