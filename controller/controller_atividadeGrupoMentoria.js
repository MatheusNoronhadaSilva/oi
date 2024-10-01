/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa as mensagens e o DAO
const message = require('./modulo/config.js');
const atividadeDAO = require('../model/atividadeGrupoMentoria.js');

// Função para listar todas as atividades
const getListarAtividades = async function() {
    try {
        let atividades = await atividadeDAO.selectAllAtividades();
        if (atividades) {
            return { atividades, status_code: 200 };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};


// Função para buscar atividade por ID
const getBuscarAtividadeById = async function(id) {
    try {
        let dadosAtividade = await atividadeDAO.selectAtividadeByID(id);
        if (dadosAtividade) {
            return { atividade: dadosAtividade, status_code: 200 };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};


// Função para inserir nova atividade
const setInserirNovaAtividade = async function(dadosAtividade, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let atividadeJSON = {};

            console.log(dadosAtividade);
            // Validação de campos obrigatórios ou com digitação inválida
            if (dadosAtividade.nome === '' || dadosAtividade.nome === undefined || dadosAtividade.nome === null || dadosAtividade.nome.length > 255 ||
                dadosAtividade.descricao === '' || dadosAtividade.descricao === undefined || dadosAtividade.descricao === null ||
                dadosAtividade.grupo_mentoria_id === '' || dadosAtividade.grupo_mentoria_id === undefined || dadosAtividade.grupo_mentoria_id === null
            ) {
                return message.ERROR_REQUIRED_FIELDS;

            } else {
                let novaAtividade = await atividadeDAO.insertAtividade(dadosAtividade);
                
                if (novaAtividade) {
                    let lastId = await atividadeDAO.lastIDAtividadeGrupoMentoria(); // Assumindo que você tenha uma função para pegar o último ID
                    dadosAtividade.id = lastId[0].id; // Atualizando o ID no objeto de atividade

                    atividadeJSON.atividade = dadosAtividade;
                    atividadeJSON.status = message.SUCCESS_CREATED_ITEM.status;
                    atividadeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                    atividadeJSON.message = message.SUCCESS_CREATED_ITEM.message;

                    return atividadeJSON; // 201
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


// Função para atualizar atividade
const setAtualizarAtividade = async function(id, dadosAtividade, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let updatedAtividade = await atividadeDAO.updateAtividade(id, dadosAtividade);
            if (updatedAtividade) {
                return { atividade: updatedAtividade, status: message.SUCCESS_UPDATED_ITEM.status, status_code: message.SUCCESS_UPDATED_ITEM.status_code };
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

// Função para excluir atividade
const setExcluirAtividade = async function(id) {
    try {
        let atividadeDeletada = await atividadeDAO.deleteAtividade(id);
        if (atividadeDeletada) {
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
    getListarAtividades,
    getBuscarAtividadeById,
    setInserirNovaAtividade,
    setAtualizarAtividade,
    setExcluirAtividade,
};
