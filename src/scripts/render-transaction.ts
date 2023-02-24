import { insertTableData } from "./insert-table-data";

let txData;
const urlParams = new URLSearchParams(global.location.search);
const base64encodedTxData = urlParams.get("claim");

if (!base64encodedTxData) {
  alert(`No claim data passed in URL.\n\nhttps://pay.ubq.fi?claim=...`);
} else {
  try {
    txData = JSON.parse(atob(base64encodedTxData));
  } catch (error) {
    alert(`Invalid claim data passed in URL.`);
  }
}

const table = document.getElementsByTagName(`table`)[0];
const requestedAmountElement = insertTableData(table, txData);
renderTokenSymbol(table, requestedAmountElement);

async function renderTokenSymbol(table, requestedAmountElement) {
  const contract = await global.getContract(txData.permit.permitted.token);
  const symbol = await contract.symbol();
  table.setAttribute(`data-contract-loaded`, "true");
  requestedAmountElement.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="https://etherscan.io/token/${
    txData.permit.permitted.token
  }?a=${txData.owner}">${
    txData.transferDetails.requestedAmount / 1e18
  } ${symbol}</a>`;
}
