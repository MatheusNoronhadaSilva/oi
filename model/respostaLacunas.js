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
const selectRespostaLacunaByID = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_resposta_lacunas WHERE id = ${id};`;
        let resultado = await prisma.$queryRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para selecionar todas as respostas de lacunas
const selectAllRespostasLacunas = async function() {
    try {
        let sql = `SELECT * FROM tbl_resposta_lacunas;`;
        let resultado = await prisma.$queryRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para inserir nova resposta de lacunas
const insertRespostaLacuna = async function(dadosResposta) {
    try {
        let sql = `INSERT INTO tbl_resposta_lacunas (posicao_inicial, posicao_fim, questao_id, palavra) 
                   VALUES (${dadosResposta.posicao_inicial}, ${dadosResposta.posicao_fim}, ${dadosResposta.questao_id}, '${dadosResposta.palavra}');`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para atualizar resposta de lacunas
const updateRespostaLacuna = async function(id, dadosResposta) {
    try {
        let sql = `UPDATE tbl_resposta_lacunas 
                   SET posicao_inicial = ${dadosResposta.posicao_inicial}, 
                       posicao_fim = ${dadosResposta.posicao_fim}, 
                       questao_id = ${dadosResposta.questao_id}, 
                       palavra = '${dadosResposta.palavra}' 
                   WHERE id = ${id};`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para deletar resposta de lacunas
const deleteRespostaLacuna = async function(id) {
    try {
        let sql = `DELETE FROM tbl_resposta_lacunas WHERE id = ${id};`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Exporta as funções
module.exports = {
    selectAllRespostasLacunas,
    selectRespostaLacunaByID,
    insertRespostaLacuna,
    updateRespostaLacuna,
    deleteRespostaLacuna,
};
