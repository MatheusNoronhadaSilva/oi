/*******************************************************
 * DATA: 01/10/2024
 * Autor: Ricardo
 * Versão: 1.0
*******************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Selecionar todas as salas
const selectSalas = async function () {
    try {
        let sql = `SELECT * FROM tbl_salas`;
        let rsSalas = await prisma.$queryRawUnsafe(sql);
        return rsSalas;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Selecionar o último ID inserido
const lastIDSala = async function () {
    try {
        let sql = `SELECT id FROM tbl_salas ORDER BY id DESC LIMIT 1;`;
        let sqlID = await prisma.$queryRawUnsafe(sql);
        return sqlID;
    } catch (error) {
        return false;
    }
};

// Inserir uma nova sala
const insertSala = async function (dadosSala) {
    try {
        let sql = `INSERT INTO tbl_salas (id_rank, numero, max_pessoas, pessoas_atual) 
                   VALUES (  '${dadosSala.id_rank}', '${dadosSala.numero}', '${dadosSala.max_pessoas}', '${dadosSala.pessoas_atual}'  );`;
        let rsInsert = await prisma.$executeRawUnsafe(sql);
        return rsInsert;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Atualizar uma sala
const updateSala = async function (id, dadosSala) {
    try {
        let sql = `UPDATE tbl_salas SET id_rank = '${dadosSala.id_rank}', 
                                        numero = '${dadosSala.numero}', 
                                        max_pessoas = '${dadosSala.max_pessoas}', 
                                        pessoas_atual = '${dadosSala.pessoas_atual}'
                   WHERE id = ${id};`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Deletar uma sala
const deleteSala = async function (id) {
    try {
        let sql = `DELETE FROM tbl_salas WHERE id = ${id};`;
        let rsDelete = await prisma.$executeRawUnsafe(sql);
        return rsDelete;
    } catch (error) {
        return false;
    }
};

// Selecionar uma sala por ID
const selectByIdSala = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_salas WHERE id = ${id};`;
        let rsSala = await prisma.$queryRawUnsafe(sql);
        return rsSala;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    selectSalas,
    lastIDSala,
    insertSala,
    updateSala,
    deleteSala,
    selectByIdSala
};
