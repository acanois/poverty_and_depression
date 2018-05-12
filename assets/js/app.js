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
                       d3.min([0, d3.min(depressionData, d => { return d.belowPoverty })]),
                    //    d3.max([0, d3.max(depressionData, d => { return d.belowPoverty})])
                    48
                   ])
                   .range([0, width])
    console.log(d3.min([0, d3.min(depressionData, d => { return d.belowPoverty})]))
    console.log(d3.max([0, d3.max(depressionData, d => { return d.belowPoverty})]))
    
    var yScale = d3.scaleLinear()
                   .domain([ 0, 30
                    //    d3.min([0, d3.min(depressionData, d => { return d.percentDepressed })]),
                    //    d3.max([0, d3.max(depressionData, d => { return d.percentDepressed })])
                   ])
                   .range([height, 0])

    // SVG
    var svg = body.append('svg')
                .attr('height', height + margin.top + margin.bottom)
                .attr('width', width + margin.left + margin.right)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


    // X-axis
    var xAxis = d3.axisBottom()
                .scale(xScale)

    // Y-axis
    var yAxis = d3.axisLeft()
                .scale(yScale)
                
    // Circles
    var circlesGroup = svg.selectAll('circle')
                    .data(depressionData)
                    .enter()
                    .append('circle')
                    .attr('cx',function (d) { 
                        console.log(`poverty: ${d.belowPoverty}`)
                        return xScale(d.belowPoverty) 
                    })
                    .attr('cy',function (d) { 
                        console.log(`depression: ${d.percentDepressed}`)
                        return yScale(d.percentDepressed) 
                    })
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
    
    var toolTip = d3.select('body').append('div').attr('class', 'tooltip')
    var createToolTip = function () {
        return d3.select('body').append('div').attr('class', 'tooltip')
    }

    circlesGroup.on('mouseover', (d, i) => {
        var newToolTip = createToolTip()
        newToolTip.style('display', 'block')
        newToolTip.html('<p>Test</p>')
                  .style("left", d3.event.pageX + "px")
                  .style("top", d3.event.pageY + "px");
    })
    .on('mouseout', () => {
        toolTip.style('opacity', 0)
    })
    
    // X-axis
    svg.append('g')
        .attr('class','axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .append('text') // X-axis Label
        .attr('class','label')
        .attr('y', -10)
        .attr('x', width)

    // Y-axis
    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis)
        .append('text') // y-axis Label
        .attr('class','label')
        .attr('transform','rotate(-90)')
        .attr('x',0)
        .attr('y',5)
})
