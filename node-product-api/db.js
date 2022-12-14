const { randomUUID } = require('crypto');
const bcrypt = require('bcrypt');

async function connect() {
  if (global.connection && global.connection.state !== 'disconnected') {
    return global.connection;
  }
  const mysql = require("mysql2/promise");
  // const connection = await mysql.createConnection({
  const connection = await mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    user: 'test',
    password: 'test',
    database: 'finalProjectSubst',
    multipleStatements: true
  });
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}

async function getAllProducts() {
  const conn = await connect();

  const query = `SELECT * FROM products LIMIT 1000;`;
  console.log(`Executando query: ${query}`);

  const [rows, fields] = await connection.execute(query);
  console.log(`Rows: ${JSON.stringify(rows)}`);
  return rows;
}

async function getProductById(id) {
  const conn = await connect();

  const query = `SELECT * FROM products WHERE id = ?;`;
  console.log(`Executando query: ${query}`);

  const [rows, fields] = await connection.execute(query, [id]);
  return rows;
}


async function updateProductById(id, name, description, value) {
  try {
    const conn = await connect();

    const query = `UPDATE products SET name = ?, description = ?, value = ? WHERE id = ?;`;
    console.log(`Executando query: ${query}`);

    const [rows] = await conn.execute(query, [name, description, value, id]);
    return rows;
  } catch (err) {
    throw { code: 500, message: 'Erro inesperado ao tentar cadastrar usuário' };
  }
}

async function deleteProductById(id) {
  const conn = await connect();

  const query = `DELETE FROM products WHERE id = ?;`;
  console.log(`Executando query: ${query}`);

  await connection.execute(query, [id]);
}

async function insertProduct(name, description, value) {
  const conn = await connect();

  const query = `INSERT INTO products(id, name, description, value) VALUES ("${randomUUID()}", ?, ?, ?);`;
  console.log(`Executando query: ${query}`);

  try {
    await connection.execute(query, [name, description, value]);
  } catch (err) {
    if (err.errno === 1062) {
      throw { code: 400, message: 'Já existe um producte cadastrado com este usuário!' };
    } else {
      throw { code: 500, message: 'Erro inesperado ao tentar cadastrar produto' };
    }
  }
}

const pesquisarUsuario = async (email) => {
  console.log('Pesquisando usuarios...', email);
  if (!email) {
    return {
      status: 'erro',
      mensagem: 'email inválido'
    }
  } 
  const query = `SELECT * FROM users where email = ?;`;
  const conn = await connect();
  try {
    const [listaUsuarios] = await connection.execute(query, [email]);
    console.log('total de linhas', listaUsuarios);
    return {
      status: 'sucesso',
      usuarios: listaUsuarios,
    }
  } catch (error) {
    console.log('Erro na pesquisa ao usuário');
    return {
      status: 'erro',
      mensagem: 'Erro na pesquisa ao usuário',
    }
  }
}

const cadastrarUsuario = async (email, senha) => {
  console.log(`Executando método cadatrar usuário ${email} e ${senha}`);
  const usuariosEncontrados = await pesquisarUsuario(email);
  console.log('resultado da consulta ao usuário', usuariosEncontrados);
  const { usuarios, status, mensagem } = usuariosEncontrados;
  if (status === "erro") {
    return {
      status: 'atenção',
      mensagem,
    }
  }
  if (usuarios && usuarios.length) {
    return {
      status: 'atenção',
      mensagem: `Já existe um usuário cadastrao com email ${usuarios[0].email}!`,
    }
  }
  try {
    const conn = await connect();
    bcrypt.hash(String(senha), 12, async (error, hash) => {
      console.log('resultado do hash ----->', hash);
      if (error) return;
      const query = `INSERT INTO users(email, senha) values (?, ?);`;
      const resultadoCadatramento = await conn.execute(query, [email, hash]);
    });
    return {
      status: 'sucesso',
      mensagem: `Usuário ${email} cadastrado com sucesso!!!`
    }
  } catch (error) {
    console.log('Erro ao cadastrar novo usuário', error.message);
    return {
      status: 'erro',
      mensagem: `Erro ao cadastrar usuário ${error.message}`
    }
  }
};

module.exports = {
  getProductById,
  getAllProducts,
  insertProduct,
  updateProductById,
  deleteProductById,
  cadastrarUsuario,
  pesquisarUsuario,
}
