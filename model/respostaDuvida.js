/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instancia da classe PrismaClient
const prisma = new PrismaClient()

const selectRespostaByID = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_resposta_duvida WHERE id_resposta_duvida = ${id};`;
        let rsResposta = await prisma.$queryRawUnsafe(sql);
        return rsResposta;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const selectAllRespostas = async function() {
    try {
        let sql = `SELECT * FROM tbl_resposta_duvida;`;
        let rsRespostas = await prisma.$queryRawUnsafe(sql);
        return rsRespostas;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const insertResposta = async function(dadosResposta) {
    try {
        let sql = `INSERT INTO tbl_resposta_duvida (conteudo, data_resposta, duvida_compartilhada_id, mentor_id) 
                   VALUES ('${dadosResposta.conteudo}', '${dadosResposta.data_resposta}', ${dadosResposta.duvida_compartilhada_id}, ${dadosResposta.mentor_id});`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result
    } catch (error) {
        console.log(error);
        return false;
    }
};

const updateResposta = async function(id, dadosResposta) {
    try {
        let sql = `
            UPDATE tbl_resposta_duvida
            SET 
                conteudo = '${dadosResposta.conteudo}',
                data_resposta = '${dadosResposta.data_resposta}',
                duvida_compartilhada_id = ${dadosResposta.duvida_compartilhada_id},
                mentor_id = ${dadosResposta.mentor_id}
            WHERE id_resposta_duvida = ${id};
        `;
        let result = await prisma.$executeRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const deleteResposta = async function(id) {
    try {
        let sql = `DELETE FROM tbl_resposta_duvida WHERE id_resposta_duvida = ${id};`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    selectAllRespostas,
    selectRespostaByID,
    insertResposta,
    updateResposta,
    deleteResposta
};
