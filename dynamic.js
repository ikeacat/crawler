var versionNumber = "1.2"

function startGame() {
  var i;
  var attr;
  for(i = 0; i != -511; i--) {
    attr = "transform: translateX(" + i + "px);";
    document.getElementById("fullHS").setAttribute("style", attr)
  }
}