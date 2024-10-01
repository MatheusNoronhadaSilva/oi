/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa as mensagens e o DAO
const message = require('./modulo/config.js');
const respostaVFDAO = require('../model/respostasVF.js');

// Função para listar todas as respostas de lacunas
const getListarRespostasVF = async function() {
    try {
        let respostas = await respostaVFDAO.selectAllRespostasVF();
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
const getBuscarRespostaVFById = async function(id) {
    try {
        let dadosRespostaVF = await respostaVFDAO.selectRespostaVFByID(id);
        if (dadosRespostaVF) {
            return { resposta: dadosRespostaVF, status_code: 200 };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para inserir nova resposta de lacunas
const setInserirNovaRespostaVF = async function(dadosRespostaVF, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (dadosRespostaVF.conteudo === undefined || dadosRespostaVF.autenticacao === undefined || dadosRespostaVF.questao_id === undefined ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                let novaResposta = await respostaVFDAO.insertRespostaVF(dadosRespostaVF);
                if (novaResposta) {
                    dadosRespostaVF.id = novaResposta.insertId; // Ajuste se necessário
                    return { resposta: dadosRespostaVF, status: message.SUCCESS_CREATED_ITEM.status, status_code: message.SUCCESS_CREATED_ITEM.status_code };
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
const setAtualizarRespostaVF = async function(id, dadosRespostaVF, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let updatedResposta = await respostaVFDAO.updateRespostaVF(id, dadosRespostaVF);
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
const setExcluirRespostaVF = async function(id) {
    try {
        let respostaDeletada = await respostaVFDAO.deleteRespostaVF(id);
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
    getListarRespostasVF,
    getBuscarRespostaVFById ,
    setInserirNovaRespostaVF,
    setAtualizarRespostaVF,
    setExcluirRespostaVF
};
