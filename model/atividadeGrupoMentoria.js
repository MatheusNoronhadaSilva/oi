/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa a biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client');

// Instância da classe PrismaClient
const prisma = new PrismaClient();

// Função para selecionar atividade pelo ID
const selectAtividadeByID = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_atividade_grupo_mentoria WHERE id = ${id};`;
        let resultado = await prisma.$queryRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para selecionar todas as atividades
const selectAllAtividades = async function() {
    try {
        let sql = `SELECT * FROM tbl_atividade_grupo_mentoria;`;
        let resultado = await prisma.$queryRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para inserir nova atividade
const insertAtividade = async function(dadosAtividade) {
    try {
        let sql = `INSERT INTO tbl_atividade_grupo_mentoria (nome, descricao, grupo_mentoria_id) 
                   VALUES ('${dadosAtividade.nome}', '${dadosAtividade.descricao}', ${dadosAtividade.grupo_mentoria_id});`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const lastIDAtividadeGrupoMentoria = async function(){
    try {
        let sql = `SELECT id FROM tbl_atividade_grupo_mentoria ORDER BY id DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

// Função para atualizar atividade
const updateAtividade = async function(id, dadosAtividade) {
    try {
        let sql = `UPDATE tbl_atividade_grupo_mentoria 
                   SET nome = '${dadosAtividade.nome}', 
                       descricao = '${dadosAtividade.descricao}', 
                       grupo_mentoria_id = ${dadosAtividade.grupo_mentoria_id} 
                   WHERE id = ${id};`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para deletar atividade
const deleteAtividade = async function(id) {
    try {
        let sql = `DELETE FROM tbl_atividade_grupo_mentoria WHERE id = ${id};`;
        console.log(sql);
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log('oi', error);
        return false;
    }
};

module.exports = {
    selectAllAtividades,
    selectAtividadeByID,
    insertAtividade,
    updateAtividade,
    deleteAtividade,
    lastIDAtividadeGrupoMentoria
};
