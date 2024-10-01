/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/


const message = require('./modulo/config.js');
const materiaDAO = require('../model/materia.js');

const getListarMaterias = async function() {
    try {
        // Criar o objeto JSON
        let materiasJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosMaterias = await materiaDAO.selectAllMaterias();

        // Validação para verificar se existem dados 
        if (dadosMaterias) {
            // Criar o JSON para devolver para o APP
            materiasJSON.materias = dadosMaterias;
            materiasJSON.quantidade = dadosMaterias.length;
            materiasJSON.status_code = 200;
            return materiasJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
}

const getListarMateriasByIdAluno = async function(id) {
    try {
        // Criar o objeto JSON
        let materiasJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosMaterias = await materiaDAO.selectMateriaByIdAluno(id);

        // Validação para verificar se existem dados 
        if (dadosMaterias) {
            // Criar o JSON para devolver para o APP
            materiasJSON.materias = dadosMaterias;
            materiasJSON.quantidade = dadosMaterias.length;
            materiasJSON.status_code = 200;
            return materiasJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
}


const setInserirNovaMateria = async function (dadosMaterias, contentType) {
    try {
        // Valida o contentType
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE; // 415
        }

        console.log('a');
        

        // Valida campos obrigatórios
        const validationError = validateMateria(dadosMaterias);
        if (validationError) {
            return validationError; // Retorna erro de validação
        }

        // Inserir dados no banco
        const novaMateria = await materiaDAO.insertMateria(dadosMaterias);

        console.log('b');
        

        if (novaMateria) {
            const ultimoId = await materiaDAO.InsertByIdMateria(); // Ajustado para refletir a função adequada
            dadosMaterias.id = ultimoId[0].id;

            console.log('c');
            

            return {
                materias: dadosMaterias,
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
function validateMateria(dados) {
    if (!dados.nome_materia || typeof dados.nome_materia !== 'string' || dados.nome_materia.trim() === '' || dados.nome_materia.length > 255) {
        return message.ERROR_REQUIRED_FIELDS; // 400
    }
    return null;
}




const setAtualizarMateria = async function (id, dadosMaterias, contentType) { 
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let idMateria = id
            if (idMateria == '' || idMateria == undefined || isNaN(idMateria))
                return message.ERROR_INVALID_ID
            else {
                let materia = await materiaDAO.selectByIdMateria(idMateria)
                if (materia) {
                    let materiaAtualizadaJSON = {}
                    let materiaAtualizada = await materiaDAO.updateMateria(idMateria, dadosMaterias)
                    if (materiaAtualizada) {
                        materiaAtualizadaJSON.materia = dadosMaterias
                        materiaAtualizadaJSON.status = message.SUCCESS_UPDATED_ITEM.status
                        materiaAtualizadaJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        materiaAtualizadaJSON.message = message.SUCCESS_UPDATED_ITEM.message
                        return materiaAtualizadaJSON
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

const setExcluirMateria = async function (id) {
    try {
        let idMateria = id
        if (idMateria == '' || idMateria == undefined || isNaN(idMateria))
            return message.ERROR_INVALID_ID
        else {
            let comando = await materiaDAO.deleteMateria(idMateria)
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
    getListarMaterias,
    getListarMateriasByIdAluno,
    setInserirNovaMateria,
    setAtualizarMateria,
    setExcluirMateria
};