//Select DOM elements
let tooltip = document.getElementById("tooltip");
let title = document.getElementById("title");

//Data
const fetchPromise = fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json");
let fetchedData = null;  //JSON will be stored here later

//Measuring data (in px)
let padding = 50;
let containerWidth = 1200 - padding * 2;

(async function retrieveData() {
    try {
        const promiseData = await fetchPromise;
        const jsonData = await promiseData.json();
        fetchedData = jsonData; //Fetch JSON and store it here
        createChart();
    }
    catch(message) {
        console.log(`Something went wrong. Error message: ${message}`);
    };
})();

function createChart() {

    //Find min date in fetched JSON
    const minDate = d3.min(fetchedData.data, (data) => {
        return data[0];
    });
    //Find max date in fetched JSON
    const maxDate = d3.max(fetchedData.data, (data) => {
        return data[0];
    });

    //Find min GDP rate (not used because data won't be observable)
    const minGDP = d3.min(fetchedData.data, (data) => {
        return data[1];
    });
    //Find max GDP rate
    const maxGDP = d3.max(fetchedData.data, (data) => {
        return data[1];
    });

    //Define x-axis scale with Dates
    let xScale = d3.scaleTime();
    xScale.domain([new Date(minDate), new Date(maxDate)]);
    xScale.range([0, containerWidth]);

    //Define y-axis scale to set bar height dinamically
    let yScale = d3.scaleLinear();
    yScale.domain([0, maxGDP]);
    yScale.range([0, 500]);

    //Define y-axis scale (reversed) to generate y-axis
    let reverseYScale = d3.scaleLinear();
    reverseYScale.domain([maxGDP, 0]);
    reverseYScale.range([0, 500]);

    //D3 CHART
    d3.select("svg")
    .append("g")
    .style("transform", "translate(0px, -50px)")
    .selectAll("rect")
    .data(fetchedData.data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (data) => {
        return data[0];
    })
    .attr("data-gdp", (data) => {
        return data[1];
    })
    .attr("x", (data, index) => {
        return index * containerWidth / fetchedData.data.length + padding;
    })
    .attr("y", (data) => {
        return 600 - yScale(data[1]);
    })
    .style("width", () => {
        return containerWidth / fetchedData.data.length;
    })
    .style("height", (data) => {
        return yScale(data[1]);
    })
    .on("mouseover", (e) => { //Function to toggle tooltip opacity on
        let bar = e.target;
        d3.select("#tooltip")
         .attr("data-date", bar.getAttribute("data-date"))
         .style("left", `${Number(e.target.getAttribute("x")) + padding}px`)
         .style("bottom", `${yScale(e.target.getAttribute("data-gdp")) + 75}px`)
         .style("opacity", "1")
         .html(`Date: ${bar.getAttribute("data-date")}
              <br>
              GDP: ${bar.getAttribute("data-gdp")}`
              );
    })
    .on("mouseout", () => { //Function to toggle tooltip opacity off
        d3.select("#tooltip")
            .style("bottom", "-50px")
            .style("left", "0px")
            .style("opacity", "0");
    });

    //Create x-axis (horizontal axis)
    d3.select("svg").append("g")
    .attr("id", "x-axis")
    .style("transform", `translate(${padding}px, 550px)`)
    .call(d3.axisBottom(xScale).ticks(5));

    //Create y-axis (vertical axis)
    d3.select("svg").append("g")
    .attr("id", "y-axis")
    .style("transform", `translate(${padding}px, 50px)`)
    .call(d3.axisLeft(reverseYScale).ticks(6))
};