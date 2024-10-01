/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa a biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client');

// Instância da classe PrismaClient
const prisma = new PrismaClient();

// Função para selecionar resposta de lacunas pelo ID
const selectRespostaVFByID = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_resposta_verdadeiro_falso WHERE id = ${id};`;
        let resultado = await prisma.$queryRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para selecionar todas as respostas de lacunas
const selectAllRespostasVF = async function() {
    try {
        let sql = `SELECT * FROM tbl_resposta_verdadeiro_falso;`;
        let resultado = await prisma.$queryRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para inserir nova resposta de lacunas
const insertRespostaVF = async function(dadosRespostaVF) {
    try {
        let sql = `INSERT INTO tbl_resposta_verdadeiro_falso (conteudo, autenticacao, questao_id) 
        VALUES ('${dadosRespostaVF.conteudo}', '${dadosRespostaVF.autenticacao}', ${dadosRespostaVF.questao_id});`;

        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};


// Função para atualizar resposta de lacunas
const updateRespostaVF = async function(id, dadosRespostaVF) {
    try {
        let sql = `UPDATE tbl_resposta_verdadeiro_falso
                   SET conteudo = '${dadosRespostaVF.conteudo}', 
                       autenticacao = '${dadosRespostaVF.autenticacao}', 
                       questao_id = '${dadosRespostaVF.questao_id}'
                   WHERE id = ${id};`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para deletar resposta de lacunas
const deleteRespostaVF = async function(id) {
    try {
        let sql = `DELETE FROM tbl_resposta_verdadeiro_falso WHERE id = ${id};`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Exporta as funções
module.exports = {
    selectAllRespostasVF,
    selectRespostaVFByID,
    insertRespostaVF,
    updateRespostaVF,
    deleteRespostaVF,
};
