// Fetch data from the local tsv file
const rows = fetch("../state_population_gdp.tsv", { mode: "no-cors" })
  .then(response => response.text())
  .then(data => data.split("\n").map(row => row.split("\t")))
  .then(data => data.slice(1, 52))
  .catch(error => console.error(error));

// Draw the bars on page load
container = document.getElementById("bar-vertical");

var tooltip = document.createElement("div");
tooltip.className = "tooltip";
tooltip.style.opacity = "0";

rows.then(result => {
  for (var row of result) {
    var bar = document.createElement("div");
    bar.classList.add("vcell");

    var inbar = document.createElement("div");
    inbar.classList.add("vbar");
    inbar.style.background = "steelblue";
    inbar.style.height = (row[1] / 40000000) * 100 + "%";

    // Add event litner to change orange on mouseover, or back to blue on mouse out
    inbar.addEventListener("mouseover", function(event) {
      // Highlight the mouseover target
      event.target.style.background = "orange";

      // Find which bar is being moused over, and get the population for that index from the row list
      let current = event.target.parentNode;
      let childIndex = [...current.parentNode.children].indexOf(current);
      tooltip.innerHTML = result[childIndex][1];

      // Calculate the relative x and y of the hovered bar to calculate the tooltip location
      var tipx =
        event.target.getBoundingClientRect().left + window.pageXOffset - 25;
      var tipy =
        event.target.getBoundingClientRect().top + window.pageYOffset - 23;
      tooltip.style.left = tipx + "px";
      tooltip.style.top = tipy + "px";
      tooltip.style.opacity = "1";
      tooltip.style.transition = "opacity .2s";
    });
    inbar.addEventListener("mouseout", function(event) {
      // Un-highlight the mouseover target
      event.target.style.background = "steelblue";
      tooltip.style.opacity = "0";
      tooltip.style.transition = "opacity .5s";
    });

    bar.appendChild(inbar);
    container.appendChild(bar);
    document.body.appendChild(tooltip);
  }
});
