/// <reference types="./global" />

import { ethers } from "ethers";
import { getContractAbi } from "./get-contract-abi";

export async function getContract(contractAddress) {
  if (!window.ethereum) {
    throw new Error("No ethereum provider found");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contractAbi = await getContractAbi(contractAddress);
  const contract = new ethers.Contract(contractAddress, contractAbi, provider);
  return contract;
}
