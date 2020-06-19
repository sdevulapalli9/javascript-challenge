// from data.js
var tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

 
  data.forEach((dataRow) => {
    // Append a row to the table body
    var row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      var cell = row.append("td");
      cell.text(val);
    });
  });
}

var filters = {};

function runenter() {


  var inputElement = d3.select(this).select("input");
  var elementvalue = inputElement.property("value");
  var filterId = inputElement.attr("id");


  if (elementvalue) {
    filters[filterId] = elementvalue;
  }
  else {
    delete filters[filterId];
  }

  filterTable();

}

function filterTable() {

  
  let filteredData = tableData;

  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  buildTable(filteredData);
}


d3.selectAll(".filter").on("change", runenter);

// Build the table when the page loads
buildTable(tableData);