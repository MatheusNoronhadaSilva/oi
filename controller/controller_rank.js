/*******************************************************
 * DATA: 01/10/2024
 * Autor: Adaptado
 * Versão: 1.0
*******************************************************/

const message = require('./modulo/config.js');
const rankDAO = require('../model/rank.js');

// Função para retornar todas as salas
const getRank = async function () {
    try {
        let rankJSON = {};
        let dadosRank = await rankDAO.selectRank();
        
        if (dadosRank) {
            rankJSON.salas = dadosRank;
            rankJSON.quantidade = dadosRank.length;
            rankJSON.status_code = 200;
            return rankJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para buscar uma sala por ID
const getBuscarRankId = async function (id) {
    try {
        let idRank = id;
        if (!idRank || isNaN(idRank)) return message.ERROR_INVALID_ID;

        let dadosRank = await rankDAO.selectByIdRank(idRank);
        if (dadosRank) {
            if (dadosRank.length > 0) {
                return { sala: dadosRank, status_code: 200 };
            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para inserir uma nova sala
const setInserirNovoRank = async function (dadosRank, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }

        // Valida campos obrigatórios
        const validationError = validateRank(dadosRank);
        if (validationError) {
            return validationError;
        }
        // Inserir sala no banco de dados
        const novoRank= await rankDAO.insertRanks(dadosRank);
        if (novoRank) {
            const ultimoId = await rankDAO.lastIDRank();
            dadosRank.id = ultimoId[0].id;

            return {
                rank: dadosRank,
                status_code: message.SUCCESS_CREATED_ITEM.status_code,
                message: message.SUCCESS_CREATED_ITEM.message
            };
        } else {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para atualizar uma sala
const setAtualizarRank = async function (id, dadosRank, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let idRank = id;
            if (!idRank || isNaN(idRank)) return message.ERROR_INVALID_ID;

            let rank = await rankDAO.selectByIdRank(idRank);
            if (rank) {
                let rankAtualizado = await rankDAO.updateRank(idRank, dadosRank);
                if (rankAtualizado) {
                    return {
                        rank: dadosRank,
                        status_code: message.SUCCESS_UPDATED_ITEM.status_code,
                        message: message.SUCCESS_UPDATED_ITEM.message
                    };
                } else {
                    return message.ERROR_NOT_FOUND;
                }
            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para deletar uma sala
const setExcluirRank = async function (id) {
    try {
        let idRank = id;
        if (!idRank || isNaN(idRank)) return message.ERROR_INVALID_ID;

        let comando = await rankDAO.deleteRank(idRank);
        if (comando) {
            return message.SUCCESS_DELETED_ITEM;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para validar os campos obrigatórios
function validateRank(dadosRank) {

    console.log(dadosRank);

    if (!dadosRank.nome) {
        return message.ERROR_REQUIRED_FIELDS;
    }
    if (!dadosRank.nivel || isNaN(dadosRank.nivel)) {
        return message.ERROR_REQUIRED_FIELDS;
    }
    if (dadosRank.num_salas && (isNaN(dadosRank.num_salas) || dadosRank.num_salas <= 0)) {
        return message.ERROR_REQUIRED_FIELDS;
    }
    return null;
}

module.exports = {
    getRank,
    getBuscarRankId,
    setInserirNovoRank,
    setAtualizarRank,
    setExcluirRank
};
