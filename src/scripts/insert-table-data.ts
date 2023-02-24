import { shortenAddress } from "./shorten-address";

export function insertTableData(table, txData) {
  // FOR
  const toFull = document.querySelector("#To .full");
  const toShort = document.querySelector("#To .short");
  if (!toFull || !toShort) console.error("toFull or toShort not found");
  else {
    toFull.textContent = txData.transferDetails.to;
    toShort.textContent = shortenAddress(txData.transferDetails.to);
  }
  const toBoth = document.getElementById(`transferDetails.to`);
  if (!toBoth) console.error("toBoth not found");
  else
    toBoth.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="https://etherscan.io/address/${txData.transferDetails.to}">${toBoth.innerHTML}</a>`;

  // FOR
  const tokenFull = document.querySelector("#Token .full");
  const tokenShort = document.querySelector("#Token .short");
  if (!tokenFull || !tokenShort)
    console.error("tokenFull or tokenShort not found");
  else {
    tokenFull.textContent = txData.permit.permitted.token;
    tokenShort.textContent = shortenAddress(txData.permit.permitted.token);
  }
  const tokenBoth = document.getElementById(`permit.permitted.token`);
  if (!tokenBoth) console.error("tokenBoth not found");
  else
    tokenBoth.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="https://etherscan.io/token/${txData.permit.permitted.token}">${tokenBoth.innerHTML}</a>`;

  const permitPermittedAmount = document.getElementById(
    "permit.permitted.amount"
  );
  if (!permitPermittedAmount) console.error("permitPermittedAmount not found");
  else
    permitPermittedAmount.textContent = (
      txData.permit.permitted.amount / 1e18
    ).toString();

  const owner = document.getElementById("owner");
  if (!owner) console.error("owner not found");
  else
    owner.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="https://etherscan.io/address/${txData.owner}">${txData.owner}</a>`;

  const permitNonce = document.getElementById("permit.nonce");
  if (!permitNonce) console.error("permitNonce not found");
  else permitNonce.textContent = txData.permit.nonce;
  const permitDeadline = document.getElementById("permit.deadline");
  if (!permitDeadline) console.error("permitDeadline not found");
  else permitDeadline.textContent = txData.permit.deadline;

  const requestedAmountElement = document.getElementById(
    "transferDetails.requestedAmount"
  );
  if (!requestedAmountElement)
    console.error("requestedAmountElement not found");
  else
    requestedAmountElement.textContent = (
      txData.transferDetails.requestedAmount / 1e18
    ).toString();

  const signature = document.getElementById("signature");
  if (!signature) console.error("signature not found");
  else signature.textContent = txData.signature;

  table.setAttribute(`data-details-rendered`, "true");
  return requestedAmountElement;
}
