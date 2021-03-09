import * as tokenIcons from './tokenIcons';

export const contractAddresses = {
  sushi: {
    42: '0x50Bc9dD3a70aFA7BF8877F53B16455910aD943F8', // aelf sushi new one 9.9
    1: '0x50Bc9dD3a70aFA7BF8877F53B16455910aD943F8', // aelf sashimi
    256: '0x50Bc9dD3a70aFA7BF8877F53B16455910aD943F8', // aelf sashimi heco
  },
  // useless in heco
  sashimiBar: {
    42: '0xfaC2681cB05Ba08De504e7FDBc2186B22d868f2A', // aelf sushi new one 9.18
    1: '0x6ed306DbA10E6c6B20BBa693892Fac21f3B91977', // aelf sashimi
    256: '0x6ed306DbA10E6c6B20BBa693892Fac21f3B91977', // aelf sashimi
  },
  sashimiRouter: {
    42: '0xccad491b892d9fac3bc5e38db64f9d5121d597db',
    1: '0xccad491b892d9fac3bc5e38db64f9d5121d597db',
    256: '0xccad491b892d9fac3bc5e38db64f9d5121d597db',
  },
  // useless in heco
  investment: {
    42: '0x90b1035365eE09d924eCf46fa05e429975B02B7F',
    1: '0x90b1035365eE09d924eCf46fa05e429975B02B7F',
    256: '0x90b1035365eE09d924eCf46fa05e429975B02B7F',
  },
  masterChef: {
    42: '0x130989912317e155189a522beaf63cb80bc69e72', // aelf sushi new one 9.9
    1: '0x130989912317e155189a522beaf63cb80bc69e72', // aelf master
    256: '0x130989912317e155189a522beaf63cb80bc69e72', // aelf master
  },
  // WHT
  weth: {
    42: '0x5b2da6f42ca09c77d577a12bead0446148830687', // aelf sushi
    1: '0x5b2da6f42ca09c77d577a12bead0446148830687', // sushi use
    256: '0x5b2da6f42ca09c77d577a12bead0446148830687', // sushi use
  },
}

