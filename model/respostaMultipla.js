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
const selectRespostaMultiplaByID = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_resposta_multipla_escolha WHERE id = ${id};`;
        let resultado = await prisma.$queryRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para selecionar todas as respostas de lacunas
const selectAllRespostasMultiplas = async function() {
    try {
        let sql = `SELECT * FROM tbl_resposta_multipla_escolha;`;
        let resultado = await prisma.$queryRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para inserir nova resposta de lacunas
const insertRespostaMultipla = async function(dadosRespostaMultipla) {
    try {
        let sql = `INSERT INTO tbl_resposta_multipla_escolha (conteudo, autenticacao, questao_id) 
        VALUES ('${dadosRespostaMultipla.conteudo}', '${dadosRespostaMultipla.autenticacao}', ${dadosRespostaMultipla.questao_id});`;

        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};


// Função para atualizar resposta de lacunas
const updateRespostaMultipla = async function(id, dadosRespostaMultipla) {
    try {
        let sql = `UPDATE tbl_resposta_multipla_escolha
                   SET conteudo = '${dadosRespostaMultipla.conteudo}', 
                       autenticacao = '${dadosRespostaMultipla.autenticacao}', 
                       questao_id = '${dadosRespostaMultipla.questao_id}'
                   WHERE id = ${id};`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para deletar resposta de lacunas
const deleteRespostaMultipla = async function(id) {
    try {
        let sql = `DELETE FROM tbl_resposta_multipla_escolha WHERE id = ${id};`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Exporta as funções
module.exports = {
    selectAllRespostasMultiplas,
    selectRespostaMultiplaByID,
    insertRespostaMultipla,
    updateRespostaMultipla,
    deleteRespostaMultipla,
};
