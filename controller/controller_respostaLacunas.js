/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa as mensagens e o DAO
const message = require('./modulo/config.js');
const respostaLacunasDAO = require('../model/respostaLacunas.js');

// Função para listar todas as respostas de lacunas
const getListarRespostasLacunas = async function() {
    try {
        let respostas = await respostaLacunasDAO.selectAllRespostasLacunas();
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
const getBuscarRespostaLacunaById = async function(id) {
    try {
        let dadosRespostaLacuna = await respostaLacunasDAO.selectRespostaLacunaByID(id);
        if (dadosRespostaLacuna) {
            return { resposta: dadosRespostaLacuna, status_code: 200 };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para inserir nova resposta de lacunas
const setInserirNovaRespostaLacuna = async function(dadosRespostaLacuna, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (dadosRespostaLacuna.posicao_inicial === undefined || dadosRespostaLacuna.posicao_fim === undefined || dadosRespostaLacuna.questao_id === undefined || dadosRespostaLacuna.palavra === '') {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                let novaResposta = await respostaLacunasDAO.insertRespostaLacuna(dadosRespostaLacuna);
                if (novaResposta) {
                    dadosRespostaLacuna.id = novaResposta.insertId; // Ajuste se necessário
                    return { resposta: dadosRespostaLacuna, status: message.SUCCESS_CREATED_ITEM.status, status_code: message.SUCCESS_CREATED_ITEM.status_code };
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
const setAtualizarRespostaLacuna = async function(id, dadosRespostaLacuna, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let updatedResposta = await respostaLacunasDAO.updateRespostaLacuna(id, dadosRespostaLacuna);
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
const setExcluirRespostaLacuna = async function(id) {
    try {
        let respostaDeletada = await respostaLacunasDAO.deleteRespostaLacuna(id);
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
    getListarRespostasLacunas,
    getBuscarRespostaLacunaById,
    setInserirNovaRespostaLacuna,
    setAtualizarRespostaLacuna,
    setExcluirRespostaLacuna,
};
