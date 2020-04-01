const margin = 100;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;

var svg = d3.select(".chart-1b");

const chart = svg
  .append("g")
  .attr("transform", `translate(${margin}, ${margin})`);

// Set the y-scale
const yScale = d3.scaleLinear().range([height, 0]);

// Set the x-scale
const xScale = d3
  .scaleBand()
  .range([0, width])
  .padding(0.2);

// Read the tsv file
d3.tsv("../state_population_gdp.tsv")
  .then(data => {
    data.forEach(d => {
      d.gdp = +d.gdp;
    });

    // Set the x and y scales based on the data
    yScale
      .domain([
        0,
        d3.max(data, function(d) {
          return d.gdp;
        })
      ])
      .nice();
    xScale.domain(data.map(s => s.state));

    // Set the x-scale and rotate the x values to be more readable
    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.15em")
      .attr("transform", "rotate(-65)");

    // Set the y-scale
    chart.append("g").call(d3.axisLeft(yScale));

    //Create Title
    chart
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .style("text-decoration", "underline")
      .text("GDP Numbers of the States");
    // X axis label
    chart
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin)
      .style("text-anchor", "middle")
      .text("State");

    // Y axis label
    chart
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("GDP");

    // Initialize the tooltip
    var div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Compute surrounding values for width and height

    // var leftWidth = d3.select(".chart-1a").getBoundingClientRect().left;
    // console.log(leftWidth);

    // Draw the rectanges for each data point
    chart
      .selectAll()
      .data(data)
      .enter()
      .append("rect")
      .attr("x", s => xScale(s.state))
      .attr("y", s => yScale(s.gdp))
      .attr("height", s => height - yScale(s.gdp))
      .attr("width", xScale.bandwidth())
      .attr("fill", "steelblue")
      .on("mouseover", function(d, i) {
        var tipx =
          d3
            .select(this)
            .node()
            .getBoundingClientRect().left - 25;
        var tipy =
          d3
            .select(this)
            .node()
            .getBoundingClientRect().top - 23;
        div
          .transition()
          .duration(200)
          .style("opacity", 1);
        div
          .html(d.gdp)
          .style("left", tipx + "px")
          .style("top", tipy + "px");

        d3.select(this).attr("fill", "orange");
      })
      .on("mouseout", function() {
        div
          .transition()
          .duration(500)
          .style("opacity", 0);
        d3.select(this).attr("fill", "steelblue");
      });
  })
  .catch(err => console.log(err));
