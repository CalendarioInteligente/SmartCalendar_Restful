const sql = require('mssql')
const config = require('./dbconfig')
const fs = require('fs')

global.connection = null

// Create user session
async function insertSession(model) {
    const pool = await getConnection();

    if (!pool) {
        return undefined;
    }

    const query = 'INSERT INTO CALENDARIO.Session(sessionId, userId) values(@p1, @p2)'
    const params = {
        p1: model.sessionId,
        p2: model.userId
    }

    let results;
    try {
        results = await pool.request().input('p1', sql.Binary, params.p1)
                                      .input('p2', sql.Int, params.p2)
                                      .query(query)
    } catch(e) {
        console.error(e);
        return false;
    }

    return results.rowsAffected;
}

async function removeSession(model) {
    const pool = await getConnection();

    if (!pool) {
        return undefined;
    }

    const query = 'DELETE FROM CALENDARIO.Session WHERE userId = @userId'
    const params = {
        userId: model.userId
    }

    let results;
    try {
        results = await pool.request().input('userId', sql.Int, params.userId)
                                      .query(query)
    } catch {
        return false;
    }

    return results.rowsAffected;
}

// Select
async function querySession(model) {
    const pool = await getConnection();

    if (!pool) {
        return undefined;
    }

    const query = 'SELECT TOP(1) * FROM CALENDARIO.Session WHERE sessionId = @sessionId'
    const params = {
        sessionId: model.sessionId
    }

    let results;
    try {
        results = await pool.request().input('sessionId', sql.Binary, params.sessionId)
                                      .query(query)
    } catch {
        return false;
    }

    return results.recordset[0];
}

async function queryNotificacao(model) {
    const pool = await getConnection();

    if (!pool) {
        return undefined;
    }

    const query = 'SELECT TOP(1) * FROM CALENDARIO.Session WHERE idEvento = @idEvento'
    const params = {
        idEvento: model.idEvento
    }

    let results;
    try {
        results = await pool.request().input('idEvento', sql.Int, params.idEvento)
                                      .query(query)
    } catch {
        return false;
    }

    return results.recordset[0];
}

async function queryUsuarioByEmail(model) {
    const pool = await getConnection();

    if (!pool) {
        return undefined;
    }

    const query = 'SELECT TOP(1) * FROM CALENDARIO.Usuario WHERE email = @email'
    const params = {
        email: model.email
    }

    let results;
    try {
        results = await pool.request().input('email', sql.VarChar, params.email)
                                      .query(query)
    } catch {
        return false;
    }

    return results.recordset[0];
}

async function queryEvento(model) {
    const pool = await getConnection();

    if (!pool) {
        return undefined;
    }

    const query = 'SELECT TOP(1) * FROM CALENDARIO.Evento WHERE id = @id'
    const params = {
        id: model.id
    }

    let results;
    try {
        results = await pool.request().input('id', sql.Int, params.id)
                                      .query(query)
    } catch {
        return false;
    }

    return results.recordset[0];
}

async function queryAllEventos(model) {
    const pool = await getConnection();

    if (!pool) {
        return undefined;
    }

    const query = 'SELECT * FROM CALENDARIO.Evento WHERE idUsuario = @idUsuario'
    const params = {
        idUsuario: model.id
    }

    let results;
    try {
        results = await pool.request().input('idUsuario', sql.Int, params.idUsuario)
                                      .query(query)
    } catch {
        return false;
    }

    return results.recordset;
}

// Delete
async function deleteEvento(model) {
    const pool = await getConnection();

    if (!pool) {
        return undefined;
    }

    const query = 'DELETE FROM CALENDARIO.Evento WHERE id = @id'
    const params = {
        id: model.id
    }

    let results;
    try {
        results = await pool.request().input('id', sql.Int, params.id)
                                      .query(query)
    } catch {
        return false;
    }

    return results.rowsAffected;
}

async function updateEvento(model) {
    const pool = await getConnection();

    if (!pool) {
        return undefined;
    }
    /* *UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;*/

    const query = "UPDATE CALENDARIO.Evento SET descricao = @p1, titulo = @p2, data = @p3 WHERE Evento.id = @p4;"
    
    const params = {
        p1: model.descricao,
        p2: model.titulo,
        p3: model.data,
        p4: model.id
    }

    let results;
    try {
        results = await pool.request().input('p1', sql.VarChar, params.p1)
                                .input('p2', sql.VarChar, params.p2)
                                .input('p3', sql.DateTime, params.p3)
                                .input('p4', sql.Int, params.p4)
                                .query(query)
    } catch(e) {
        console.log(e);
        return false;
    }

    return results.rowsAffected;
}