export const sashimiAddress = '0x50Bc9dD3a70aFA7BF8877F53B16455910aD943F8';
export const wethAddress = '0x5b2da6f42ca09c77d577a12bead0446148830687';
export const wethSashimiLpPAddress = '0x5a29604c3d7577172b9be9cadd4f50453096817d'; // HT-SASHIMI
export const supportedLendingInvestmentPools = [
  {
    lpAddress: '0x66Ec163991f890F4DdaE20c910Ad3E6e59c00C26', // USDT-HT
    providerAddress: '0x8dDa235da0FAA9fC23f3f6dfC91cb8CfA4368Fcd', // USDT vault provider
    depositAddress: '0x01cA93a4c823251E7a8F0b1806bff83b89FA7E25',
    depositTokenDecimal: 18,
    depositTokenSymbol: 'USDT',
    tokenSymbol: 'USDT',
    icon: tokenIcons.usdt,
  },
  {
    lpAddress: '0xA2A9aea1647dA2370756edb4713Bcda13b09ef0d', // HT-HUSD
    providerAddress: '0xE365f77427195dC493c1F7e7cf9Ddb0D5DE31128', // HUSD vault provider
    depositAddress: '0x7276e496B7B8A155c3257c2b0889c47a55D4f002',
    depositTokenDecimal: 8,
    depositTokenSymbol: 'HUSD',
    tokenSymbol: 'HUSD',
    icon: tokenIcons.husd,
  },
  {
    lpAddress: '0xE8e520BE769Ef3d45BD80C07b9Cd16d95309F531', // ETH-HT
    providerAddress: '0x24284E5bC914AED74666FF735554A0A10ccEB9E6', // ETH vault provider
    depositAddress: '0x5879180423f5D35a34721501a24F1116A446EC53',
    depositTokenDecimal: 18,
    depositTokenSymbol: 'ETH',
    tokenSymbol: 'ETH',
    icon: tokenIcons.eth,
  },
  {
    lpAddress: '0x589Bf5BEb31ED9D4dE685596D7923730fa73E942', // HT-HBTC
    providerAddress: '0x0A9BE6A4da9257dB37e28f9ddA904e764654Acc4', // ETH vault provider
    depositAddress: '0x5bE1a23a43afb38351F34D949C98fb338666d6E3',
    depositTokenDecimal: 18,
    depositTokenSymbol: 'HBTC',
    tokenSymbol: 'HBTC',
    icon: tokenIcons.hbtc,
  },
  {
    lpAddress: '0xE8e520BE769Ef3d45BD80C07b9Cd16d95309F531', // ETH-HT
    providerAddress: '0x63e7F4Bb788A53abFD08c2f4E88F8fCEb7D3ed85', // HT vault provider
    depositAddress: '0x5b2da6f42ca09c77d577a12bead0446148830687',
    depositTokenDecimal: 18,
    depositTokenSymbol: 'HT',
    tokenSymbol: 'HT',
    icon: tokenIcons.ht,
  },
  // {
  //   lpAddress: '0x0c3675E1ddE92f708E1C67f5C7A86451b4b0531B', // USDT-WBNB
  //   providerAddress: '0x52b3B4bf9BF4cc752D21648288b3c1242b5DA6ce', // USDT vault provider
  //   depositAddress: '0x55d398326f99059fF775485246999027B3197955',
  //   depositTokenDecimal: 18,
  //   depositTokenSymbol: 'USDT',
  //   tokenSymbol: 'USDT',
  //   icon: tokenIcons.usdt,
  // },
  // {
  //   lpAddress: '0x42aBEDDDc74d860f050CeA1ee40c3d53f284C246', // BTCB-USDT
  //   providerAddress: '0xD84aD5fEa603B9cE81F111546B96D09906ea7d10', // BTCB vault provider
  //   depositAddress: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  //   converterOptions: {
  //     lpAddresses: [
  //       '0x0c3675E1ddE92f708E1C67f5C7A86451b4b0531B'
  //     ],
  //     pivotTokenAddresses: [
  //       '0x55d398326f99059fF775485246999027B3197955'
  //     ]
  //   },
  //   depositTokenDecimal: 18,
  //   depositTokenSymbol: 'BTCB',
  //   tokenSymbol: 'BTCB',
  //   icon: tokenIcons.btcb,
  // },
];

