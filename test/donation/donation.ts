import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
//verificador de aprovação dos testes
import { expect } from "chai";
import { ethers } from "hardhat";
import { parseEther } from "ethers";

//Nome do teste
describe("Donation", () => {
  async function setupFixture() {
    //lista de carteiras do hardhat para teste
    const [owner, billy, jonh, alice] = await ethers.getSigners();

    //Pegando meu contrato
    const Donation = await ethers.getContractFactory("Donation");

    //Fazendo deploy do contrato para usar nos testes
    const donationContract = await Donation.deploy();

    //Aguardando deploy do contrato
    await donationContract.waitForDeployment();

    return {
      donationContract,
      owner,
      billy,
      jonh,
      alice,
    };
  }
  describe("Donation Receive", () => {
    it("should receive a donation", async () => {
      //
      const { donationContract } = await loadFixture(setupFixture);
      const value = parseEther("0.01");
      await donationContract.donate({ value });
    });
    it("should not receive a donation if value is 0", async () => {});

    it("should return balance equal 0 if hasn't donations", async () => {});
    it("should return balance equal 0.05", async () => {});
  });
});
