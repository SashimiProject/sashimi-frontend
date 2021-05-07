import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'

import ERC20ABI from '../constants/abi/ERC20.json'
import { Contract } from 'web3-eth-contract'

export const getContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    (ERC20ABI.abi as unknown) as AbiItem,
    address,
  )
  return contract
}
export const callERC20ViewMethod = async (
  functionName: string,
  provider: provider,
  nftAddress: string,
  paramsOption?: any,
): Promise<string> => {
  try {
    const contract = getContract(provider, nftAddress);
    if (paramsOption) {
      return await contract.methods[functionName](paramsOption).call();
    }
    return await contract.methods[functionName]().call();
  } catch (e) {
    console.log('callNFTShardsViewMethod error', e);
    return '0';
  }
};
export const getAllowance = async (
  lpContract: Contract,
  masterChefContract: Contract,
  account: string,
): Promise<string> => {
  try {
    const allowance: string = await lpContract.methods
      .allowance(account, masterChefContract.options.address)
      .call()
    return allowance
  } catch (e) {
    return '0'
  }
}

export const getBalance = async (
  provider: provider,
  tokenAddress: string,
  userAddress: string,
): Promise<string> => {
  try {
    const lpContract = getContract(provider, tokenAddress)
    const balance: string = await lpContract.methods
      .balanceOf(userAddress)
      .call()
    return balance
  } catch (e) {
    return '0'
  }
}

export const getTotalSupply = async (
  provider: provider,
  tokenAddress: string,
): Promise<string> => {
  try {
    const lpContract = getContract(provider, tokenAddress);
    return await lpContract.methods
      .totalSupply()
      .call();
  } catch (e) {
    return '0'
  }
};
