/*******************************************************
 * DATA: 01/10/2024
 * Autor: Adaptado
 * Versão: 1.0
*******************************************************/

const message = require('./modulo/config.js');
const salaDAO = require('../model/sala.js');

// Função para retornar todas as salas
const getSalas = async function () {
    try {
        let salasJSON = {};
        let dadosSalas = await salaDAO.selectSalas();
        
        if (dadosSalas) {
            salasJSON.salas = dadosSalas;
            salasJSON.quantidade = dadosSalas.length;
            salasJSON.status_code = 200;
            return salasJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para buscar uma sala por ID
const getBuscarSalaId = async function (id) {
    try {
        let idSala = id;
        if (!idSala || isNaN(idSala)) return message.ERROR_INVALID_ID;

        let dadosSala = await salaDAO.selectByIdSala(idSala);
        if (dadosSala) {
            if (dadosSala.length > 0) {
                return { sala: dadosSala, status_code: 200 };
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
const setInserirNovaSala = async function (dadosSala, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }

        // Valida campos obrigatórios
        const validationError = validateSala(dadosSala);
        if (validationError) {
            return validationError;
        }

        // Inserir sala no banco de dados
        const novaSala = await salaDAO.insertSala(dadosSala);
        if (novaSala) {
            const ultimoId = await salaDAO.lastIDSala();
            dadosSala.id = ultimoId[0].id;

            return {
                sala: dadosSala,
                status_code: message.SUCCESS_CREATED_ITEM.status_code,
                message: message.SUCCESS_CREATED_ITEM.message
            };
        } else {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para atualizar uma sala
const setAtualizarSala = async function (id, dadosSala, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let idSala = id;
            if (!idSala || isNaN(idSala)) return message.ERROR_INVALID_ID;

            let sala = await salaDAO.selectByIdSala(idSala);
            if (sala) {
                let salaAtualizada = await salaDAO.updateSala(idSala, dadosSala);
                if (salaAtualizada) {
                    return {
                        sala: dadosSala,
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
const setExcluirSala = async function (id) {
    try {
        let idSala = id;
        if (!idSala || isNaN(idSala)) return message.ERROR_INVALID_ID;

        let comando = await salaDAO.deleteSala(idSala);
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
function validateSala(dadosSala) {
    if (!dadosSala.id_rank || isNaN(dadosSala.id_rank)) {
        return message.ERROR_REQUIRED_FIELDS;
    }
    if (!dadosSala.numero || isNaN(dadosSala.numero)) {
        return message.ERROR_REQUIRED_FIELDS;
    }
    if (dadosSala.max_pessoas && (isNaN(dadosSala.max_pessoas) || dadosSala.max_pessoas <= 0)) {
        return message.ERROR_REQUIRED_FIELDS;
    }
    return null;
}

module.exports = {
    getSalas,
    getBuscarSalaId,
    setInserirNovaSala,
    setAtualizarSala,
    setExcluirSala
};
