// Fetch data from the local tsv file
const rows = fetch("../state_population_gdp.tsv", { mode: "no-cors" })
  .then(response => response.text())
  .then(data => data.split("\n").map(row => row.split("\t")))
  .then(data => data.slice(1, 52))
  .catch(error => console.error(error));

// Container for the bars
container = document.getElementById("bar-vertical");

// Create the tooltip with 0 opacity
var tooltip = document.createElement("div");
tooltip.className = "tooltip";
tooltip.style.opacity = "0";

const stateIndex = 0;
const populationIndex = 1;

rows.then(result => {
  for (var row of result) {
    var bar = document.createElement("div");
    bar.classList.add("vcell");

    // Create a bar
    var inbar = document.createElement("div");
    inbar.classList.add("vbar");
    inbar.style.background = "steelblue";
    inbar.style.height = (row[populationIndex] / 40000000) * 100 + "%";
    // Add event litner to change orange on mouseover, or back to blue on mouse out
    inbar.addEventListener("mouseover", function(event) {
      // Highlight the mouseover target
      event.target.style.background = "orange";

      // Find which bar is being moused over, and get the population for that index from the row list
      let current = event.target.parentNode;
      let childIndex = [...current.parentNode.children].indexOf(current);
      tooltip.innerHTML = result[childIndex][populationIndex];

      // Calculate the relative x and y of the hovered bar to calculate the tooltip location
      var tipx =
        event.target.getBoundingClientRect().left + window.pageXOffset - 25;
      var tipy =
        event.target.getBoundingClientRect().top + window.pageYOffset - 23;
      tooltip.style.left = tipx + "px";
      tooltip.style.top = tipy + "px";
      // Set the opacity to 1 with a transition
      tooltip.style.opacity = "1";
      tooltip.style.transition = "opacity .2s";
    });
    inbar.addEventListener("mouseout", function(event) {
      // Un-highlight the mouseover target
      event.target.style.background = "steelblue";
      // Set the opacity to 0 with a transition
      tooltip.style.opacity = "0";
      tooltip.style.transition = "opacity .5s";
    });

    bar.appendChild(inbar);
    container.appendChild(bar);
    document.body.appendChild(tooltip);
  }

  // Create the x labels for each bar
  let barList = document.querySelector("#bar-vertical").children;
  for (let index = 0; index < barList.length; index++) {
    var xLabel = document.createElement("div");
    xLabel.className = "x-label";
    xLabel.style.top =
      barList[index].getBoundingClientRect().bottom + window.pageYOffset + "px";
    xLabel.style.left =
      barList[index].getBoundingClientRect().left +
      window.pageXOffset +
      12 +
      "px";
    console.log(barList[index].getBoundingClientRect().left);
    xLabel.innerHTML = result[index][stateIndex];
    xLabel.style.fontSize = "10px";
    xLabel.style.transform = "rotate(65deg)";
    xLabel.style.transformOrigin = "top left";
    document.body.appendChild(xLabel);
  }
});

function onWindowResize() {
  document.querySelectorAll(".x-label").forEach(e => e.remove());
  rows.then(result => {
    // Create the x labels for each bar
    let barList = document.querySelector("#bar-vertical").children;
    for (let index = 0; index < barList.length; index++) {
      var xLabel = document.createElement("div");
      xLabel.className = "x-label";
      xLabel.style.top =
        barList[index].getBoundingClientRect().bottom +
        window.pageYOffset +
        "px";
      // Could try right rotate w/ right and + pageOffset
      xLabel.style.left =
        barList[index].getBoundingClientRect().left +
        window.pageXOffset +
        12 +
        "px";
      console.log(barList[index].getBoundingClientRect().left);
      xLabel.innerHTML = result[index][stateIndex];
      xLabel.style.fontSize = "10px";
      // Could try right rotate w/ right and -65
      xLabel.style.transformOrigin = "top left";
      xLabel.style.transform = "rotate(65deg)";
      xLabel.style.transformOrigin = "top left";
      document.body.appendChild(xLabel);
    }
  });
}

window.onresize = onWindowResize;
