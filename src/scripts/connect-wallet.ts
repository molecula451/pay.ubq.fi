/// <reference types="./global" />
import { ethers } from 'ethers';

export async function connectWallet(txData) {
  if (!window.ethereum) {
    throw new Error('No ethereum provider found');
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();
  if (!signer) {
    throw new Error('No signer found');
  }
  return { signer, txData };
}
