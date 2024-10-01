/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa a biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client');

// Instância da classe PrismaClient
const prisma = new PrismaClient();

// Função para selecionar resposta de correspondência pelo ID
const selectRespostaCorrespondenciaByID = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_resposta_correspondencia WHERE id = ${id};`;
        let resultado = await prisma.$queryRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para selecionar todas as respostas de correspondência
const selectAllRespostasCorrespondencia = async function() {
    try {
        let sql = `SELECT * FROM tbl_resposta_correspondencia;`;
        let resultado = await prisma.$queryRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para inserir nova resposta de correspondência
const insertRespostaCorrespondencia = async function(dadosResposta) {
    try {
        let sql = `INSERT INTO tbl_resposta_correspondencia (palavra_correspondente, resposta_correspondente, questao_id) 
                   VALUES ('${dadosResposta.palavra_correspondente}', '${dadosResposta.resposta_correspondente}', ${dadosResposta.questao_id});`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para atualizar resposta de correspondência
const updateRespostaCorrespondencia = async function(id, dadosResposta) {
    try {
        let sql = `UPDATE tbl_resposta_correspondencia 
                   SET palavra_correspondente = '${dadosResposta.palavra_correspondente}', 
                       resposta_correspondente = '${dadosResposta.resposta_correspondente}', 
                       questao_id = ${dadosResposta.questao_id} 
                   WHERE id = ${id};`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para deletar resposta de correspondência
const deleteRespostaCorrespondencia = async function(id) {
    try {
        let sql = `DELETE FROM tbl_resposta_correspondencia WHERE id = ${id};`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Exporta as funções
module.exports = {
    selectAllRespostasCorrespondencia,
    selectRespostaCorrespondenciaByID,
    insertRespostaCorrespondencia,
    updateRespostaCorrespondencia,
    deleteRespostaCorrespondencia,
};
