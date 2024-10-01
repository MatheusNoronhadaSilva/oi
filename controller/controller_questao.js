/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa as mensagens e o DAO
const message = require('./modulo/config.js');
const questaoDAO = require('../model/questao.js');

// Função para listar todas as questões
const getListarQuestoes = async function() {
    try {
        let questoes = await questaoDAO.selectAllQuestoes();
        if (questoes) {
            return { questoes, status_code: 200 };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para listar todas as questões
const getListarTudoQuestao = async function() {
    try {
        let questoes = await questaoDAO.SelectGeralQuestao();
        if (questoes) {
            return { questoes, status_code: 200 };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para buscar questão por ID
const getBuscarQuestaoId = async function(id) {
    try {
        let dadosQuestao = await questaoDAO.selectQuestaoByID(id);
        if (dadosQuestao.length > 0) {
            return { questao: dadosQuestao, status_code: 200 };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para inserir nova questão
const setInserirNovaQuestao = async function(dadosQuestao, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let novaQuestao = await questaoDAO.insertQuestao(dadosQuestao);
            if (novaQuestao) {
                return { questao: dadosQuestao, status: message.SUCCESS_CREATED_ITEM.status, status_code: message.SUCCESS_CREATED_ITEM.status_code };
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

// Função para atualizar questão
const setAtualizarQuestao = async function(id, dadosQuestao, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let updatedQuestao = await questaoDAO.updateQuestao(id, dadosQuestao);
            if (updatedQuestao) {
                return { questao: dadosQuestao, status: message.SUCCESS_UPDATED_ITEM.status, status_code: message.SUCCESS_UPDATED_ITEM.status_code };
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

// Função para excluir questão
const setExcluirQuestao = async function(id) {
    try {
        let questaoDeletada = await questaoDAO.deleteQuestao(id);
        if (questaoDeletada) {
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
    getListarQuestoes,
    getBuscarQuestaoId,
    setInserirNovaQuestao,
    setAtualizarQuestao,
    setExcluirQuestao,
    getListarTudoQuestao
};