// Inserts
async function insertUsuario(model) {
    const pool = await getConnection();

    if (!pool) {
        return undefined;
    }

    const query = 'INSERT INTO CALENDARIO.Usuario(nome, sobrenome, email, telefone, senha) values(@p1, @p2, @p3, @p4, @p5)'
    const params = {
        p1: model.nome,
        p2: model.sobrenome,
        p3: model.email,
        p4: model.telefone,
        p5: model.senha
    }

    let results;
    try {
        results = await pool.request().input('p1', sql.VarChar, params.p1)
                                .input('p2', sql.VarChar, params.p2)
                                .input('p3', sql.VarChar, params.p3)
                                .input('p4', sql.VarChar, params.p4)
                                .input('p5', sql.Char, params.p5)
                                .query(query)
    } catch(e) {
        return false;
    }

    return results.rowsAffected;
}

async function insertEvento(model) {
    const pool = await getConnection();

    if (!pool) {
        return undefined;
    }

    const query = 'INSERT INTO CALENDARIO.Evento(descricao, titulo, idUsuario, data) values(@p1, @p2, @p3, @p4)'
    const params = {
        p1: model.descricao,
        p2: model.titulo,
        p3: model.idUsuario,
        p4: model.data
    }

    let results;
    try {
        results = await pool.request().input('p1', sql.VarChar, params.p1)
                                .input('p2', sql.VarChar, params.p2)
                                .input('p3', sql.Int, params.p3)
                                .input('p4', sql.DateTime, params.p4)
                                .query(query)
    } catch(e) {
        console.log(e);
        return false;
    }

    return results.rowsAffected;
}

// Funções Gerais
async function getConnection() {
    // Verifica se já esta conectado
    if (global.connection && global.connection.connected) {
        return global.connection;
    }

    // Tenta se conectar
    const pool = new sql.ConnectionPool(config).connect()
    .then(pool => {
        console.log("Conectado ao SQL Server")
        global.connection = pool;
        return pool;
    })
    .catch(err => console.error('Falha ao se conectar com o banco de dados. Verifique se as variáveis de ambientes estão corretas.'));

    if (!pool) {
        return null;
    }

    return pool;
}

async function createDatabase() {
    // Conecta ao banco de dados
    const pool = await getConnection();

    if (!pool) {
        return undefined;
    }
    
    // CASO HOUVER ERROS QUER DIZER QUE JA EXISTE NO BANCO DE DADOS
    // CRIA ESQUEMA
    try {
        if (await pool.request().query("CREATE SCHEMA CALENDARIO")) {
            console.log("CREATED SCHEMA 'CALENDARIO'");
        };
    } catch {}

    // EXECUTA OS ARQUIVOS SQL
    // CRIA TABELAS
    let text;
    try {
        text = fs.readFileSync("../sql_query/tables.sql", "utf-8");
    } catch(e) {
        console.error("Não foi possivel encontrar o arquivo 'tables.sql'")
    }

    if (text) {
        try {
            if (await pool.request().batch(text)) {
                console.log("Tabelas criadas com sucesso!");
            }
        } catch {}
    }

    // CRIA TRIGGERS
    try {
        text = fs.readFileSync("../sql_query/triggers.sql", "utf-8");
    } catch(e) {
        console.error("Não foi possivel encontrar o arquivo 'triggers.sql'")
    }

    if (text) {
        try {
            if (await pool.request().batch(text)) {
                console.log("Triggers criados com sucesso!");
            }
        } catch {}
    }

    // CRIA PROCEDURES
    try {
        text = fs.readFileSync("../sql_query/procedures.sql", "utf-8");
    } catch(e) {
        console.error("Não foi possivel encontrar o arquivo 'procedures.sql'")
    }

    if (text) {
        try {
            if (await pool.request().batch(text)) {
                console.log("Procedures criados com sucesso!");
            }
        } catch {}
    }

    // CRIA VIEWS
    try {
        text = fs.readFileSync("../sql_query/views.sql", "utf-8");
    } catch(e) {
        console.error("Não foi possivel encontrar o arquivo 'views.sql'")
    }

    if (text) {
        try {
            if (await pool.request().batch(text)) {
                console.log("Views criadas com sucesso!");
            }
        } catch {}
    }

    return true;
}

module.exports = {
    updateEvento, 
    getConnection, 
    createDatabase, 
    insertUsuario, 
    queryNotificacao,
    insertSession, queryUsuarioByEmail, querySession, insertEvento, queryEvento, deleteEvento, removeSession, queryAllEventos}