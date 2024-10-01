/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa as mensagens e os DAOs
const message = require('./modulo/config.js');
const respostaDuvidaDAO = require('../model/respostaDuvida.js');

// Função para listar todas as respostas
const getListarRespostas = async function() {
    try {
        let respostaJSON = {};
        let dadosRespostas = await respostaDuvidaDAO.selectAllRespostas();

        if (dadosRespostas) {
            respostaJSON.respostas = dadosRespostas;
            respostaJSON.quantidade = dadosRespostas.length;
            respostaJSON.status_code = 200;
            return respostaJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para buscar resposta por ID
const getBuscarRespostaId = async function(id) {
    try {
        let respostaJSON = {};
        let dadosResposta = await respostaDuvidaDAO.selectRespostaByID(id);

        if (dadosResposta && dadosResposta.length > 0) {
            respostaJSON.resposta = dadosResposta[0];
            respostaJSON.status_code = 200;
            return respostaJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para inserir nova resposta
const setInserirNovaResposta = async function(dadosResposta, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let respostaJSON = {};

            if (!dadosResposta.conteudo || !dadosResposta.duvida_compartilhada_id || !dadosResposta.mentor_id) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                let novaResposta = await respostaDuvidaDAO.insertResposta(dadosResposta);
                if (novaResposta) {
                    respostaJSON.resposta = dadosResposta
                    respostaJSON.quantidade = dadosResposta.length
                    respostaJSON.status_code = 201;
                    respostaJSON.message = novaResposta.message;
                    return respostaJSON;
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

// Função para atualizar resposta
const setAtualizarResposta = async function(id, dadosResposta, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let updateRespostaJSON = {};

            let respostaAtualizada = await respostaDuvidaDAO.updateResposta(id, dadosResposta);
            if (respostaAtualizada) {
                updateRespostaJSON.status_code = 200;
                updateRespostaJSON.message = 'Resposta atualizada com sucesso';
                return updateRespostaJSON;
            } else {
                return message.ERROR_INTERNAL_SERVER_DB; // 500
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};

// Função para excluir resposta
const setExcluirResposta = async function(id) {
    try {
        let respostaDeletada = await respostaDuvidaDAO.deleteResposta(id);
        if (respostaDeletada) {
            return message.SUCCESS_DELETED_ITEM;
        } else {
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};

// Exporta as funções
module.exports = {
    getListarRespostas,
    getBuscarRespostaId,
    setInserirNovaResposta,
    setAtualizarResposta,
    setExcluirResposta
};
