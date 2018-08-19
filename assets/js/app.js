d3.csv('../../data/poverty_depression.csv', (err, depressionData) => {
  if (err) console.log(err)

  // Set up the canvas
  var margin = {
    top: 40,
    right: 20,
    bottom: 100,
    left: 40
  }

  var width = 960 - margin.left - margin.right
  var height = 560 - margin.top - margin.bottom

  // SVG
  var svg = d3.select('.chart')
    .append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  var chartGroup = svg.append('g')
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  var xScale = d3.scaleLinear()
    .range([0, width])
    .domain([5, 50])
    // .domain(d3.extent(depressionData, d => d.percentDepressed)).nice()

  var yScale = d3.scaleLinear()
    .range([height, 0])
    .domain(d3.extent(depressionData, d => d.percentDepressed)).nice()

  // X-axis
  var xAxis = d3.axisBottom(xScale)
  // Y-axis
  var yAxis = d3.axisLeft(yScale)

  chartGroup.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${height})`)
  chartGroup.append('g')
    .call(yAxis)

  // Circles
  var circlesGroup = chartGroup.selectAll('circle')
    .data(depressionData)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.belowPoverty))
    .attr('cy', d => yScale(d.percentDepressed))
    .attr('r', '5')
    .attr('fill', 'blue')
    .attr('opacity', 0.75)

  var toolTip = d3.select("body")
    .append("div")
    .style("display", "none")
    .classed('tooltip', true)

  circlesGroup.on('mouseover', function(d) {
      toolTip.style('display', 'block')
        .html(`
          <p>${d.state}:</p>
          <p>Below Poverty: ${d.belowPoverty}%</p>
          <p>Depression Rate: ${d.percentDepressed}%</p>
          `)
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY + 'py')
    })
    .on('mouseout', function(d) {
      toolTip.style('display', 'none')
    })

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left - 5)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Depression Rate");

  chartGroup.append("text")
    .attr("transform", `translate(${width/2}, ${height + 40})`)
    .attr("class", "axisText")
    .attr('dx', '1em')
    .text("Percentage Below Poverty Level");
})