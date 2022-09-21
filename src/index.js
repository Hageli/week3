const dataTable = document.getElementById("table-body");

async function getData() {
  const url1 =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const data1Promise = await fetch(url1);
  const data1JSON = await data1Promise.json();

  const url2 =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
  const data2Promise = await fetch(url2);
  const data2JSON = await data2Promise.json();

  const indexEntries = data1JSON.dataset.dimension.Alue.category.index;
  const labelEntries = data1JSON.dataset.dimension.Alue.category.label;
  const popEntries = data1JSON.dataset.value;
  const employEntries = data2JSON.dataset.value;

  for (const [i, j] of Object.entries(indexEntries)) {
    const tableRow = document.createElement("tr");

    const labelCell = document.createElement("td");
    labelCell.innerHTML = labelEntries[i];

    const popCell = document.createElement("td");
    popCell.innerHTML = popEntries[j];

    const employCell = document.createElement("td");
    employCell.innerHTML = employEntries[j];

    let calculation = (
      (employCell.innerText / popCell.innerText) *
      100
    ).toFixed(2);
    const percentCell = document.createElement("td");
    percentCell.innerText = calculation;
    if (calculation < 25) {
      percentCell.classList.add("under25");
    } else if (calculation > 45) {
      percentCell.classList.add("over45");
    }

    tableRow.appendChild(labelCell);
    tableRow.appendChild(popCell);
    tableRow.appendChild(employCell);
    tableRow.appendChild(percentCell);
    dataTable.appendChild(tableRow);
  }
}
getData();
