import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import "hardhat-watcher";
import "hardhat-deploy";
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + "/.env" });


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.29",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths:{
    artifacts: "../dapp-donations/src/artifacts"
  },
  networks: {
    // hardhat: {
    //   chainId: 1337,
    // },
    monad:{
      url: process.env.MONAD_API_URL,
      accounts: process.env.PRIVATE_KEY_METAMASK_MONAD !== undefined ? [process.env.PRIVATE_KEY_METAMASK_MONAD] : [], //podemos ter mais de uma conta, por isso o array
    }
  },
  namedAccounts: {
    deployer: {
      default: 0, // usa a primeira conta da lista como deployer
    },
  },
  sourcify: {
    enabled: true,
    apiUrl: "https://sourcify-api-monad.blockvision.org",
    browserUrl: "https://testnet.monadexplorer.com"
  },
  etherscan:{
    enabled: false,
    // apiKey: process.env.ETHERSCAN_API_KEY || ""
  },
  watcher: {
    compilation: {
      tasks: ["compile"],
    },
    test: {
      tasks: [{ command: "test", params: { testFiles: ["{path}"] } }],
      files: ["./test/**/*"],
      verbose: true,
    },
  },

};

export default config;
