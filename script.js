var margin = { top: 20, right: 30, bottom: 30, left: 20 };
var width = 500 - margin.left - margin.right;
var barHeight = 20;

var x = d3.scale.linear().range([0, width]);

var chart = d3
  .select(".chart")
  .attr("width", width + margin.left + margin.right);

var allgroup = chart
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = chart.append("text").style("visibility", "hidden");

d3.tsv("data.tsv", type, function(error, data) {
  x.domain([
    0,
    d3.max(data, function(d) {
      return d.value;
    })
  ]);

  chart.attr("height", margin.top + barHeight * data.length);

  var bar = allgroup
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d, i) {
      return "translate(0," + i * barHeight + ")";
    });

  // Creates the tool tips
  bar
    .append("rect")
    .attr("width", function(d) {
      return x(d.value);
    })
    .attr("height", barHeight - 1)
    .on("mouseover", function(d, i) {
      var tipx = d3.select(this).attr("width");
      var tipy = barHeight * i;
      tooltip.attr("x", tipx);
      tooltip.attr("y", tipy);
      tooltip.attr("dx", 35);
      tooltip.attr("dy", 35);
      tooltip.style("visibility", "visible");
      tooltip.style("fill", "black");
      tooltip.text(d.value);
    })
    .on("mouseout", function() {
      tooltip.style("visibility", "hidden");
    });

  bar
    .append("text")
    .attr("x", function(d) {
      return x(d.value) - 3;
    })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) {
      return d.value;
    });
});

function type(d) {
  d.value = +d.value;
  return d;
}
