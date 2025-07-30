# 💸 Donation DApp – Smart Contract de Doações

**Donation** é uma aplicação descentralizada desenvolvida por **Gabriel Santa Ritta** que permite o envio de doações em ETH para um contrato inteligente, armazenando o histórico on-chain. Ideal para projetos filantrópicos, arrecadações e experimentos com Web3.

---

## 🧱 Tecnologias Utilizadas

* **Solidity 0.8.x** – Linguagem de contratos inteligentes na EVM
* **Hardhat** – Framework para desenvolvimento, testes e deploy
* **Ethers.js** – Biblioteca para interação com Ethereum via JavaScript
* **Metamask** – Extensão de carteira para interagir com o DApp

---

## ⚙️ Funcionalidades

* ✅ Envio de doações em ETH para o contrato
* 📦 Registro de cada doação com valor e endereço do doador
* 🔍 Consulta pública do histórico de doações
* 🔐 Apenas o proprietário do contrato pode sacar os fundos

---

## 📁 Estrutura do Projeto

```
donation/
├── contracts/
│   └── Donation.sol            # Contrato inteligente principal
├── scripts/
│   └── deploy.js               # Script de deploy via Hardhat
├── test/
│   └── Donation.test.js        # Testes automatizados
├── hardhat.config.js           # Configuração do projeto
└── README.md
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

* Node.js
* NPM ou Yarn
* Hardhat instalado globalmente ou via `npx`

### Passos

```bash
# Clone o repositório
git clone https://github.com/gabrielfst30/donation.git
cd donation

# Instale as dependências
npm install

# Compile os contratos
npx hardhat compile

# Execute os testes
npx hardhat test
```

---

## 🌐 Deploy em Testnet

Configure as credenciais no `.env`:

```env
PRIVATE_KEY=SEU_PRIVATE_KEY
ALCHEMY_API_KEY=SUA_API_KEY
```

Atualize `hardhat.config.js` com as credenciais e execute:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

---

## 📌 Exemplo de Uso

1. Usuário conecta sua wallet ao front-end
2. Escolhe um valor em ETH e envia como doação
3. O contrato registra o valor e o endereço
4. O dono do contrato pode futuramente sacar os fundos

---

## 👨‍💻 Autor

Desenvolvido por [**Gabriel Santa Ritta**](https://github.com/gabrielfst30)
Fullstack & Blockchain Developer com foco em soluções descentralizadas, smart contracts e Web3.
