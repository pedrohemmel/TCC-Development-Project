# **Projeto de Desenvolvimento: Análise da Movimentação em Massa de Pessoas em Eventos Utilizando Bluetooth**

## **Introdução**

Este projeto tem como objetivo analisar a movimentação em massa de pessoas em eventos por meio da captação de dispositivos utilizando Bluetooth Low Energy (BLE). Ele é composto por dois componentes principais:

### **BluetoothScan**

- **Tecnologia**: React Native
- **Função**: Ativar o Bluetooth Low Energy (BLE) dos smartphones, permitindo a captação de dispositivos em volta de cada ponto Bluetooth alocado no evento.

### **BLEProjectAPI**

- **Tecnologia**: Node.js
- **Função**: API desenvolvida para receber os dados coletados pelo **BluetoothScan** e armazená-los no banco de dados MySQL para análise posterior.

---

## **Configuração Local**

Para configurar o ambiente local do projeto, siga os passos abaixo:

### **1. Instalação das Dependências Básicas**

Execute os comandos abaixo para instalar as bibliotecas essenciais:

```bash
npm install express
npm install -g nodemon
npm install dotenv
```

### **2. Instalação das Dependências para Banco de Dados**

Instale o MySQL2, necessário para conectar a API ao banco de dados MySQL:

```bash
npm install mysql2
```

---

## **Configurações Docker**

### **Criando o Container MySQL**

Para criar um container MySQL utilizando o Docker, execute o seguinte comando no terminal:

```bash
docker run --name name-your-container -p 3306:3306 -e MYSQL_ROOT_PASSWORD=your_password -d mysql:latest
```

### **Verificando o Status do Container**

Confira se o container foi criado corretamente e está em execução com o comando:

```bash
docker ps
```

### **Copiando o Script SQL para o Container**

Depois que o container estiver rodando, copie o seu script SQL para dentro do container:

```bash
docker cp path_do_script/game-db.sql nome-do-container:/init.sql
```

### **Conectando-se ao Shell do MySQL**

Conecte-se ao shell do MySQL no container e use a senha definida anteriormente:

```bash
docker exec -it nome_do_container mysql -uroot -p
```

### **Executando o Script SQL**

Dentro do shell do MySQL, execute o script que você copiou para o container:

```bash
source /init.sql;
```

---

## **Instalando o Cliente MySQL**

Dependendo do seu sistema operacional, siga as instruções abaixo para instalar o cliente MySQL.

### **macOS**

1. Instale o **Homebrew** (caso ainda não esteja instalado):

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Em seguida, instale o cliente MySQL:

   ```bash
   brew install mysql
   ```

### **Ubuntu/Debian**

1. Atualize o índice de pacotes:

   ```bash
   sudo apt update
   ```

2. Instale o cliente MySQL:

   ```bash
   sudo apt install mysql-client
   ```

### **Windows**

1. Baixe o instalador do MySQL em [MySQL Downloads](https://dev.mysql.com/downloads/installer/).
2. Siga as instruções do instalador para instalar o cliente MySQL.

### **Verificar a Instalação**

Para verificar se o cliente MySQL foi instalado corretamente, utilize o comando:

```bash
mysql --version
```

---

## **Configuração de Variáveis de Ambiente**

Crie um arquivo `.env` no diretório do projeto para configurar as variáveis de ambiente necessárias, como as credenciais de acesso ao banco de dados e as portas que serão utilizadas. Você pode usar o arquivo `.env.example` como modelo para isso.

**Atenção**: Deixe as variáveis organizadas e evite sobrescrever informações críticas.

---

## **Conclusão**

Com essa configuração, você terá um ambiente de desenvolvimento pronto para analisar a movimentação em massa de pessoas em eventos utilizando Bluetooth Low Energy. Certifique-se de seguir as etapas com atenção e mantenha seu ambiente de trabalho bem organizado.
