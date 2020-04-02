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

// The data from the tsv
var data = [];
// parse_tsv(tsvstring, function (row) { do something with row })
function parse_tsv(s) {
  var ix_end = 0;
  for (var ix = 0; ix < s.length; ix = ix_end + 1) {
    ix_end = s.indexOf("\n", ix);
    if (ix_end == -1) {
      ix_end = s.length;
    }
    var row = s.substring(ix, ix_end - 1).split("\t");
    data.push(row);
  }
}

console.log(data);

/* [DRAW THE BARS ON PAGE LOAD] */
window.addEventListener("load", function() {
  // DRAW THE VERTICAL BARS
  container = document.getElementById("bar-vertical");
  for (var vert of vertical) {
    var bar = document.createElement("div");
    bar.classList.add("vcell");

    var inbar = document.createElement("div");
    inbar.classList.add("vbar");
    inbar.style.background = "steelblue";
    inbar.style.height = vert[1] + "%";

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
