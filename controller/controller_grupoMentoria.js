/*******************************************************
 * DATA: 17/09/2024
 * Autor: Ricardo Borges
 * Versão: 2.0
*******************************************************/

// Importa as mensagens e os DAOs
const message = require('./modulo/config.js');
const grupoMentoriaDAO = require('../model/grupoMentoria.js');
const mentorDAO = require('../model/mentor.js');

// Função auxiliar para validar a data
function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
        return false;
    }

    const [year, month, day] = dateString.split('-').map(Number);

    if (year < 1900) {
        return false;
    }

    if (month < 1 || month > 12) {
        return false;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return false;
    }

    return true;
}

// Função para formatar a data
function formatarData(data) {
    if (!data) return null; // Se data for falsy, retorna null

    // Verifica se data é um objeto Date
    if (data instanceof Date) {
        return data.toISOString().split('T')[0]; // Converte para string no formato ISO
    }

    // Se data for uma string, continua o processamento
    if (typeof data === 'string') {
        const partes = data.split('T')[0]; // Separa a data da hora
        return partes; // Retorna apenas a parte da data
    }

    return null; // Se não for string nem objeto Date, retorna null
}

// Função para listar todos os grupos de mentoria
const getListarGruposMentoria = async function() {
    try {
        let grupoMentoriaJSON = {};
        let dadosGruposMentoria = await grupoMentoriaDAO.selectAllGruposMentoria();

        if (dadosGruposMentoria) {
            // Formatar a data de criação para cada grupo
            dadosGruposMentoria.forEach(grupo => {
                grupo.data_criacao = formatarData(grupo.data_criacao);
            });

            grupoMentoriaJSON.grupos = dadosGruposMentoria;
            grupoMentoriaJSON.quantidade = dadosGruposMentoria.length;
            grupoMentoriaJSON.status_code = 200;
            return grupoMentoriaJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para buscar um grupo de mentoria por ID
const getBuscarGrupoMentoriaId = async function(id) {
    try {
        let idGrupoMentoria = id;
        let grupoMentoriaJSON = {};

        if (idGrupoMentoria === '' || idGrupoMentoria === undefined || isNaN(idGrupoMentoria)) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            let dadosGrupoMentoria = await grupoMentoriaDAO.selectGrupoMentoriaByID(idGrupoMentoria);

            if (dadosGrupoMentoria) {
                if (dadosGrupoMentoria.length > 0) {
                    // Formatar a data de criação para o grupo encontrado
                    dadosGrupoMentoria[0].data_criacao = formatarData(dadosGrupoMentoria[0].data_criacao);
                    
                    grupoMentoriaJSON.grupo = dadosGrupoMentoria;
                    grupoMentoriaJSON.status_code = 200;
                    return grupoMentoriaJSON;
                } else {
                    return message.ERROR_NOT_FOUND;
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB;
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para inserir um novo grupo de mentoria
const setInserirNovoGrupoMentoria = async function(dadosGrupoMentoria, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let grupoMentoriaJSON = {};

            // Validação de campos obrigatórios ou com digitação inválida
            if (dadosGrupoMentoria.nome === '' || dadosGrupoMentoria.nome === undefined || dadosGrupoMentoria.nome === null || dadosGrupoMentoria.nome.length > 255 ||
                dadosGrupoMentoria.capacidade === '' || dadosGrupoMentoria.capacidade === undefined || dadosGrupoMentoria.capacidade === null ||
                dadosGrupoMentoria.descricao === '' || dadosGrupoMentoria.descricao === undefined || dadosGrupoMentoria.descricao === null || dadosGrupoMentoria.descricao.length > 255 ||
                dadosGrupoMentoria.foto_perfil === '' || dadosGrupoMentoria.foto_perfil === undefined || dadosGrupoMentoria.foto_perfil === null || dadosGrupoMentoria.foto_perfil.length > 255 ||
                dadosGrupoMentoria.serie_min === '' || dadosGrupoMentoria.serie_min === undefined || dadosGrupoMentoria.serie_min === null || 
                dadosGrupoMentoria.serie_max === '' || dadosGrupoMentoria.serie_max === undefined || dadosGrupoMentoria.serie_max === null ||
                dadosGrupoMentoria.chat_aberto === '' || dadosGrupoMentoria.chat_aberto === undefined || dadosGrupoMentoria.chat_aberto === null ||
                dadosGrupoMentoria.data_criacao === '' || dadosGrupoMentoria.data_criacao === undefined || dadosGrupoMentoria.data_criacao === null ||
                !isValidDate(dadosGrupoMentoria.data_criacao) ||
                dadosGrupoMentoria.mentor_id === '' || dadosGrupoMentoria.mentor_id === undefined || dadosGrupoMentoria.mentor_id === null
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                // Formatar a data de criação
                dadosGrupoMentoria.data_criacao = formatarData(dadosGrupoMentoria.data_criacao);

                let novoGrupoMentoria = await grupoMentoriaDAO.insertGrupoMentoria(dadosGrupoMentoria);

                if (novoGrupoMentoria) {
                    let lastId = await grupoMentoriaDAO.lastIDGrupoMentoria();
                    dadosGrupoMentoria.id = lastId[0].id;

                    grupoMentoriaJSON.grupo = dadosGrupoMentoria;
                    grupoMentoriaJSON.status = message.SUCCESS_CREATED_ITEM.status;
                    grupoMentoriaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                    grupoMentoriaJSON.message = message.SUCCESS_CREATED_ITEM.message;

                    return grupoMentoriaJSON; // 201
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

// Função para excluir um grupo de mentoria
const setExcluirGrupoMentoria = async function(id) {
    try {
        let idGrupoMentoria = id;

        if (idGrupoMentoria === '' || idGrupoMentoria === undefined || isNaN(idGrupoMentoria)) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            let grupoMentoriaDeletado = await grupoMentoriaDAO.deleteGrupoMentoria(idGrupoMentoria);

            if (grupoMentoriaDeletado) {
                return message.SUCCESS_DELETED_ITEM;
            } else {
                return message.ERROR_INTERNAL_SERVER_DB; // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};

// Função para atualizar um grupo de mentoria
const setAtualizarGrupoMentoria = async function(id, dadosGrupoMentoria, contentType) {
    try {
        let idGrupoMentoria = id;

        if (idGrupoMentoria === '' || idGrupoMentoria === undefined || isNaN(idGrupoMentoria) || idGrupoMentoria === null) {
            return message.ERROR_INVALID_ID;
        } else {
            if (String(contentType).toLowerCase() === 'application/json') {
                let updateGrupoMentoriaJSON = {};

                if (dadosGrupoMentoria.nome === '' || dadosGrupoMentoria.nome === undefined || dadosGrupoMentoria.nome === null || dadosGrupoMentoria.nome.length > 100 ||
                    dadosGrupoMentoria.capacidade === '' || dadosGrupoMentoria.capacidade === undefined || dadosGrupoMentoria.capacidade === null ||
                    dadosGrupoMentoria.descricao === '' || dadosGrupoMentoria.descricao === undefined || dadosGrupoMentoria.descricao === null || dadosGrupoMentoria.descricao.length > 255 ||
                    dadosGrupoMentoria.foto_perfil === '' || dadosGrupoMentoria.foto_perfil === undefined || dadosGrupoMentoria.foto_perfil === null || dadosGrupoMentoria.foto_perfil.length > 255 ||
                    dadosGrupoMentoria.serie_min === '' || dadosGrupoMentoria.serie_min === undefined || dadosGrupoMentoria.serie_min === null ||
                    dadosGrupoMentoria.serie_max === '' || dadosGrupoMentoria.serie_max === undefined || dadosGrupoMentoria.serie_max === null ||
                    dadosGrupoMentoria.chat_aberto === '' || dadosGrupoMentoria.chat_aberto === undefined || dadosGrupoMentoria.chat_aberto === null ||
                    dadosGrupoMentoria.data_criacao === '' || dadosGrupoMentoria.data_criacao === undefined || dadosGrupoMentoria.data_criacao === null ||
                    !isValidDate(dadosGrupoMentoria.data_criacao) ||
                    dadosGrupoMentoria.mentor_id === '' || dadosGrupoMentoria.mentor_id === undefined || dadosGrupoMentoria.mentor_id === null
                ) {
                    return message.ERROR_REQUIRED_FIELDS; // 400
                } else {
                    // Formatar a data de criação
                    dadosGrupoMentoria.data_criacao = formatarData(dadosGrupoMentoria.data_criacao);

                    let grupoAtualizado = await grupoMentoriaDAO.updateGrupoMentoria(idGrupoMentoria, dadosGrupoMentoria);
                    
                    if (grupoAtualizado) {
                        updateGrupoMentoriaJSON.status_code = 200;
                        updateGrupoMentoriaJSON.message = message.SUCCESS_UPDATED_ITEM.message;
                        return updateGrupoMentoriaJSON; // 200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB; // 500
                    }
                }
            } else {
                return message.ERROR_CONTENT_TYPE; // 415
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};

module.exports = {
    getListarGruposMentoria,
    getBuscarGrupoMentoriaId,
    setInserirNovoGrupoMentoria,
    setExcluirGrupoMentoria,
    setAtualizarGrupoMentoria
};
