/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa a biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client');

// Instância da classe PrismaClient
const prisma = new PrismaClient();

// Função para selecionar ordem de palavra pelo ID
const selectOrdemPalavraByID = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_ordem_palavra WHERE id = ${id};`;
        let resultado = await prisma.$queryRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para selecionar todas as ordens de palavra
const selectAllOrdemPalavras = async function() {
    try {
        let sql = `SELECT * FROM tbl_ordem_palavra;`;
        let resultado = await prisma.$queryRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para inserir nova ordem de palavra
const insertOrdemPalavra = async function(dadosOrdemPalavra) {
    try {
        let sql = `INSERT INTO tbl_ordem_palavra (posicao, questao_id, conteudo) 
                   VALUES (${dadosOrdemPalavra.posicao}, ${dadosOrdemPalavra.questao_id}, '${dadosOrdemPalavra.conteudo}');`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para atualizar ordem de palavra
const updateOrdemPalavra = async function(id, dadosOrdemPalavra) {
    try {
        let sql = `UPDATE tbl_ordem_palavra 
                   SET posicao = ${dadosOrdemPalavra.posicao}, 
                       questao_id = ${dadosOrdemPalavra.questao_id}, 
                       conteudo = '${dadosOrdemPalavra.conteudo}' 
                   WHERE id = ${id};`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para deletar ordem de palavra
const deleteOrdemPalavra = async function(id) {
    try {
        let sql = `DELETE FROM tbl_ordem_palavra WHERE id = ${id};`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Exporta as funções
module.exports = {
    selectAllOrdemPalavras,
    selectOrdemPalavraByID,
    insertOrdemPalavra,
    updateOrdemPalavra,
    deleteOrdemPalavra,
};
