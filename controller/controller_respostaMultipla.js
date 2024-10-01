/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa as mensagens e o DAO
const message = require('./modulo/config.js');
const respostaMultiplasDAO = require('../model/respostaMultipla.js');

// Função para listar todas as respostas de lacunas
const getListarRespostasMultiplas = async function() {
    try {
        let respostas = await respostaMultiplasDAO.selectAllRespostasMultiplas();
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

// Função para buscar resposta de lacuna por ID
const getBuscarRespostaMultiplasById = async function(id) {
    try {
        let dadosRespostaMultipla = await respostaMultiplasDAO.selectRespostaMultiplaByID(id);
        if (dadosRespostaMultipla) {
            return { resposta: dadosRespostaMultipla, status_code: 200 };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para inserir nova resposta de lacunas
const setInserirNovaRespostaMultipla = async function(dadosRespostaMultipla, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (dadosRespostaMultipla.conteudo === undefined || dadosRespostaMultipla.autenticacao === undefined || dadosRespostaMultipla.questao_id === undefined ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                let novaResposta = await respostaMultiplasDAO.insertRespostaMultipla(dadosRespostaMultipla);
                if (novaResposta) {
                    dadosRespostaMultipla.id = novaResposta.insertId; // Ajuste se necessário
                    return { resposta: dadosRespostaMultipla, status: message.SUCCESS_CREATED_ITEM.status, status_code: message.SUCCESS_CREATED_ITEM.status_code };
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

// Função para atualizar resposta de lacunas
const setAtualizarRespostaMultipla = async function(id, dadosRespostaMultipla, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let updatedResposta = await respostaMultiplasDAO.updateRespostaMultipla(id, dadosRespostaMultipla);
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

// Função para excluir resposta de lacunas
const setExcluirRespostaMultipla = async function(id) {
    try {
        let respostaDeletada = await respostaMultiplasDAO.deleteRespostaMultipla(id);
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
    getListarRespostasMultiplas,
    getBuscarRespostaMultiplasById,
    setInserirNovaRespostaMultipla,
    setAtualizarRespostaMultipla,
    setExcluirRespostaMultipla,
};
