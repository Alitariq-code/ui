// script.js

document.addEventListener("DOMContentLoaded", function () {
  // Get the textarea element
  var textarea = document.getElementById("exampleTextarea");

  // Add an 'input' event listener to the textarea
  textarea.addEventListener("input", function () {
    // Set the textarea height based on its scroll height, with a minimum of 350px
    this.style.height = "auto";
    this.style.height = Math.max(this.scrollHeight, 350) + "px";
  });
});



// extra code