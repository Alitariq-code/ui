const paragraph = document.getElementById("tooltipParagraph");
const words = paragraph.innerText.split(/\s+/);

paragraph.innerHTML = ""; // Clear the original text content

words.forEach((word, index) => {
  const span = document.createElement("span");
  span.className = "tooltip";

  const tooltipText = document.createElement("span");
  tooltipText.className = "tooltiptext";
  tooltipText.textContent = `Word ${index + 1}`;

  span.appendChild(document.createTextNode(word));
  span.appendChild(tooltipText);
  paragraph.appendChild(span);
  paragraph.appendChild(document.createTextNode(" ")); // Add space after each word
});
