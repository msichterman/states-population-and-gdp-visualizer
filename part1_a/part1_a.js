const margin = 100;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;

var svg = d3.select(".chart-1a");

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

var tooltip = chart.append("text").style("visibility", "hidden");

// Read the tsv file
d3.tsv("state_population_gdp.tsv")
  .then(data => {
    // Set the x and y scales based on the data
    yScale
      .domain([
        0,
        d3.max(data, function(d) {
          return d.population;
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

    // Draw the rectanges for each data point
    chart
      .selectAll()
      .data(data)
      .enter()
      .append("rect")
      .attr("x", s => xScale(s.state))
      .attr("y", s => yScale(s.population))
      .attr("height", s => height - yScale(s.population))
      .attr("width", xScale.bandwidth())
      .on("mouseover", function(d, i) {
        // console.log(i);
        // console.log(d3.select(this).attr("width"));
        var tipx = d3.select(this).attr("x") - 20;
        var tipy = height - d3.select(this).attr("height") - 5;
        tooltip.attr("x", tipx);
        tooltip.attr("y", tipy);
        // tooltip.attr("dx", 35);
        // tooltip.attr("dy", -10);
        tooltip.style("visibility", "visible");
        tooltip.style("fill", "black");
        tooltip.text(d.population);
      })
      .on("mouseout", function() {
        tooltip.style("visibility", "hidden");
      });
  })
  .catch(err => console.log(err));
