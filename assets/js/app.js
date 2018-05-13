// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.
d3.csv('../../data/poverty_depression.csv', (err, depressionData) => {
    if (err) console.log(err)

    // Set up the canvas
    const body = d3.select('body')
    const margin = {top: 20, right: 20, bottom: 30, left: 40}
    const width = 960 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    const xScale = d3.scaleLinear()
        .range([0, width])
        .domain(d3.extent(depressionData, d => d.percentDepressed)).nice()
    
    const yScale = d3.scaleLinear()
                   .domain([ //0, 30
                       d3.min([0, d3.min(depressionData, d => { return d.percentDepressed })]),
                       d3.max([0, d3.max(depressionData, d => { return d.percentDepressed })])
                   ])
                   .range([height, 0])

    // SVG
    const svg = body.append('svg')
                .attr('height', height + margin.top + margin.bottom)
                .attr('width', width + margin.left + margin.right)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


    // X-axis
    const xAxis = d3.axisBottom()
                .scale(xScale)

    // Y-axis
    const yAxis = d3.axisLeft()
                .scale(yScale)
                
    // Circles
    const circlesGroup = svg.selectAll('circle')
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
    
    const toolTip = d3.select('body').append('div').attr('class', 'tooltip')
    const createToolTip = function () {
        return d3.select('body').append('div').attr('class', 'tooltip')
    }

    circlesGroup.on('mouseover', (d, i) => {
        const newToolTip = createToolTip()
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