export const supportedInvestmentPools = [
  // {
  //   lpAddresses: {
  //     42: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA',
  //     1: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA', // WETH-SASHIMI UNI LP
  //   },
  //   pivotLpAddresses: {
  //     42: '0x359c138b1666aa2167aafc205a841ff432a23040',
  //     1: '0x9776a214272ab452f8c88c7576dcd0c6ffbfee14' // GOF-ETH
  //   },
  //   depositAddresses: {
  //     42: '0xe66747a101bff2dba3697199dcce5b743b454759',
  //     1: '0xe66747a101bff2dba3697199dcce5b743b454759' // DAI
  //   },
  //   providerAddresses: {
  //     42: '0xE9886bBa3bA6A3C00144E1E068088eE879f560Cd',
  //     1: '0xE9886bBa3bA6A3C00144E1E068088eE879f560Cd'
  //   },
  //   depositTokenSymbol: 'GT',
  //   tokenSymbol: 'GOF', // GOLFF // The token you get
  //   icon: '💼',
  //   sashimiIndex: 1,
  //   pivotTokenIndex: 0,
  // },
  // // DeForce Investment
  // {
  //   lpAddresses: {
  //     42: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA',
  //     1: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA', // ETH-SASHIMI
  //   },
  //   pivotLpAddresses: {
  //     42: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
  //     1: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11' // DAI-ETH
  //   },
  //   depositAddresses: {
  //     42: '0x6b175474e89094c44da98b954eedeac495271d0f', // WETH in kovan, ERC20
  //     1: '0x6b175474e89094c44da98b954eedeac495271d0f' // DAI
  //   },
  //   providerAddresses: {
  //     42: '0x30D75a1232c0d28aA53c43D47eF7D3441cfeD1E3',
  //     1: '0x30D75a1232c0d28aA53c43D47eF7D3441cfeD1E3'
  //   },
  //   depositTokenSymbol: 'DAI',
  //   tokenSymbol: 'DF', // Which token will I get, when I do the harvest？
  //   icon: '👜',
  //   sashimiIndex: 1,
  //   pivotTokenIndex: 0,
  //   hasRegularProfit: true,
  // },
  // {
  //   lpAddresses: {
  //     42: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA',
  //     1: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA', // ETH-SASHIMI
  //   },
  //   pivotLpAddresses: {
  //     42: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
  //     1: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc' // USDC-ETH
  //   },
  //   depositAddresses: {
  //     42: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // WETH in kovan, ERC20
  //     1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' // USDC
  //   },
  //   providerAddresses: {
  //     42: '0x34CF6e94Cb4d3f7f9679584753e4447244f7CBB9',
  //     1: '0x34CF6e94Cb4d3f7f9679584753e4447244f7CBB9'
  //   },
  //   depositTokenSymbol: 'USDC',
  //   tokenSymbol: 'DF', // Which token will I get, when I do the harvest？
  //   icon: '👝',
  //   sashimiIndex: 1,
  //   pivotTokenIndex: 0,
  //   hasRegularProfit: true,
  // },
  // {
  //   lpAddresses: {
  //     42: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA',
  //     1: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA', // ETH-SASHIMI
  //   },
  //   pivotLpAddresses: {
  //     42: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
  //     1: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852' // ETH-USDT USDT-ETH
  //   },
  //   depositAddresses: {
  //     42: '0xdac17f958d2ee523a2206206994597c13d831ec7', // WETH in kovan, ERC20
  //     1: '0xdac17f958d2ee523a2206206994597c13d831ec7' // USDT
  //   },
  //   providerAddresses: {
  //     42: '0x8010685EaE3228886D2Ce438c1C2C9066227da96',
  //     1: '0x8010685EaE3228886D2Ce438c1C2C9066227da96'
  //   },
  //   depositTokenSymbol: 'USDT',
  //   tokenSymbol: 'DF', // Which token will I get, when I do the harvest？
  //   icon: '🧳',
  //   sashimiIndex: 1,
  //   pivotTokenIndex: 1,
  //   hasRegularProfit: true,
  // }
];
// These pools get 0 point; [type pid]
export const unStakeOnlyPools = [];
// If is xxx-Sashimi Pool; [type pid]
// Support sashimi pair only. Used in FarmCards.tsx
export const notETHPairPools = [10, 12, 13, 14, 15, 16, 22, 23, 24, 30];

export const hiddenPools = [];

export const doublePools = [];
export const unStakeOnlyDoublePools = [];

const getWaitingPools = (start, end) => {
  const array = [];
  for (let i = 0; i <= end - start; i++) {
    array.push(start + i);
  }
  return array;
};
export const waitingInfo = {
  waitingPool: getWaitingPools(10, 10),
  startTime: 1619232713763
};

