import { getEthChainInfo } from './getEthChainInfo'

interface WindowChain {
  ethereum?: {
    isMetaMask?: true
    request?: (...args: any[]) => void
  }
}
/**
 * Prompt the user to add RPC as a network on Metamask, or switch to RPC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const checkNetwork = async () => {
  const provider = (window as WindowChain).ethereum
  if (provider) {
    const {
      chainId,
      chainName,
      nativeCurrency,
      rpcUrls,
      blockExplorerUrls,
      iconUrls,
    } = getEthChainInfo()
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName,
            nativeCurrency,
            rpcUrls,
            iconUrls,
            blockExplorerUrls,
          },
        ],
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  } else {
    console.error(
      "Can't setup the RPC network on metamask because window.ethereum is undefined",
    )
    return false
  }
}
