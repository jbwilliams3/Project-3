fetch('json_file/happy_2019.json')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching JSON:', error));

  function init() {
    let dropdownMenu = d3.select("#selDataset");

    d3.json('json_file/happy_2019.json').then(function(data){
        console.log(`Data: ${data}`);
    
    // An array of id names
        let countries = data.country_names;

    // Iterate through the countries Array
        countries.forEach((country) => {
        // Append each name as an option to the drop down menu
        // This is adding each name to the html file as an option element with value = a name in the names array
            dropdownMenu.append("option").text(country).property("value", country);
        });

     // Assign the first name to name variable
        let country = countries[0];

     // Call the functions to make the demographic panel, bar chart, and bubble chart
        demo(country);
        //bar(country);
        //bubble(country);
        gauge(country);
    });

  };

  // Make the demographics panel
function demo(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json('json_file/happy_2019.json').then((data) => {
        console.log(`Data: ${data}`);

        // An array of metadata objects
        let metadata = data.metadata;
        
        // Filter data where id = selected value after converting their types 
        // (bc meta.id is in integer format and selectValue from is in string format)
        let filteredData = metadata.filter((meta) => meta.countries == selectedValue);
      
        // Assign the first object to obj variable
        let obj = filteredData[0]
        
        // Clear the child elements in div with id sample-metadata
        d3.select("#sample-metadata").html("");
  
        // Object.entries() is a built-in method in JavaScript 
        // This returns an array of a given object's own enumerable property [key, value]
        let entries = Object.entries(obj);
        
        // Iterate through the entries array
        // Add a h5 child element for each key-value pair to the div with id sample-metadata
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        // Log the entries Array
        console.log(entries);
    });
  };

  // Make the gauge chart 
function gauge(selectedValue) {
    // Fetch the JSON data and console log it 
    d3.json('json_file/happy_2019.json').then((data) => {
        // An array of metadata objects
        let metadata = data.metadata;
        
        // Filter data where id = selected value after converting their types 
        // (bc meta.id is in integer format and selectValue from is in string format)
        let filteredData = metadata.filter((meta) => meta.countries == selectedValue);
      
        // Assign the first object to obj variable
        let obj = filteredData[0]

        // Trace for the data for the gauge chart
        let trace = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: obj.wfreq,
            title: { text: "<b>World Happiness Score</b><br>Happiness Score", font: {size: 24}},
            type: "indicator", 
            mode: "gauge+number",
            gauge: {
                axis: {range: [null, 10]}, 
                bar: {color: "rgb(68,166,198)"},
                steps: [
                    { range: [0, 1], color: "rgb(233,245,248)" },
                    { range: [1, 2], color: "rgb(218,237,244)" },
                    { range: [2, 3], color: "rgb(203,230,239)" },
                    { range: [3, 4], color: "rgb(188,223,235)" },
                    { range: [4, 5], color: "rgb(173,216,230)" },
                    { range: [5, 6], color: "rgb(158,209,225)" },
                    { range: [6, 7], color: "rgb(143,202,221)" },
                    { range: [7, 8], color: "rgb(128,195,216)" },
                    { range: [8, 9], color: "rgb(113,187,212)" },
                    { range: [9, 10], color: "rgb(98,180,207)" }
                ]
            }
        }];

         // Use Plotly to plot the data in a gauge chart
         Plotly.newPlot("gauge", trace);
    });
};

//Toggle to new plots when option changed
function optionChanged(selectedValue) {
    demo(selectedValue);
    //bar(selectedValue);
    //bubble(selectedValue);
    gauge(selectedValue)
};

init();