//para rodar o teste -> npx hardhat test
//para rodar o teste de forma automático -> npx hardhat test && npx hardhat watch test

//Garante que a blockchain de teste será reinicializada para um estado limpo antes de cada teste, economizando tempo.
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
//verificador de aprovação dos testes
import { expect } from "chai";
//lib de interação de contratos inteligentes
import { ethers } from "hardhat";
//conversor de BigNumber para Wei
import { parseEther } from "ethers";

//Testando implementação do contrato e dando nome ao teste
describe("Donation", () => {
  async function setupFixture() {
    //lista de carteiras do hardhat para teste
    const [owner, billy, jonh, alice] = await ethers.getSigners();

    //Gerando meu contrato
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

  //Testando a doação
  describe("Recebendo Donation", () => {
    it("Deve receber uma doação", async () => {
      //Iniciando contrato no estado limpo
      const { donationContract } = await loadFixture(setupFixture);
      //Formatando valor em Wei e simulando o envio de um valor
      const value = parseEther("0.01");
      //Enviando doação
      await donationContract.donate({ value });
      //Lendo o total de doação acumulada
      const total = await donationContract.total();
      //Comparando se o total é igual ao valor da doação enviada
      expect(total).to.equal(value);
    });

    it("Valor do donation deve ser maior que 0", async () => {
      //Iniciando contrato no estado limpo
      const { donationContract } = await loadFixture(setupFixture);
  
      //Formatando valor em Wei e simulando o envio de 0
      const value = parseEther("0");
  
      //Enviando doação e rejeitando se for menor ou igual que zero
      await expect(donationContract.donate({ value })).to.rejectedWith(
        "valor inválido"
      );
    });
  });
});
