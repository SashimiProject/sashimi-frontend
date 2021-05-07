import images from '../images'
const CHAIN_ENV: string = process.env.REACT_APP_CHAIN_ENV || 'main'

type NetworkType = { src: string; title: string }
export type toNetworksType = {
  0: NetworkType
  1: NetworkType
  2: NetworkType
}
type INFO = {
  NETWORK_URL: string
  BRIDGE_TOKEN_LIST: Array<{
    address: string
    symbol: string
    decimals: string
  }>
  CrossChainAddress: string
  feeDecimals: string
  feeSymbol: string
  formNetwork: NetworkType
  toNetwork: any
  networkList: Array<NetworkType>
  formNetworkID: number
}
export const Networks: any = {
  0: {
    src: images.eth,
    title: 'Ethereum Network',
    arrowsHref: 'https://sashimi.cool/bridge',
  },
  1: {
    src: images.bnb,
    title: 'Binance Network',
    arrowsHref: 'https://bsc.sashimi.cool/bridge',
  },
  2: {
    src: images.ht,
    title: 'Heco Network',
    arrowsHref: 'https://heco.sashimi.cool/bridge',
  },
}
export const testNetworks: any = {
  0: {
    src: images.eth,
    title: 'Kovan Network',
    arrowsHref: 'https://kovan-test.sashimi.cool/bridge',
  },
  1: {
    src: images.bnb,
    title: 'Binance Testnet  Network',
    arrowsHref: 'https://bsc-test.sashimi.cool/bridge',
  },
  2: {
    src: images.ht,
    title: 'Heco Testnet Network',
    arrowsHref: 'https://heco-test.sashimi.cool/bridge',
  },
}
const getToNetwork = (fromKey: number, networks: any) => {
  const to: any = {}
  Object.keys(networks).forEach((key) => {
    const num = Number(key)
    if (num !== fromKey) {
      to[num] = networks[num]
    }
  })
  return to
}
const config: any = {
  main: {
    NETWORK_URL:
      'https://mainnet.infura.io/v3/798f728850664ccdba2f40009460b5b9',
    BRIDGE_TOKEN_LIST: [
      {
        address: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
        symbol: 'SASHIMI',
        decimals: '18',
      },
    ],
    feeDecimals: '18',
    feeSymbol: 'ETH',
    CrossChainAddress: '0xDBa694D5204064296247D1210DBfd2Fc9B9D95A0',
    formNetworkID: 0,
    formNetwork: Networks[0],
    toNetwork: getToNetwork(0, Networks),
  },
  bsc: {
    NETWORK_URL: 'https://bsc-dataseed.binance.org',
    BRIDGE_TOKEN_LIST: [
      {
        address: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
        symbol: 'SASHIMI',
        decimals: '18',
      },
    ],
    feeDecimals: '18',
    feeSymbol: 'BNB',
    CrossChainAddress: '0x82667Bc9D57486e3be537b76de1Db454F5B6A246',
    formNetworkID: 1,
    formNetwork: Networks[1],
    toNetwork: getToNetwork(1, Networks),
  },
  heco: {
    NETWORK_URL: 'https://http-mainnet.hecochain.com',
    BRIDGE_TOKEN_LIST: [
      {
        address: '0xc2037c1c13dd589e0c14c699dd2498227d2172cc',
        symbol: 'SASHIMI',
        decimals: '18',
      },
    ],
    feeDecimals: '18',
    feeSymbol: 'HT',
    CrossChainAddress: '0xC4fAF6Fb5A43A60f37662C794ab01D3b69040C4b',
    formNetworkID: 2,
    formNetwork: Networks[2],
    toNetwork: getToNetwork(2, Networks),
  },
  kovan: {
    NETWORK_URL: 'https://kovan.infura.io/v3/798f728850664ccdba2f40009460b5b9',
    BRIDGE_TOKEN_LIST: [
      {
        address: '0x6ee7451f71cBbB3d35f11b41b28EaB4f750d2e7e',
        symbol: 'SASHIMI',
        decimals: '18',
      },
    ],
    feeDecimals: '18',
    feeSymbol: 'ETH',
    CrossChainAddress: '0x3382CBB7D49F5e56d3aa8663bC81A3a6fc84f33A',
    formNetworkID: 0,
    formNetwork: testNetworks[0],
    toNetwork: getToNetwork(0, testNetworks),
  },
  'bsc-test': {
    NETWORK_URL: 'https://data-seed-prebsc-1-s2.binance.org:8545',
    BRIDGE_TOKEN_LIST: [
      {
        address: '0x7edAa8416Fae666133eb5E1e09f5e3f13628bAA0',
        symbol: 'SASHIMI',
        decimals: '18',
      },
    ],
    feeDecimals: '18',
    feeSymbol: 'BNB',
    CrossChainAddress: '0x2Cc578fA7AD8Ed69C09cfdBc4788623ccE9595b0',
    formNetworkID: 1,
    formNetwork: testNetworks[1],
    toNetwork: getToNetwork(1, testNetworks),
  },
  'heco-test': {
    NETWORK_URL: 'https://http-testnet.hecochain.com',
    BRIDGE_TOKEN_LIST: [
      {
        address: '0x5539F31C6FE629DD7ccE26d2b4B3fC22443B3148',
        symbol: 'SASHIMI',
        decimals: '18',
      },
    ],
    feeDecimals: '18',
    feeSymbol: 'HT',
    CrossChainAddress: '0x6DdD3767fD2eD3d584B0fb706Af38d5AEc752164',
    formNetworkID: 2,
    formNetwork: testNetworks[2],
    toNetwork: getToNetwork(2, testNetworks),
  },
}

export default { ...config[CHAIN_ENV] } as INFO
