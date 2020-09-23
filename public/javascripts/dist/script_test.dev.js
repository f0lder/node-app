"use strict";

var idsBorder = ["empty", "checkId", "empty1", "tab1", "play1", "notesP", "play", "make", "checkId2"];
var idsTExt = ["half", "createdBy", "notesP", "tick", "ics", "header", "lets"];

function selectPreset() {
  var x = document.getElementById("mySelect").value;

  if (x == 1) {
    // default style (black)
    setTextColor("#ffffff");
    setBorderColor("#ffffff");
    setBackColor("#1e1e1e");
  }

  if (x == 2) {
    // white backgound - black borders
    setBorderColor("#1e1e1e");
    setTextColor("#1e1e1e");
    setBackColor("#ffffff");
  }

  if (x == 3) {
    // yellow 
    setBorderColor("#1e1e1e");
    setTextColor("#1e1e1e");
    setBackColor("#ffe9ca");
  }

  if (x == 4) {
    //blue
    setBackColor("#cdedff");
    setBorderColor("#1e1e1e");
    setTextColor("#1e1e1e");
    setDivBackground("white");
  }

  if (x == 5) {
    //pink
    setBackColor("#fee1dd");
    setBorderColor("#1e1e1e");
    setTextColor("#1e1e1e");
  }

  if (x == 6) {
    //Green
    setBackColor("#abffe7");
    setBorderColor("#1e1e1e");
    setTextColor("#1e1e1e");
  }
}

function eventText(id, value, name) {
  document.getElementById(id).innerHTML = "You changed the " + name + " color to <a style=\"color: " + value + ";\">" + value + "</a><br>";

  if (value === "black") {
    document.getElementById(id).innerHTML = "You changed the " + name + " color to <a style=\"padding: .25em;background-color: white;color: black;\"><br>" + value + "</a>";
  }
}

function assignToId(id, atribute, value) {
  document.getElementById(id).style[atribute] = value;
}

function setBorderColor(borderCol) {
  for (var j = 0; j < idsBorder.length; j++) {
    assignToId(idsBorder[j], "borderColor", borderCol);
  }
}

function setTextColor(textColor) {
  for (var j = 0; j < idsTExt.length; j++) {
    assignToId(idsTExt[j], "color", textColor);
  }

  document.getElementById("first").style.backgroundColor = textColor;
  document.getElementById("last").style.backgroundColor = textColor;

  for (var i = 1; i <= 3; i++) {
    document.getElementById("inner" + i).style.backgroundColor = textColor;
  }
}

function setBackColor(backColor) {
  document.body.style.backgroundColor = backColor;
  document.getElementById("notesP").style.backgroundColor = backColor;
}

function setDivBackground(color) {
  for (var j = 0; j < idsBorder.length; j++) {
    assignToId(idsBorder[j], "backgroundColor", color);
  }
}

function animFunc() {
  var form = document.getElementById("Form");
  var Button = document.getElementById("hide");

  if (form.style.display === "none") {
    form.style.display = "block";
    document.getElementById("myText").style.display = "block";
    document.getElementById("labelText").style.display = "block";
    document.getElementById("test").style.display = "block";
    document.getElementById("textShow").style.display = "block";
    document.getElementById("bgText").style.display = "block";
    Button.style.fontSize = "16px";
    Button.innerHTML = "Hide Menu";
    Button.style.padding = "15px 32px";
    Button.style.margin = "1em";
    document.getElementById("javaS").style.padding = 1 + "em";
    document.getElementById("hide").style.padding = "15px 32px";
    document.getElementById("javaS").style.border = "1px white solid";
  } else {
    document.getElementById("myText").style.display = "none";
    document.getElementById("labelText").style.display = "none";
    document.getElementById("test").style.display = "none";
    document.getElementById("textShow").style.display = "none";
    document.getElementById("bgText").style.display = "none";
    form.style.display = "none";
    Button.style.fontSize = "1.5em";
    Button.innerHTML = ">>";
    Button.style.padding = "5px 20px";
    Button.style.margin = "0.25em";
    document.getElementById("javaS").style.padding = 0.25 + "em";
    document.getElementById("hide").style.padding = "10px 15px";
    document.getElementById("javaS").style.border = "none";
  }
}

function Event(id, For, idText) {
  var input = document.getElementById(id);
  var x = "";
  document.getElementById("test").innerHTML = x;
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();

      switch (For) {
        case "bg":
          x = document.getElementById(id).value;
          setBackColor(x);
          eventText(idText, x, For);
          break;

        case "border":
          x = document.getElementById(id).value;
          setBorderColor(x);
          eventText(idText, x, For);
          break;

        case "text":
          x = document.getElementById(id).value;
          setTextColor(x);
          eventText(idText, x, For);
          break;

        case "div":
          x = document.getElementById(id).value;
          setDivBackground(x);
          eventText(idText, x, For);
          break;

        default:
          // the code cant reach here
          document.innerHTML = "something";
      }
    }
  });
}

Event("myText", "bg", "test");
Event("bgSet", "border", "bgText");
Event("textSet", "text", "textShow");
Event("divBack", "div", "divShow");