// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.
d3.csv('../../data/poverty_depression.csv', (err, depressionData) => {
  if (err) console.log(err)

  // Set up the canvas
  var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  }

  var width = 960 - margin.left - margin.right
  var height = 500 - margin.top - margin.bottom

  // SVG
  var svg = d3.select('.chart')
    .append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  var xScale = d3.scaleLinear()
    .range([0, width])
    .domain(d3.extent(depressionData, d => d.percentDepressed)).nice()

  var yScale = d3.scaleLinear()
    .range([height, 0])
    .domain(d3.extent(depressionData, d => d.percentDepressed)).nice()

  // X-axis
  var xAxis = d3.axisBottom(xScale)
  // Y-axis
  var yAxis = d3.axisLeft(yScale)

  // Circles
  var circlesGroup = svg.selectAll('circle')
    .data(depressionData)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.belowPoverty))
    .attr('cy', d => yScale(d.percentDepressed))
    .attr('r', '8')
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
          `)
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY + 'py')
    })
    .on('mouseout', function() {
      toolTip.style('display', 'none')
    })

  // X-axis
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
    .append('text') // X-axis Label
    .attr('class', 'label')
    .attr('y', -10)
    .attr('x', width)

  // Y-axis
  svg.append('g')
    .attr('class', 'axis')
    .call(yAxis)
    .append('text') // y-axis Label
    .attr('class', 'label')
    .attr('transform', 'rotate(-90)')
    .attr('x', 0)
    .attr('y', 5)
})