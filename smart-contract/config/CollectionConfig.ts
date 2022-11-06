import CollectionConfigInterface from '../lib/CollectionConfigInterface';
import * as Networks from '../lib/Networks';
import * as Marketplaces from '../lib/Marketplaces';
import whitelistAddresses from './whitelist.json';

const CollectionConfig: CollectionConfigInterface = {
  testnet: Networks.ethereumTestnet,
  mainnet: Networks.ethereumMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: 'UforArtist',
  tokenName: 'U for Artist',
  tokenSymbol: 'U4ART',
  hiddenMetadataUri: 'ipfs://QmdxcUfx74BfsanK1NvbSNM6N6yiZMnpmWWt57RyoWTYpz/hidden.json',
  maxSupply: 1000,
  whitelistSale: {
    price: 0.0,
    maxMintAmountPerTx: 1,
  },
  preSale: {
    price: 0.0,
    maxMintAmountPerTx: 1,
  },
  publicSale: {
    price: 0.01,
    maxMintAmountPerTx: 1,
  },
  contractAddress: '0xc039115a382b74715d479a692b34835501fdbEeC',
  marketplaceIdentifier: 'UforART',
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses,
};

export default CollectionConfig;
