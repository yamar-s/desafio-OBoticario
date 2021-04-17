# OBoticario Backend Test

The project was done using the [express generator template](https://expressjs.com/pt-br/starter/generator.html). The tests were developed using the Jest framework. The documentation was created with the swagger.

## Doc
[Postman documentation](https://documenter.getpostman.com/view/8414349/TzJrDf1B)
Desafio-OBoticario.postman_collection -> JSON to import the postman collection.
Desafio-OBoticario.sql -> SQL to import the database and structure.

## Development
To the first time, run `npm install` to load all dependences.

Run `npm run start` or `npm start` on terminal to initiate localhost server on port `3000`.

To change the port you need to edit `index.js` on listen method your desired port.

## Test

Run `npm run test` on terminal to initiate the tests.

The endpoints 4 and 7 need to change the fields to work on each run:
4: Change the sale id 
7: Change CPF

## Endpoints List

1. GET - `http://localhost:3000/vendas` -> List all sales
2. POST - `http://localhost:3000/vendas` -> Add new sale
3. PUT - `http://localhost:3000/vendas` -> Edit an sale
4. DEL - `http://localhost:3000/vendas` -> Delete an sale
5. POST - `http://localhost:3000/vendas:Id` -> Get sale by Id
6. GET - `http://localhost:3000/revendedor` -> List all resellers
7. POST - `http://localhost:3000/revendedor` -> Add new reseller
8. GET - `http://localhost:3000/revendedor/cashback/:CPF` -> get the cashback value by CPF
9. GET - `http://localhost:3000/revendedor/:Code` -> get reseller by code
10. POST - `http://localhost:3000/revendedor/login` -> Login of an reseller


## Database

The database was developed with the mysql language. Version 8.0 is recommended for compatibility

### step by step

>Run the script in Desafio-OBoticario.sql

## Database table list

tblvenda
- CPF BIGINT,
- Email VARCHAR,
- Codigo INT, 
- Senha VARCHAR, 
- Genero ENUM, 
- Celular BIGINT, 
- Endereco VARCHAR, 
- Bairro VARCHAR, 
- UF CHAR, 
- CEP VARCHAR, 
- Cidade VARCHAR, 
- DataCriacao DATETIME;
tblvenda_hist

tblrevendedor
- Id INT, 
- CodigoRevendedor INT, 
- Valor DOUBLE, 
- STATUS ENUM, 
- DATA DATETIME, 
- CPF BIGINT, 
- ValorCashBack DOUBLE, 
- PorcentagemCashBack DECIMAL;
tblrevendedor_hist

