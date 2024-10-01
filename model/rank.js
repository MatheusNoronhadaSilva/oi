/*******************************************************
 * DATA: 01/10/2024
 * Autor: ricardo
 * Versão: 1.0
*******************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Selecionar todas as salas
const selectRank = async function () {
    try {
        let sql = `SELECT * FROM tbl_ranks`;
        let rsRanks = await prisma.$queryRawUnsafe(sql);
        return rsRanks;
    } catch (error) {
        console.log(error);
        return false;
    }
};


// Selecionar o último ID inserido
const lastIDRank = async function () {
    try {
        let sql = `SELECT id FROM tbl_ranks ORDER BY id DESC LIMIT 1;`;
        let sqlID = await prisma.$queryRawUnsafe(sql);
        return sqlID;
    } catch (error) {
        return false;
    }
};

// Inserir uma nova sala
const insertRanks = async function (dadosRank) {
    try {
        let sql = `INSERT INTO tbl_ranks (nome, nivel , num_salas) 
                   VALUES (  '${dadosRank.nome}', '${dadosRank.nivel}', '${dadosRank.num_salas}');`;
        let rsInsert = await prisma.$executeRawUnsafe(sql);
        return rsInsert;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Atualizar uma sala
const updateRank = async function (id, dadosRank) {
    try {
        let sql = `UPDATE tbl_ranks SET nome = '${dadosRank.nome}', 
                                        nivel = '${dadosRank.nivel}', 
                                        num_salas = '${dadosRank.num_salas}'
                   WHERE id = ${id};`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Deletar uma sala
const deleteRank = async function (id) {
    try {
        let sql = `DELETE FROM tbl_ranks WHERE id = ${id};`;
        let rsDelete = await prisma.$executeRawUnsafe(sql);
        return rsDelete;
    } catch (error) {
        return false;
    }
};

// Selecionar uma sala por ID
const selectByIdRank = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_ranks WHERE id = ${id};`;
        let rsRanks = await prisma.$queryRawUnsafe(sql);
        return rsRanks;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    selectRank,
    lastIDRank,
    insertRanks,
    updateRank,
    deleteRank,
    selectByIdRank
};
