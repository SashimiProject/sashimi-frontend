import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'

import { Contract, SendOptions } from 'web3-eth-contract'
import { CrossChainABI } from '../views/Bridge/abi'
import ERC20 from '../constants/abi/ERC20.json'
// import { NETWORK_URL } from '../constants/index';

// TODO: optional, use contract.d.ts
interface ContractProps {
  contractName?: keyof typeof contractsABI
  contractABI?: AbiItem[] | AbiItem
  provider?: provider
  contractAddress: string
}

interface ErrorMsg {
  error: Error
}

type InitContract = (
  provider: provider,
  address: string,
  ABI: AbiItem[] | AbiItem,
) => Contract

type CallViewMethod = (
  functionName: string,
  paramsOption?: any,
  callOptions?: any,
) => Promise<any | ErrorMsg>

type CallSendMethod = (
  functionName: string,
  account: string,
  paramsOption?: any,
  sendOptions?: SendOptions,
) => Promise<any | ErrorMsg>

export type ContractBasicErrorMsg = ErrorMsg

const contractsABI = {
  CrossChainABI: CrossChainABI,
  ERC20: ERC20.abi,
}

// const defaultProvider = new Web3.providers.HttpProvider(
//   NETWORK_URL,
//   {
//     keepAlive: true,
//     withCredentials: false,
//     timeout: 20000, // ms
//   }
// );
// export const defaultWeb3 = new Web3(defaultProvider);

// Example
// const NFTContract =
// new ContractBasic({
//   contractName: 'NFT',
//   provider,
//   contractAddress: values.NFTContractAddress
// });
// TODO: optional. Abstract factory
export class ContractBasic {
  public contract: Contract | null
  public contractForView: Contract
  public address: string
  public provider?: provider
  constructor(options: ContractProps) {
    const { contractName, contractABI, provider, contractAddress } = options

    const contactABITemp = contractABI || contractsABI[contractName]
    this.provider = provider
    this.contract = provider
      ? this.initContract(provider, contractAddress, contactABITemp as AbiItem)
      : null
    // this.contractForView = this.initViewOnlyContract(provider || defaultProvider, contractAddress, contactABITemp as AbiItem);
    this.address = contractAddress
  }

  public initContract: InitContract = (provider, address, ABI) => {
    const web3 = new Web3(provider)
    return new web3.eth.Contract(ABI, address)
  }

  // public initViewOnlyContract: InitContract = (provider, address, ABI) => {
  //   return new defaultWeb3.eth.Contract(ABI, address,);
  // };

  public callViewMethod: CallViewMethod = async (
    functionName,
    paramsOption,
    callOptions = {},
  ) => {
    if (!this.contract) {
      return { error: { code: 401, message: 'Contract init error' } }
    }
    try {
      const contract = this.contract
      // const contract = this.contract || this.contractForView
      if (paramsOption) {
        return await contract.methods[functionName](...paramsOption).call(
          callOptions.opitions,
          callOptions.defaultBlock,
          callOptions.callback,
        )
      }
      return await contract.methods[functionName]().call(
        callOptions.opitions,
        callOptions.defaultBlock,
        callOptions.callback,
      )
    } catch (e) {
      return {
        error: e,
      }
    }
  }

  // TODO: next type, account -> sendOptions
  public callSendMethod: CallSendMethod = async (
    functionName,
    account,
    paramsOption,
    sendOptions,
  ) => {
    if (!this.contract) {
      return { error: { code: 401, message: 'Contract init error' } }
    }

    try {
      const contract = this.contract
      if (paramsOption) {
        return await contract.methods[functionName](...paramsOption).send({
          from: account,
          ...sendOptions,
        })
      }
      return await contract.methods[functionName]().send({
        from: account,
        ...sendOptions,
      })
    } catch (e) {
      console.log('callSendMethod: ', e)
      return {
        error: e,
      }
    }
  }
}
