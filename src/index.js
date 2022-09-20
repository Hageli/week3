const dataTable = document.getElementById("table-body");

async function getData() {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const dataPromise = await fetch(url);
  const dataJSON = await dataPromise.json();

  const tableEntries = dataJSON.dataset.dimension.Alue.category.index;
  const tableLabels = dataJSON.dataset.dimension.Alue.category.label;
  const tablePopulation = dataJSON.dataset.value;
  for (const [i, j] of Object.entries(tableEntries)) {
    const tableRow = document.createElement("tr");

    const labelCell = document.createElement("td");
    labelCell.innerHTML = tableLabels[i];
    const popCell = document.createElement("td");
    popCell.innerHTML = tablePopulation[j];

    tableRow.appendChild(labelCell);
    tableRow.appendChild(popCell);
    dataTable.appendChild(tableRow);
  }
}
getData();
