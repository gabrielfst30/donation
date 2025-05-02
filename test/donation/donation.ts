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

//Testando implementação do contrato e configurando-o para testes
describe("Donation Contract", () => {
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

    //Testando a doação (donate)
    describe("Recebendo Donation (Donation)", () => {
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

        //Testando Balance do contrato
        it("Se não tiver donation o balance deve ser 0", async () => {
            //Iniciando contrato no estado limpo
            const { donationContract } = await loadFixture(setupFixture);
            //Pegando o balance total do nosso contrato
            const balance = await ethers.provider.getBalance(
                donationContract.getAddress()
            );

            //esperando um balance igual a 0
            expect(balance.toString()).to.equal("0");
        });

        //O balance deve retornar um valor igual a 0.05
        it("O balance deve retornar um valor igual a 0.05", async () => {
            //Iniciando contrato no estado limpo
            const { donationContract } = await loadFixture(setupFixture);

            //Formatando valor em Wei e simulando o envio de um valor
            const value = parseEther("0.05");
            //Enviando doação
            await donationContract.donate({ value });
            //Pegando o balance total do nosso contrato
            const balance = await ethers.provider.getBalance(
                donationContract.getAddress()
            );

            //esperando um balance igual a 0
            expect(balance.toString()).to.equal(value.toString());
        });
    });

    //testando se as donations esta sendo salva na lista (getDonations)
    describe("Listando Donations (getDonations)", async () => {
        it("Deve ter 2 donations", async () => {
            //inicializando contrato e carteiras teste
            const { donationContract, alice, jonh } = await loadFixture(setupFixture);

            //Formatando valor em Wei e simulando o envio de um valor
            const value = parseEther("0.01");
            const valueTwo = parseEther("0.04");

            //Enviando doação
            await donationContract.connect(alice).donate({ value });
            await donationContract.connect(jonh).donate({ value });

            //Chamando a função do contrato para saber quantas donations foram feitas
            const donations = await donationContract.getDonations();

            //espera-se que tenha 2 doaçoes
            expect(donations).to.have.lengthOf(2);
        });

        it("O endereço do doador deve estar correto", async () => {
            //inicializando contrato
            const { donationContract, alice, jonh } = await loadFixture(setupFixture);
            //Formatando valor em Wei e simulando o envio de um valor
            const value = parseEther("0.01");
            //Enviando doação
            await donationContract.connect(alice).donate({ value });
            //Pegando a donation na primeira posicao
            const [donation] = await donationContract.getDonations();

            //espera-se que o endereço do doador seja igual ao de alice
            expect(donation.donor).to.equal(alice.address);
            //espera-se que o valor enviado da doação seja igual ao valor
            expect(donation.value).to.equal(value);
        });
    });

    //Testando o withdraw
    describe("Sacando Donations (Withdrawn)", async () => {
        //Testando função de saque caso não seja invocado pelo owner
        it("Se você não é owner, não poderá resgatar os donations", async () => {
            //inicializando contrato
            const { donationContract, alice, jonh } = await loadFixture(setupFixture);
            //Formatando valor em Wei e simulando o envio de um valor
            const value = parseEther("0.01");
            //Enviando doação
            await donationContract.connect(alice).donate({ value });

            //espera-se um erro caso o owner não seja o responsavel pelo withdraw
            await expect(donationContract.connect(alice).withdraw()).to.rejectedWith(
                "Você não é o proprietário do contrato"
            );
        });

        //Testando função de balace vazio
        it("Retorna balance insuficiente para saque", async () => {
            //inicializando contrato
            const { donationContract } = await loadFixture(setupFixture);

            //Espera o balance igual a 0
            await expect(donationContract.withdraw()).to.rejectedWith(
                "Balance insuficiente para saque"
            );
        });

        //Testando se é owner
        it("Deve sacar se for o owner", async () => {
            //inicializando contrato
            const { donationContract, billy } = await loadFixture(setupFixture);

            //Formatando valor em Wei e simulando o envio de um valor
            const value = parseEther("0.01");

            //Enviando doaçao
            await donationContract.connect(billy).donate({ value });

            //Pegando o balance inicial do contrato
            const contractBalanceInit = await ethers.provider.getBalance(
                donationContract.getAddress()
            );

            //Verificando se o balance atual é igual ao valor enviado por billy
            expect(contractBalanceInit.toString()).to.equal(value.toString());

            //Sacando o valor enviado por billy
            await donationContract.withdraw();

            //Vendo o balance final pós transacao
            const contractBalanceEnd = await ethers.provider.getBalance(
                donationContract.getAddress()
            );

            //Verificando se o balance final depois do saque é igual a 0
            expect(contractBalanceEnd.toString()).to.equal("0");
        });
    });
});
