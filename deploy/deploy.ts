import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployDonation: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const result = await deploy("Donation", {
    from: deployer,
    args: [], // Adicione argumentos aqui, se o construtor exigir
    log: true,
  });

  // console.log(`Donation deployed at: ${result.address}`);
};

export default deployDonation;
