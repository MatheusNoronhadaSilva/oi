/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/


const message = require('./modulo/config.js');
const tipoQuestaoDAO = require('../model/tipoQuestao.js');

const getTipoQuestao = async function() {
    try {
        // Criar o objeto JSON
        let tipoQuestaoJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosTipoQuestao = await tipoQuestaoDAO.selectTipoQuestao();

        // Validação para verificar se existem dados 
        if (dadosTipoQuestao) {
            // Criar o JSON para devolver para o APP
            tipoQuestaoJSON.materias = dadosTipoQuestao;
            tipoQuestaoJSON.quantidade = dadosTipoQuestao.length;
            tipoQuestaoJSON.status_code = 200;
            return tipoQuestaoJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
}



const setInserirNovoTipoQuestao = async function (dadosTipoQuestao, contentType) {
    try {
        // Valida o contentType
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE; // 415
        }

        console.log('a');
        

        // Valida campos obrigatórios
        const validationError = validateTipoQuestao(dadosTipoQuestao);
        if (validationError) {
            return validationError; // Retorna erro de validação
        }

        // Inserir dados no banco
        const novaTipoQuestao = await tipoQuestaoDAO.insertTipoQuestao(dadosTipoQuestao);

        console.log('b');
        

        if (novaTipoQuestao) {
            const ultimoId = await tipoQuestaoDAO.InsertByIdTipoQuestao(); // Ajustado para refletir a função adequada
            dadosTipoQuestao.id = ultimoId[0].id;

            console.log('c');
            

            return {
                tipoQuestao: dadosTipoQuestao,
                status_code: message.SUCCESS_CREATED_ITEM.status_code,
                message: message.SUCCESS_CREATED_ITEM.message
            }; // 201
        } else {
           
            
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};
// Função para validar 'dadosMaterias'
function validateTipoQuestao(dados) {
    if (!dados.tipo_questao || typeof dados.tipo_questao !== 'string' || dados.tipo_questao.trim() === '' || dados.tipo_questao.length > 255) {
        return message.ERROR_REQUIRED_FIELDS; // 400
    }
    return null;
}


const getBuscarTipoQuestaoId = async function(id) {
    try {
        let idTipoQuestao = id;
        let tipoQuestaoJSON = {};

        if (idTipoQuestao === '' || idTipoQuestao === undefined || isNaN(idTipoQuestao)) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            let dadosTipoQuestao = await tipoQuestaoDAO.selectByIdTipoQuestao(idTipoQuestao);
            if (dadosTipoQuestao) {
                if (dadosTipoQuestao.length > 0) {
                    tipoQuestaoJSON.grupo = dadosTipoQuestao;
                    tipoQuestaoJSON.status_code = 200;
                    return tipoQuestaoJSON;
                } else {
                    return message.ERROR_NOT_FOUND; // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB; // 500
            }
        }
    } catch (error) {
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};



const setAtualizarTipoQuestao = async function (id, dadosTipoQuestao, contentType) { 
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let idTipoQuestao = id
            if (idTipoQuestao== '' || idTipoQuestao== undefined || isNaN(idTipoQuestao))
                return message.ERROR_INVALID_ID
            else {
                let tipoQuestao = await tipoQuestaoDAO.selectByIdTipoQuestao(idTipoQuestao)
                if (tipoQuestao) {
                    let tipoQuestaoAtualizadaJSON = {}
                    let tipoQuestaoAtualizada = await tipoQuestaoDAO.updateTipoQuestao(idTipoQuestao, dadosTipoQuestao)
                    if (tipoQuestaoAtualizada) {
                        tipoQuestaoAtualizadaJSON.materia = dadosTipoQuestao
                        tipoQuestaoAtualizadaJSON.status = message.SUCCESS_UPDATED_ITEM.status
                        tipoQuestaoAtualizadaJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        tipoQuestaoAtualizadaJSON.message = message.SUCCESS_UPDATED_ITEM.message
                        return tipoQuestaoAtualizadaJSON
                    }
                    else {
                        return message.ERROR_NOT_FOUND
                    }
                }
                else
                    return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirTipoQuestao = async function (id) {
    try {
        let idTipoQuestao = id
        if (idTipoQuestao == '' || idTipoQuestao == undefined || isNaN(idTipoQuestao))
            return message.ERROR_INVALID_ID
        else {
            let comando = await tipoQuestaoDAO.deleteTipoQuestao(idTipoQuestao)
            if (comando)
                return message.SUCCESS_DELETED_ITEM
            else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}



module.exports = {
    getTipoQuestao,
    setInserirNovoTipoQuestao,
    setAtualizarTipoQuestao,
    setExcluirTipoQuestao,
    getBuscarTipoQuestaoId
};