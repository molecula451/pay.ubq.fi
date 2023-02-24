import { ethers } from 'ethers';
import permit2Abi from './permit2abi.json';

export async function withdraw({ signer, txData }) {
  const permit2Address = '0x000000000022D473030F116dDEE9F6B43aC78BA3';
  const permit2Contract = new ethers.Contract(
    permit2Address,
    permit2Abi,
    signer
  );
  await permit2Contract
    .permitTransferFrom(
      txData.permit,
      txData.transferDetails,
      txData.owner,
      txData.signature
    )
    .catch(global.onerror);
}
