/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa as mensagens e o DAO
const message = require('./modulo/config.js');
const ordemPalavraDAO = require('../model/ordemPalavra.js');

// Função para listar todas as ordens de palavra
const getListarOrdemPalavras = async function() {
    try {
        let ordens = await ordemPalavraDAO.selectAllOrdemPalavras();
        if (ordens) {
            return { ordens, status_code: 200 };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para buscar ordem de palavra por ID
const getBuscarOrdemPalavraById = async function(id) {
    try {
        let dadosOrdemPalavra = await ordemPalavraDAO.selectOrdemPalavraByID(id);
        if (dadosOrdemPalavra) {
            return { ordem: dadosOrdemPalavra, status_code: 200 };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para inserir nova ordem de palavra
const setInserirNovaOrdemPalavra = async function(dadosOrdemPalavra, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let ordemJSON = {};

            // Validação de campos obrigatórios
            console.log(dadosOrdemPalavra);
            if (dadosOrdemPalavra.posicao === undefined || dadosOrdemPalavra.questao_id === undefined || dadosOrdemPalavra.conteudo === '') {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                let novaOrdem = await ordemPalavraDAO.insertOrdemPalavra(dadosOrdemPalavra);
                if (novaOrdem) {
                    ordemJSON.ordem = dadosOrdemPalavra;
                    ordemJSON.status = message.SUCCESS_CREATED_ITEM.status;
                    ordemJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                    ordemJSON.message = message.SUCCESS_CREATED_ITEM.message;
                    return ordemJSON; // 201
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB; // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};

// Função para atualizar ordem de palavra
const setAtualizarOrdemPalavra = async function(id, dadosOrdemPalavra, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let updatedOrdem = await ordemPalavraDAO.updateOrdemPalavra(id, dadosOrdemPalavra);
            if (updatedOrdem) {
                return { ordem: updatedOrdem, status: message.SUCCESS_UPDATED_ITEM.status, status_code: message.SUCCESS_UPDATED_ITEM.status_code };
            } else {
                return message.ERROR_INTERNAL_SERVER_DB;
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para excluir ordem de palavra
const setExcluirOrdemPalavra = async function(id) {
    try {
        let ordemDeletada = await ordemPalavraDAO.deleteOrdemPalavra(id);
        if (ordemDeletada) {
            return message.SUCCESS_DELETED_ITEM;
        } else {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Exporta as funções
module.exports = {
    getListarOrdemPalavras,
    getBuscarOrdemPalavraById,
    setInserirNovaOrdemPalavra,
    setAtualizarOrdemPalavra,
    setExcluirOrdemPalavra,
};