// 0928 Normal Farm -> SASHIMI LP
export const supportedPools = [
  {
    pid: 4,
    lpAddresses: {
      42: '0x5a29604c3d7577172b9be9cadd4f50453096817d',
      1: '0x5a29604c3d7577172b9be9cadd4f50453096817d',
      256: '0x5a29604c3d7577172b9be9cadd4f50453096817d',
    },
    tokenAddresses: {
      42: '0x50Bc9dD3a70aFA7BF8877F53B16455910aD943F8',
      1: '0x50Bc9dD3a70aFA7BF8877F53B16455910aD943F8',
      256: '0x50Bc9dD3a70aFA7BF8877F53B16455910aD943F8',
    },
    name: 'Sashimi Party!',
    symbol: 'SASHIMI-HT SALP LP',
    tokenSymbol: 'SASHIMI',
    icon: '🍣',
  },
  {
    pid: 0,
    lpAddresses: {
      42: '0x5dac6080291378860033f79310bae4a5013eb953',
      1: '0x5dac6080291378860033f79310bae4a5013eb953',
      256: '0x5dac6080291378860033f79310bae4a5013eb953',
    },
    tokenAddresses: {
      42: '0x60d64ef311a4f0e288120543a14e7f90e76304c6',
      1: '0x60d64ef311a4f0e288120543a14e7f90e76304c6',
      256: '0x60d64ef311a4f0e288120543a14e7f90e76304c6',
    },
    // uniV2Pivot && uniV2LPAddress && sashimiPlateInfo,sashimiPlateInfo.type=10
    // eg. you can get apy from pairs like ELF-USDT through ETH-USDT.
    uniV2Pivot: true,
    uniV2LPAddress: '0xFBDEa4B829021d9267e7E36F718A364a83279A77', // HT(WHT)-DAI SALP
    sashimiPlateInfo: {
      mainTokenIndex: 1, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 18],
      type: 10, // for normal pool
    },

    name: 'USDT-DAI',
    symbol: 'USDT-DAI SALP LP',
    tokenSymbol: 'DAI',
    icon: '🍌',
  },
  {
    pid: 1,
    lpAddresses: {
      42: '0xFBDEa4B829021d9267e7E36F718A364a83279A77',
      1: '0xFBDEa4B829021d9267e7E36F718A364a83279A77',
      256: '0xFBDEa4B829021d9267e7E36F718A364a83279A77',
    },
    tokenAddresses: {
      42: '0x60d64ef311a4f0e288120543a14e7f90e76304c6',
      1: '0x60d64ef311a4f0e288120543a14e7f90e76304c6',
      256: '0x60d64ef311a4f0e288120543a14e7f90e76304c6',
    },
    name: 'DAI-HT',
    symbol: 'DAI-HT SALP',
    tokenSymbol: 'DAI',
    icon: '🍎',
  },
  {
    pid: 2,
    lpAddresses: {
      42: '0x4bdae212b51dcc2c65bce6be40d7aff9ef953527',
      1: '0x4bdae212b51dcc2c65bce6be40d7aff9ef953527',
      256: '0x4bdae212b51dcc2c65bce6be40d7aff9ef953527',
    },
    tokenAddresses: {
      42: '0x04f535663110a392a6504839beed34e019fdb4e0',
      1: '0x04f535663110a392a6504839beed34e019fdb4e0',
      256: '0x04f535663110a392a6504839beed34e019fdb4e0',
    },
    name: 'USDT-HT',
    symbol: 'USDT-HT SALP',
    tokenSymbol: 'USDT',
    icon: '🍐',
  },
  {
    pid: 3,
    lpAddresses: {
      42: '0x1ff2fceb7c4a89b5db79b9248f99db1a143c1db9',
      1: '0x1ff2fceb7c4a89b5db79b9248f99db1a143c1db9',
      256: '0x1ff2fceb7c4a89b5db79b9248f99db1a143c1db9',
    },
    tokenAddresses: {
      42: '0x60d64ef311a4f0e288120543a14e7f90e76304c6',
      1: '0x60d64ef311a4f0e288120543a14e7f90e76304c6',
      256: '0x60d64ef311a4f0e288120543a14e7f90e76304c6',
    },
    // uniV2Pivot && uniV2LPAddress && sashimiPlateInfo,sashimiPlateInfo.type=10
    // eg. you can get apy from pairs like ELF-USDT through ETH-USDT.
    uniV2Pivot: true,
    uniV2LPAddress: '0xFBDEa4B829021d9267e7E36F718A364a83279A77', // HT(WHT)-DAI SALP
    sashimiPlateInfo: {
      mainTokenIndex: 1, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 18],
      type: 10, // for normal pool
    },

    name: 'SASHIMI-DAI',
    symbol: 'SASHIMI-DAI SALP LP',
    tokenSymbol: 'DAI',
    icon: '🍋',
  },
  // waiting test
  {
    pid: 10,
    lpAddresses: {
      42: '0x4bdae212b51dcc2c65bce6be40d7aff9ef953527',
      1: '0x4bdae212b51dcc2c65bce6be40d7aff9ef953527',
      256: '0x4bdae212b51dcc2c65bce6be40d7aff9ef953527',
    },
    tokenAddresses: {
      42: '0x04f535663110a392a6504839beed34e019fdb4e0',
      1: '0x04f535663110a392a6504839beed34e019fdb4e0',
      256: '0x04f535663110a392a6504839beed34e019fdb4e0',
    },
    name: 'USDT-HT',
    symbol: 'USDT-HT SALP',
    tokenSymbol: 'USDT',
    icon: '🍐',
  },
  // old
  // {
  //   pid: 10,
  //   lpAddresses: {
  //     42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
  //     1: '0xf7ba0272e5bdd4911c1baedb362700652959edaf',
  //   },
  //   tokenAddresses: {
  //     42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
  //     1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
  //   },
  //   name: 'elf love Sashimi!🧝🍱',
  //   symbol: 'SASHIMI-ELF SALP LP',
  //   tokenSymbol: 'ELF',
  //   icon: '🍱',
  // },
  // {
  //   pid: 25,
  //   lpAddresses: {
  //     42: '0xd9f91070371987eee3e500e90de5333e0c43d031',
  //     1: '0xbD61299162735Bc01C56eA295776BfF4A03E4a46',
  //   },
  //   tokenAddresses: {
  //     42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
  //     1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
  //   },
  //   name: 'MX!',
  //   symbol: 'MXC-ETH SALP LP',
  //   tokenSymbol: 'MXC',
  //   icon: '🌱'
  // },
  // SASHIMI End
];

