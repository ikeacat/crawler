var downloads = new Array;

function loadStartMenu() {
  document.title = "Index of /crawler";
  var startedGame = localStorage.getItem("startedGame");
  if (startedGame === null) {
    var addMe = "";
  }
  if (startedGame === "True") {
    var addMe = "<li style='color:red'>/continuesave (Not Avalaible)</li>";
  }
  var initSMList =
    `<ul>
  <li><a href='javascript:startNewGame()'>/startnewgame</a></li>` +
    addMe +
    "</ul>";
  document.getElementById("indextitle").innerHTML =
    "<h1>Index of /crawler</h1>";
  document.getElementById("indexlist").innerHTML = initSMList;
};

function loadOldGame() {

}
function startNewGame() {
  localStorage.clear();
  localStorage.setItem("startedGame", "True");
  localStorage.setItem("downloads", JSON.stringify(downloads));
  loadDir("/home");
}

function loadDir(dir) {
  if (dir === "/home") {
    localStorage.setItem("directory", "/home"); // Local Storage is for saving purposes.
    clearPage()
    document.getElementById("indextitle").innerHTML = "<h1>Index of /home</h1>";
    document.getElementById("indexlist").innerHTML = "<ul id='ULL'><li><a href='javascript:loadDir(`/home/Downloads`)'>/Downloads</a></li><li><a href='javascript:getFile(1)'>intro.txt</a></li><li>intro.mission</li></ul>";
  }
  if (dir === "/home/Downloads") {
    localStorage.setItem("directory", "/home/Downloads");
    clearPage();
    document.getElementById("indextitle").innerHTML = "<h1>Index of /home/Downloads</h1>";
    document.getElementById("indexlist").innerHTML = '<ul id="ull"><li><a href="javascript:loadDir(\'/home\')">/..</a></li></ul>';
    var downloadsFLS = localStorage.getItem("downloads")
    var parsedDFLS = JSON.parse(downloadsFLS);
    var i;
    for (i = 0; downloads[i] != null; i++) {
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

function dynamicLoadDir() {
  var cd = localStorage.getItem("directory");
  loadDir(cd);
}

function getFile(refid) {
  if(refid === 1) {
    clearPage();
    document.getElementById("filename").innerHTML = "<p>intro.txt; RefID: 1</p>"
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
    <span>[ <a href='javascript:dynamicLoadDir();'>Go Back</a> ] [ <a href='deleteFile(1);'>Delete</a> ]`;
  }
  if(refid == 3) {
  }
}

function downloadFile(refid) {
  if(refid == 3) {
    downloads.push("<li><a>nnidmissionencryptionprivatekey.ppk</a></li>");
    updateDownloads();
  }
}
