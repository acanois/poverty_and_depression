// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.
d3.csv('../../data/poverty_depression.csv', (err, depressionData) => {
    if (err) console.log(err)

    // Set up the canvas
    var body = d3.select('body')
    var margin = {top: 20, right: 20, bottom: 30, left: 40}
    var width = 960 - margin.left - margin.right
    var height = 500 - margin.top - margin.bottom

    var xScale = d3.scaleLinear()
                   .domain([
                       d3.min([0, d3.min(depressionData, d => { return d.percentDepressed })]),
                       d3.max([0, d3.max(depressionData, d => { return d.percentDepressed })])
                   ])
                   .range([0, width])
    var yScale = d3.scaleLinear()
                   .domain([
                       d3.min([0, d3.min(depressionData, d => { return d.belowPoverty })]),
                       d3.max([0, d3.max(depressionData, d => { return d.belowPoverty })])
                   ])
                   .range([height, 0])
    // SVG
    var svg = body.append('svg')
                .attr('height', height + margin.top + margin.bottom)
                .attr('width', width + margin.left + margin.right)
                .append('g')
                .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
    // X-axis
    var xAxis = d3.axisBottom()
                .scale(xScale)
    // Y-axis
    var yAxis = d3.axisLeft()
                    .scale(yScale)
    // Circles
    var circles = svg.selectAll('circle')
                    .data(depressionData)
                    .enter()
                    .append('circle')
                    .attr('cx',function (d) { return xScale(d.belowPoverty/5) })
                    .attr('cy',function (d) { return yScale(d.percentDepressed/5) })
                    .attr('r','5')
                    .attr('stroke-width',1)
                    .attr('fill', 'blue')
                    .attr('opacity', 0.75)
                    .on('mouseover', function () {
                        d3.select(this)
                        .transition()
                        .duration(500)
                        .attr('r', 20)
                        .attr('stroke-width', 3)
                    })
    .on('mouseout', function () {
    d3.select(this)
        .transition()
        .duration(500)
        .attr('r', 5)
        .attr('stroke-width',1)
    })
    .append('title') // Tooltip
    
    // X-axis
    svg.append('g')
        .attr('class','axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .append('text') // X-axis Label
        .attr('class','label')
        .attr('y',-10)
        .attr('x', width)
        .attr('dy','.71em')
        .style('text-anchor','end')
    // Y-axis
    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis)
        .append('text') // y-axis Label
        .attr('class','label')
        .attr('transform','rotate(-90)')
        .attr('x',0)
        .attr('y',5)
        .attr('dy','.71em')
        .style('text-anchor','end')
        })
