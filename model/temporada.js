/*******************************************************
 * DATA: 01/10/2024
 * Autor: Ricardo
 * Versão: 1.0
*******************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Selecionar todas as temporadas
const selectTemporadas = async function () {
    try {
        return await prisma.$queryRaw`SELECT * FROM tbl_temporadas`;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Selecionar o último ID inserido
const lastIDTemporada = async function () {
    try {
        return await prisma.$queryRaw`SELECT id FROM tbl_temporadas ORDER BY id DESC LIMIT 1;`;
    } catch (error) {
        return false;
    }
};

// Inserir uma nova temporada
const insertTemporada = async function (dadosTemporada) {
    try {
        let sql = `INSERT INTO tbl_temporadas (data_inicio, data_fim) 
                   VALUES ('${dadosTemporada.data_inicio}', '${dadosTemporada.data_fim}');`;
        return await prisma.$executeRawUnsafe(sql);
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Atualizar uma temporada
const updateTemporada = async function (id, dadosTemporada) {
    try {
        let sql = `UPDATE tbl_temporadas SET data_inicio = '${dadosTemporada.data_inicio}', 
                                               data_fim = '${dadosTemporada.data_fim}' 
                   WHERE id = ${id};`;
        return await prisma.$executeRawUnsafe(sql);
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Deletar uma temporada
const deleteTemporada = async function (id) {
    try {
        let sql = `DELETE FROM tbl_temporadas WHERE id = ${id};`;
        return await prisma.$executeRawUnsafe(sql);
    } catch (error) {
        return false;
    }
};

// Selecionar uma temporada por ID
const selectByIdTemporada = async function (id) {
    try {
        return await prisma.$queryRaw`SELECT * FROM tbl_temporadas WHERE id = ${id};`;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    selectTemporadas,
    lastIDTemporada,
    insertTemporada,
    updateTemporada,
    deleteTemporada,
    selectByIdTemporada,
};
