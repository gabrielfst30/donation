import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import "hardhat-watcher";
import "hardhat-deploy";

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
    hardhat: {
      chainId: 1337,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // usa a primeira conta da lista como deployer
    },
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
