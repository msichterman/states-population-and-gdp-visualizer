/* [THE GRAPH DATA] */
// Let's say that you AJAX load these data from the server
var vertical = [
  ["First", 40],
  ["a", 40],
  ["b", 45],
  ["c", 48],
  ["d", 49],
  ["e", 55],
  ["Second", 65],
  ["Third", 98]
];

const rows = fetch("../state_population_gdp.tsv", { mode: "no-cors" })
  .then(response => response.text())
  .then(data => data.split("\n").map(row => row.split("\t")))
  .then(data => data.slice(1, 52))
  .catch(error => console.error(error));

console.log(rows);

/* [DRAW THE BARS ON PAGE LOAD] */
window.addEventListener("load", function() {
  // DRAW THE VERTICAL BARS
  container = document.getElementById("bar-vertical");
  rows.then(result => {
    // // Find the max population in order to calculate bar height
    // const maxPolulation = Math.max(...result.map(row => parseInt(row[1])));

    for (var row of result) {
      var bar = document.createElement("div");
      bar.classList.add("vcell");

      var inbar = document.createElement("div");
      inbar.classList.add("vbar");
      inbar.style.background = "steelblue";
      inbar.style.height = (row[1] / 40000000) * 100 + "%";

      // Add event litner to change orange on mouseover, or back to blue on mouse out
      inbar.addEventListener("mouseover", function(event) {
        // highlight the mouseover target
        event.target.style.background = "orange";
      });
      inbar.addEventListener("mouseout", function(event) {
        // highlight the mouseover target
        event.target.style.background = "steelblue";
      });

      bar.appendChild(inbar);
      container.appendChild(bar);
    }
  });
});
