const CHAIN_ENV: string = process.env.REACT_APP_CHAIN_ENV || 'main'

interface CHAIN_INFO {
  chainId: number
  rpcUrl: string
  ethscanType: string
  exploreURL: string
  stakingPool: string
  chainName: string
  nativeCurrency: object
  rpcUrls: Array<string>
  blockExplorerUrls: Array<string>
  iconUrls: Array<string>
}

const CHAIN_ENV_MAP: any = {
  main: {
    chainId: 1,
    rpcUrl: 'https://mainnet.eth.aragon.network/',
    ethscanType: '',
    exploreURL: 'https://etherscan.io',
    stakingPool: '0x1DaeD74ed1dD7C9Dabbe51361ac90A69d851234D',
  },
  'online-test': {
    chainId: 1,
    rpcUrl: 'https://mainnet.eth.aragon.network/',
    ethscanType: '',
    exploreURL: 'https://etherscan.io',
    stakingPool: '0x1DaeD74ed1dD7C9Dabbe51361ac90A69d851234D',
  },
  'heco-test': {
    chainId: 256,
    rpcUrl: 'https://http-testnet.hecochain.com',
    ethscanType: '',
    exploreURL: 'https://testnet.hecoinfo.com',
    stakingPool: '0x130989912317e155189a522beaf63cb80bc69e72',
    //add
    chainName: 'Huobi ECO Chain Testnet',
    nativeCurrency: {
      name: 'Huobi ECO Chain Test Native Token',
      symbol: 'htt',
      decimals: 18,
    },
    /**
     * fix network details for this Chain ID do not match metamask records.
     * use https://chainid.network/chains.json recorded
     */
    rpcUrls: ["https://http-testnet.hecochain.com"],
    blockExplorerUrls: ['https://testnet.hecoinfo.com'],
  },
  heco: {
    chainId: 128,
    rpcUrl: 'https://http-mainnet.hecochain.com',
    ethscanType: '',
    exploreURL: 'https://hecoinfo.com',
    stakingPool: '0x06c7b472261f788634b62214adbb6d26795d85f9',
    //add
    chainName: 'Huobi ECO Chain Mainnet',
    nativeCurrency: {
      name: 'Huobi ECO Chain Native Token',
      symbol: 'HT',
      decimals: 18,
    },
    /**
     * fix network details for this Chain ID do not match metamask records.
     * use https://chainid.network/chains.json recorded
     */
    rpcUrls: ['https://http-mainnet.hecochain.com'],
    blockExplorerUrls: ['https://scan.hecochain.com'],
  },
  kovan: {
    chainId: 42,
    rpcUrl: 'https://kovan.infura.io/',
    ethscanType: 'kovan.',
    exploreURL: 'https://kovan.etherscan.io',
    stakingPool: '0x1DaeD74ed1dD7C9Dabbe51361ac90A69d851234D',
  },
}

export function getEthChainInfo(): CHAIN_INFO {
  return CHAIN_ENV_MAP[CHAIN_ENV]
}
