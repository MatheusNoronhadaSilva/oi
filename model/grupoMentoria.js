/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.1
*******************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instacia da classe PrismaClient
const prisma = new PrismaClient()


// Função para selecionar um grupo de mentoria pelo ID
const selectGrupoMentoriaByID = async function(id) {
    try {
        // Realiza a busca do grupo de mentoria pelo ID
        let sql = `SELECT * FROM tbl_grupo_mentoria WHERE id = ${id}`;

        // Executa no banco de dados o script SQL
        let rsGrupoMentoria = await prisma.$queryRawUnsafe(sql);

        return rsGrupoMentoria;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Função para selecionar todos os grupos de mentoria
const selectAllGruposMentoria = async function() {
    try {
        // Realiza a busca de todos os grupos de mentoria
        let sql = `SELECT * FROM tbl_grupo_mentoria`;

        // Executa no banco de dados o script SQL
        let rsGruposMentoria = await prisma.$queryRawUnsafe(sql);

        return rsGruposMentoria;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Função para inserir um novo grupo de mentoria
const insertGrupoMentoria = async function(dadosGrupoMentoria) {
    try {
        let sql = `INSERT INTO tbl_grupo_mentoria (
                        nome,
                        capacidade,
                        descricao,
                        foto_perfil,
                        serie_min,
                        serie_max,
                        chat_aberto,
                        data_criacao,
                        mentor_id
                    ) 
                    VALUES (
                        '${dadosGrupoMentoria.nome}',
                        ${dadosGrupoMentoria.capacidade},
                        '${dadosGrupoMentoria.descricao}',
                        '${dadosGrupoMentoria.foto_perfil}',
                        ${dadosGrupoMentoria.serie_min},
                        ${dadosGrupoMentoria.serie_max},
                        ${dadosGrupoMentoria.chat_aberto},
                        '${dadosGrupoMentoria.data_criacao}',
                        ${dadosGrupoMentoria.mentor_id}
                    )`;

        // Executa o SQL para inserir o grupo de mentoria
        let result = await prisma.$executeRawUnsafe(sql);

        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Função para atualizar um grupo de mentoria existente
const updateGrupoMentoria = async function(id, dadosGrupoMentoria) {
    try {
        let sql = `UPDATE tbl_grupo_mentoria
                    SET 
                        nome = '${dadosGrupoMentoria.nome}',
                        capacidade = ${dadosGrupoMentoria.capacidade},
                        descricao = '${dadosGrupoMentoria.descricao}',
                        foto_perfil = '${dadosGrupoMentoria.foto_perfil}',
                        serie_min = ${dadosGrupoMentoria.serie_min},
                        serie_max = ${dadosGrupoMentoria.serie_max},
                        chat_aberto = ${dadosGrupoMentoria.chat_aberto},
                        data_criacao = '${dadosGrupoMentoria.data_criacao}',
                        mentor_id = ${dadosGrupoMentoria.mentor_id}
                    WHERE id = ${id}`;

        // Executa o SQL para atualizar o grupo de mentoria
        let result = await prisma.$executeRawUnsafe(sql);

        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Função para deletar um grupo de mentoria pelo ID
const deleteGrupoMentoria = async function(id) {
    try {
        let sql = `DELETE FROM tbl_grupo_mentoria WHERE id = ${id}`;

        // Executa o SQL para deletar o grupo de mentoria
        let result = await prisma.$executeRawUnsafe(sql);

        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const lastIDGrupoMentoria = async function(){
    try {
        let sql = `SELECT id FROM tbl_grupo_mentoria ORDER BY id DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

// Exporta as funções
module.exports = {
    selectGrupoMentoriaByID,
    selectAllGruposMentoria,
    insertGrupoMentoria,
    updateGrupoMentoria,
    deleteGrupoMentoria,
    lastIDGrupoMentoria
}
