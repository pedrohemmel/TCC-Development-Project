# Projeto de desenvolvimento para o tema: ANÁLISE DA MOVIMENTAÇÃO EM MASSA DE PESSOAS EM EVENTOS UTILIZANDO BLUETOOTH

## Introdução 

### BluetoothScan

Esse projeto feito em react native é utilizado para ativar o Bluetooth Low Energy dos dispositivos smarthphones, possibilitando a captação dos dispositivos a volta de cada ponto de bluetooth alocado no evento

### BLEProjectAPI

API feita para enviar dados do projeto BLEControlApp para o banco de dados.

#### Configuração local

Libs base do projeto
```
npm install express
npm install -g nodemon
npm install dotenv
```

Libs banco de dados
```
npm install mysql2
```

#### Configurações docker

Rode o seguinte comando no terminal para criar um container docker
```
docker run --name name-your-container -p 3306:3306 -e MYSQL_ROOT_PASSWORD=your_password -d mysql:latest
```

Verifique se o container está rodando com o seguinte comando
```
docker ps
```

Copie o seu script sql para dentro do container docker
```
docker cp path_do_script/game-db.sql nome-do-container:/init.sql
```

Se conecte no shell sql e coloque a mesma senha de quando criou o container
```
docker exec -it nome_do_container mysql -uroot -p
```

Rode o script copiado para o container
```
source /init.sql;
```

#### Instalar Cliente MySQL

##### macOS

Instale o Homebrew (se ainda não estiver instalado):
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Instale o cliente MySQL:
```
brew install mysql
```

##### Ubuntu/Debian

Atualize o índice de pacotes:
```
sudo apt update
```

Instale o cliente MySQL:
```
sudo apt install mysql-client
```

##### Windows

1. Baixe o instalador do MySQL em [MySQL Downloads](https://dev.mysql.com/downloads/installer/).
2. Siga as instruções do instalador para instalar o cliente MySQL.

##### Verificar a Instalação

Após a instalação, verifique se o cliente MySQL foi instalado corretamente:
```
mysql --version
```

#### Configure as variáveis

Configure as variáveis de ambiente de conexão com o banco de dados e portas que serão utilizadas no código criando um arquivo .env.

Utilize o .env.example como examplo para criar o seu próprio.