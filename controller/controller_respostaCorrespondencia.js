/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa as mensagens e o DAO
const message = require('./modulo/config.js');
const respostaCorrespondenciaDAO = require('../model/respostaCorrespondencia.js');

// Função para listar todas as respostas de correspondência
const getListarRespostasCorrespondencia = async function() {
    try {
        let respostas = await respostaCorrespondenciaDAO.selectAllRespostasCorrespondencia();
        if (respostas) {
            return { respostas, status_code: 200 };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para buscar resposta de correspondência por ID
const getBuscarRespostaCorrespondenciaById = async function(id) {
    try {
        let dadosRespostaCorrespondencia = await respostaCorrespondenciaDAO.selectRespostaCorrespondenciaByID(id);
        if (dadosRespostaCorrespondencia) {
            return { resposta: dadosRespostaCorrespondencia, status_code: 200 };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para inserir nova resposta de correspondência
const setInserirNovaRespostaCorrespondencia = async function(dadosRespostaCorrespondencia, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (dadosRespostaCorrespondencia.palavra_correspondente === '' || dadosRespostaCorrespondencia.resposta_correspondente === '' || dadosRespostaCorrespondencia.questao_id === undefined) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                let novaResposta = await respostaCorrespondenciaDAO.insertRespostaCorrespondencia(dadosRespostaCorrespondencia);
                if (novaResposta) {
                    dadosRespostaCorrespondencia.id = novaResposta.insertId; // Ajuste se necessário
                    return { resposta: dadosRespostaCorrespondencia, status: message.SUCCESS_CREATED_ITEM.status, status_code: message.SUCCESS_CREATED_ITEM.status_code };
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

// Função para atualizar resposta de correspondência
const setAtualizarRespostaCorrespondencia = async function(id, dadosRespostaCorrespondencia, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let updatedResposta = await respostaCorrespondenciaDAO.updateRespostaCorrespondencia(id, dadosRespostaCorrespondencia);
            if (updatedResposta) {
                return { resposta: updatedResposta, status: message.SUCCESS_UPDATED_ITEM.status, status_code: message.SUCCESS_UPDATED_ITEM.status_code };
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

// Função para excluir resposta de correspondência
const setExcluirRespostaCorrespondencia = async function(id) {
    try {
        let respostaDeletada = await respostaCorrespondenciaDAO.deleteRespostaCorrespondencia(id);
        if (respostaDeletada) {
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
    getListarRespostasCorrespondencia,
    getBuscarRespostaCorrespondenciaById,
    setInserirNovaRespostaCorrespondencia,
    setAtualizarRespostaCorrespondencia,
    setExcluirRespostaCorrespondencia,
};
