// import do framework Express

const express = require("express");

const app = express();

app.use(express.json());

//retorna todos os clientes existentes an tabela
app.get("/clientes", async (req, res) => {
  const clientes = await selectClientes();

  return res.json(clientes);
});

//inicia o servidor na porta informada
app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});


//conecção com o banco de dados
async function connect() {
  if (global.connection && global.connection.state !== "disconnected") {
    return global.connection;
  }
  const mysql2 = require("mysql2/promise");
  const con = await mysql2.createConnection({
    host: "localhost",
    port: "3306",
    database: "bd_clientes",
    user: "root",
    password: "1234",
  });

  console.log("Conectado ao banco de dados!");
  global.connection = con;
  return con;
}



//seleciona o registro desejado na tabela clientes
async function selectCliente(id) {
  const conn = await connect();
  const sql = "SELECT * FROM clientes WHERE id = ? ;";
  const values = id;
  const [rows] = await conn.query(sql, values);
  return rows;
}

//retona o cliente com base no id informado
app.get("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const cliente = await selectCliente(id);

  return res, json(cliente);
});



//CREATE - cria um novo cliente
app.post("/clientes", async (req, res) => {
  const { nome, idade } = req.body;
  const result = await insertCliente({ nome: nome, idade: idade });
  console.log(result);
  const clientes = await selectClientes();
  return res.json(clientes);
});

//insere um novo registro na tabela clientes;
async function insertCliente(cliente) {
  const conn = await connect();
  const sql = "INSERT INTO clientes (nome, idade) VALUES (?, ?)";
  const values = [cliente.nome, cliente.idade];
  return await conn.query(sql, values);
}



//UPDATE - atualizando umcliente
async function selectClientes() {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM clientes");
  return rows;
}




// update - atualizando um cliente
app.put("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, idade } = req.body;
  const result2 = await updateCliente(id, { nome: nome, idade: idade });

  const clientes = await selectClientes();
  return res.json(clientes);
});

// atualiza um registro na tabela clientes
async function updateCliente(id, cliente) {
  const conn = await connect();
  const sql = "update clientes  SET nome=?, idade=? WHERE id=?";
  const values = [cliente.nome, cliente.idade, id];
  return await conn.query(sql, values);
}




//excluindo um cliente
app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    var result = await deleteCliente(id);
    return res.status(200).json({message: `Registro excluido com sucesso!`});
})

//deleta um registro da tabela cliente
async function deleteCliente(id) {
    const conn = await connect();
    const sql = "DELETE FROM clientes WHERE id = ?;";
    return await conn.query(sql, [id]);
}

