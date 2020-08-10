var versionNumber = "2.0"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startNewGame() {
    console.log("Starting new game.");
    document.getElementById("rootDIV").innerHTML = "";
    await sleep(1000);
    console.log("Passing to startupSequence!");
    startupSequence(true);
}

async function startupSequence(firstTime) {
    if(firstTime == null) {
        firstTime = false;
    }

    var extraInfo;
    if(firstTime == true) {
        extraInfo = " as first time."
    } else {
        extraInfo = " not as first time."
    }
    console.log("Starting startup sequence" + extraInfo);

    await sleep(1500);
}

function selectionArrows(context) {
    if(context == null) {
        console.error("No context provided!")
        return;
    }

    var i;
    var currentlySelected;
    var currentlySelectedNum;
    var exitsWith = false;
    var upto = context.length;
    for(i = 0; i < upto; i++) {
        console.log(context[i])
        var z = context[i]
        var a = document.getElementById(z);
        var b = a.innerHTML;
        if(b.startsWith("&gt;")) {
            console.log("This one!")
            currentlySelected = z;
            currentlySelectedNum = i;
            exitsWith = true;
            return;
        } else {
            console.warn("Not this one!")
        }
    }
    if(exitsWith == false) {
        console.error("For loop exited with false!")
    }
    console.log(currentlySelected)
    var toBeSelected;
    if(currentlySelectedNum == upto) {
        toBeSelected = context[0]
    } else {
        toBeSelected = context[currentlySelectedNum + 1];
    }
    console.log("yup:" + currentlySelected)
    var takeOffArrow = currentlySelected.innerHTML.substring(2);
    currentlySelected.innerHTML = takeOffArrow;
    
}