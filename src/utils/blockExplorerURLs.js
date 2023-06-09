const blockExplorerURLs = [
    {
      chainId: [1, 'eth-mainnet'],
      url: 'https://etherscan.io/'
    },
    {
      chainId: [5, 'eth-goerli'],
      url: 'https://goerli.etherscan.io/'
    },
    {
      chainId: [137, 'matic-mainnet'],
      url: 'https://polygonscan.com/'
    },
    {
      chainId: [80001, 'matic-mumbai'],
      url: 'https://mumbai.polygonscan.com/'
    },
    {
      chainId: [43114, 'avalanche-mainnet'],
      url: 'https://snowtrace.io/'
    },
    {
      chainId: [43113, 'avalanche-testnet'],
      url: 'https://testnet.snowtrace.io/'
    },
    {
      chainId: [56, 'bsc-mainnet'],
      url: 'https://www.bscscan.com/'
    },
    {
      chainId: [97, 'bsc-testnet'],
      url: 'https://testnet.bscscan.com/'
    },
    {
      chainId: [1284, 'moonbeam-mainnet'],
      url: 'https://moonscan.io/'
    },
    {
      chainId: [1287, 'moonbeam-moonbase-alpha'],
      url: 'https://moonbase-blockscout.testnet.moonbeam.network/'
    },
    {
      chainId: [1285, 'moonbeam-moonriver'],
      url: 'https://blockscout.moonriver.moonbeam.network/'
    },
    {
      chainId: [30, 'rsk-mainnet'],
      url: 'https://explorer.rsk.co/'
    },
    {
      chainId: [31, 'rsk-testnet'],
      url: 'https://explorer.testnet.rsk.co/'
    },
    {
      chainId: [42161, 'arbitrum-mainnet'],
      url: 'https://arbiscan.io/'
    },
    {
      chainId: [421613, 'arbitrum-goerli'],
      url: 'https://goerli.arbiscan.io/'
    },
    {
      chainId: [42170, 'arbitrum-nova-mainnet'],
      url: 'https://nova.arbiscan.io/'
    },
    {
      chainId: [250, 'fantom-mainnet'],
      url: 'https://explorer.fantom.network/'
    },
    {
      chainId: [4002, 'fantom-testnet'],
      url: 'https://testnet.ftmscan.com/'
    },
    {
      chainId: [11297108109, 'palm-mainnet'],
      url: 'https://explorer.palm.io/'
    },
    {
      chainId: [11297108099, 'palm-testnet'],
      url: 'https://blockscout.com/poa/sokol'
    },
    {
      chainId: [71402, 'nervos-godwoken-mainnet'],
      url: 'https://v1.gwscan.com/'
    },
    {
      chainId: [71401, 'nervos-godwoken-testnet'],
      url: 'https://v1.testnet.gwscan.com/'
    },
    {
      chainId: [2020, 'axie-mainnet'],
      url: 'https://app.roninchain.com/'
    },
    {
      chainId: [2020, 'axie-mainnet'],
      url: 'https://app.roninchain.com/'
    },
    {
      chainId: [128, 'heco-mainnet'],
      url: 'https://www.hecoinfo.com/'
    },
    {
      chainId: [256, 'heco-testnet'],
      url: 'https://scan-testnet.hecochain.com/home/index'
    },
    {
      chainId: [9001, 'evmos-mainnet'],
      url: 'https://evm.evmos.org/'
    },
    {
      chainId: [9000, 'evmos-testnet'],
      url: 'https://evm.evmos.dev/'
    },
    {
      chainId: [592, 'astar-mainnet'],
      url: 'https://astar.subscan.io/'
    },
    {
      chainId: [336, 'astar-shiden'],
      url: 'https://shiden.subscan.io/'
    },
    {
      chainId: [1666600000, 'harmony-mainnet'],
      url: 'https://explorer.harmony.one/'
    },
    {
      chainId: [1666700000, 'harmony-testnet'],
      url: 'https://explorer.pops.one/'
    },
    {
      chainId: [1313161554, 'aurora-mainnet'],
      url: 'https://explorer.mainnet.aurora.dev/'
    },
    {
      chainId: [1313161555, 'aurora-testnet'],
      url: 'https://explorer.testnet.aurora.dev/'
    },
    {
      chainId: [42262, 'emerald-paratime-mainnet'],
      url: 'https://explorer.emerald.oasis.dev/'
    },
    {
      chainId: [53935, 'defi-kingdoms-mainnet'],
      url: 'https://subnets.avax.network/defi-kingdoms'
    },
    {
      chainId: [73772, 'swimmer-mainnet'],
      url: 'https://subnets.avax.network/swimmer'
    },
    {
      chainId: [288, 'boba-mainnet'],
      url: 'https://bobascan.com/'
    },
    {
      chainId: [43288, 'boba-avalanche-mainnet'],
      url: 'https://blockexplorer.avax.boba.network/'
    },
    {
      chainId: [1294, 'boba-bobabeam-mainnet'],
      url: 'https://blockexplorer.bobabeam.boba.network/'
    },
    {
      chainId: [4328, 'boba-avalanche-testnet'],
      url: 'https://blockexplorer.testnet.avax.boba.network/'
    },
    {
      chainId: [28, 'boba-rinkeby-testnet'],
      url: 'https://testnet.bobascan.com/'
    },
    {
      chainId: [1297, 'boba-bobabase-testnet'],
      url: 'https://blockexplorer.bobabase.boba.network/'
    },
    {
      chainId: [56288, 'boba-bnb-mainnet'],
      url: 'https://blockexplorer.bnb.boba.network/'
    },
    {
      chainId: [9728, 'boba-bnb-testnet'],
      url: 'https://blockexplorer.testnet.bnb.boba.network/'
    },
    {
      chainId: [1026062157, 'skale-omnus'],
      url: 'https://skale-analytics.skalelabs.com/'
    },
    {
      chainId: [278611351, 'skale-razor'],
      url: 'https://staging-aware-chief-gianfar.explorer.staging-v3.skalenodes.com/'
    },
    {
      chainId: [2046399126, 'skale-europa'],
      url: 'https://skale-analytics.skalelabs.com/'
    },
    {
      chainId: [1564830818, 'skale-calypso'],
      url: 'https://skale-analytics.skalelabs.com/'
    },
    {
      chainId: [192837465, 'gather-mainnet'],
      url: 'https://explorer.gather.network/'
    },
    {
      chainId: [356256156, 'gather-testnet'],
      url: 'https://testnet-explorer.gather.network/'
    }
  ]
  
  export { blockExplorerURLs }