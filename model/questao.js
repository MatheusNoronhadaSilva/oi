/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa a biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client');

// Instância da classe PrismaClient
const prisma = new PrismaClient();

// Função para selecionar questão pelo ID
const selectQuestaoByID = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_questao WHERE id = ${id};`;
        let resultado = await prisma.$queryRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para selecionar todas as questões
const selectAllQuestoes = async function() {
    try {
        let sql = `SELECT * FROM tbl_questao;`;
        let resultado = await prisma.$queryRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para inserir nova questão
const insertQuestao = async function(dadosQuestao) {
    try {
        let sql = `INSERT INTO tbl_questao (enunciado, tipo_questao_id, imagem, atividade_grupo_mentoria_id) 
                   VALUES ('${dadosQuestao.enunciado}', ${dadosQuestao.tipo_questao_id}, 
                           '${dadosQuestao.imagem}', ${dadosQuestao.atividade_grupo_mentoria_id});`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para atualizar questão
const updateQuestao = async function(id, dadosQuestao) {
    try {
        let sql = `UPDATE tbl_questao 
                   SET enunciado = '${dadosQuestao.enunciado}', 
                       tipo_questao_id = ${dadosQuestao.tipo_questao_id}, 
                       imagem = '${dadosQuestao.imagem}', 
                       atividade_grupo_mentoria_id = ${dadosQuestao.atividade_grupo_mentoria_id} 
                   WHERE id = ${id};`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Função para deletar questão
const deleteQuestao = async function(id) {
    try {
        let sql = `DELETE FROM tbl_questao WHERE id = ${id};`;
        let resultado = await prisma.$executeRawUnsafe(sql);
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const SelectGeralQuestao = async function () {
   
    try {
        let sql = `SELECT 
    q.id AS questao_id,
    q.enunciado,
    q.tipo_questao_id,
    q.imagem,
    q.atividade_grupo_mentoria_id,
    agm.id AS atividade_id,
    agm.nome AS atividade_nome, 
    agm.descricao AS atividade_descricao 
FROM 
    tbl_questao q
JOIN 
    tbl_atividade_grupo_mentoria agm ON q.atividade_grupo_mentoria_id = agm.id;;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllQuestoes,
    selectQuestaoByID,
    insertQuestao,
    updateQuestao,
    deleteQuestao,
    SelectGeralQuestao
};