// Vault
// TODO: replace
// NODE_ENV=development
// VUE_APP_USDT_ADDR = {"vaultAddr":"0xf4cd0917C2403fE10305B0F1FADdc35B637c3bd5", "stableCoinAddr":"0x448344fDF7295DBf0fC5DA825CA6355662a0e5AE", "wei":"mwei"}
// VUE_APP_DAI_ADDR =  {"vaultAddr":"0x49DDf6c6bE262DbEb1Cb99FccB144B2B806F082B", "stableCoinAddr":"0xFba5b8769a7033ab71718063eE57Bd7c764233db", "wei":"ether"}
// VUE_APP_USDC_ADDR = {"vaultAddr":"0x4890EfA1E90e3CaDB0280eE2768A7B5324249C05", "stableCoinAddr":"0x43418765AE9b55Ab366c91333166C05973Bf4de1", "wei":"mwei"}
// VUE_APP_WBTC_ADDR = {"vaultAddr":"0xC25b2e8503a19b0379925bAc416912f2c1d263D6", "stableCoinAddr":"0x01105d4f5740F8550DB6B3Dfdd5eD99d20B76C52", "wei":"ether"}
// VUE_APP_CHAIN_ID = 42
// VUE_APP_CONTROLLER = 0xce2217024E4f88150457E5E9B673DD9db7e7a756 // can get strategies of a vault.
export const vaultController = '0x3884eab512bB0475100997271EC83163DAa944AE';
export const vaults = [];

export const vaultStableTokenPriceAPI = 'http://39.98.34.153:8081/api/price';
