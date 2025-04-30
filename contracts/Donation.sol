//SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;
//SEMPRE QUE ALTERAR O CONTRATO NO HARDHAT É NECESSÁRIO RODAR O COMPILE
//npx hardhat clean && npx hardhat compile

contract Donation {
    //definindo variáveis globais
    address owner; //criandor do contrato
    uint256 public total; //total de donations
    uint256 private ids; //ids dos doadores
    Donor[] private donations; //lista de doações

    //struct de donor
    struct Donor {
        uint256 id; //id da doação
        address donor; //endereço do doador
        uint256 value; //valor da doação
    }

    constructor() {
        //definindo o criador do contrato como owner
        owner = msg.sender;
    }

    //modificador owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Você não é o proprietário do contrato");
        _;
    }

    function donate() external payable {
        //validando value
        require(msg.value > 0, "valor inválido");

        //incrementando os ids
        ids++;

        //criando uma doação
        //definimos memory porque essa variável só será utilizada no call da função, isso economiza custos no nosso contrato
        Donor memory donation = Donor(ids, msg.sender, msg.value);

        //inserindo a donation na array de donations
        donations.push(donation);

        //incrementando o total toda vez que a donation acontecer
        total += msg.value;
    }

    //retornando a lista de donations
    function getDonations() external view returns (Donor[] memory) {
        return donations;
    }

    //função de deposito dos donations
    function withdraw() external payable onlyOwner {
        //pegando o balance atual do contrato
        uint256 balance = address(this).balance;
        
        //validação de valor minimo de saque
        require(balance > 0, "Balance insuficiente para saque");
    
        //utilizando o método call para resgatarmos o value
        (bool, success) = (msg.sender).call{value: balance}("");
        
        //validação de transferência
        require(success, "Falha na transferência");
    }
}
