const CHAIN_ENV: string = process.env.REACT_APP_CHAIN_ENV || 'main';

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
    stakingPool: '0x1DaeD74ed1dD7C9Dabbe51361ac90A69d851234D'
  },
  'online-test': {
    chainId: 1,
    rpcUrl: 'https://mainnet.eth.aragon.network/',
    ethscanType: '',
    exploreURL: 'https://etherscan.io',
    stakingPool: '0x1DaeD74ed1dD7C9Dabbe51361ac90A69d851234D'
  },
  'heco-test': {
    chainId: 256,
    rpcUrl: 'https://http-testnet.hecochain.com',
    ethscanType: '',
    exploreURL: 'https://scan-testnet.hecochain.com',
    stakingPool: '0x130989912317e155189a522beaf63cb80bc69e72'
  },
  heco: {
    chainId: 128,
    rpcUrl: 'https://http-mainnet.hecochain.com',
    ethscanType: '',
    exploreURL: 'https://scan.hecochain.com',
    stakingPool: '0x06c7b472261f788634b62214adbb6d26795d85f9'
  },
  kovan: {
    chainId: 42,
    rpcUrl: 'https://kovan.infura.io/',
    ethscanType: 'kovan.',
    exploreURL: 'https://kovan.etherscan.io',
    stakingPool: '0x1DaeD74ed1dD7C9Dabbe51361ac90A69d851234D'
  },
  'bsc-test': {
    chainId: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s2.binance.org:8545',
    ethscanType: '',
    exploreURL: 'https://testnet.bscscan.com',
    stakingPool: '0x0449dF5a5e69D61584dd6A6b486a5cF5E33EC1ED',

    //add
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'tBNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
    iconUrls: ['https://etherscan.io/token/images/bnb_28_2.png']
  },
  bsc: {
    chainId: 56,
    rpcUrl: 'https://bsc-dataseed.binance.org',
    ethscanType: '',
    exploreURL: 'https://bscscan.com',
    stakingPool: '0x0449dF5a5e69D61584dd6A6b486a5cF5E33EC1ED',

    //add
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'BNB',
      decimals: 18,
    },
    /**
     * fix network details for this Chain ID do not match metamask records.
     * use https://chainid.network/chains.json recorded
     */
    rpcUrls: [
      'https://bsc-dataseed1.binance.org',
      'https://bsc-dataseed.binance.org',
    ],
    blockExplorerUrls: ['https://bscscan.com/'],
    iconUrls: ['https://etherscan.io/token/images/bnb_28_2.png'],
  },
};

export function getEthChainInfo(): CHAIN_INFO {
  return CHAIN_ENV_MAP[CHAIN_ENV];
}
