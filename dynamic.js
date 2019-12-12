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
}

function startNewGame() {
  localStorage.clear();
  localStorage.setItem("startedGame", "True");
}

function loadDir(dir) {
  if (dir === "home") {
    localStorage.setItem("directory", "/home");
  }
}
