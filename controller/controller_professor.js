/*******************************************************
 * DATA: 10/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.2
*******************************************************/

// Importa as mensagens e os DAOs
const message = require('./modulo/config.js');
const professorDAO = require('../model/professor.js');
const materiaDAO = require('../model/materia.js');
const mentorDAO = require ('../model/mentor.js')

// Função auxiliar para validar a data de nascimentP
function isValidDate(dateString) {

    // Verifica se a data está no formato YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
        return false;
    }

     // Verifica se ta em ano,mes e dia
    const [year, month, day] = dateString.split('-').map(Number);

    // Verifica se o ano é válido ou seja antes de 1900 vai dar
    if (year < 1900) {
        return false;
    }

    // Verifica se o mês é válido
    if (month < 1 || month > 12) {
        return false;
    }

    // Verifica se o dia é válido
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return false;
    }

    return true;
}


function converterData(data) {

    const partes = data.split('-');
      try{
      if (partes.length === 3) {
    
        const dia = partes[0];
        const mes = partes[1];
        const ano = partes[2];
          
        const dataFormatada = `${ano}-${mes}-${dia}`
          return dataFormatada;
        } else {
          return false
        }
    }catch(error){
        console.log(error);
        return false
    }
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






// Função para listar alunos
const getListarProfessor = async function() {
    try {
        let professorJSON = {};
        let dadosProfessores = await professorDAO.selectAllProfessores();

        if (dadosProfessores) {
            for (let i = 0; i < dadosProfessores.length; i++) {
                console.log(dadosProfessores[i]);

                let materiasProfessor = await materiaDAO.selectMateriaByIdProfessor(dadosProfessores[i].id);
                let listaMateriasProfessores = materiasProfessor;

                dadosProfessores[i].data_nascimento = formatarData(dadosProfessores[i].data_nascimento);
                dadosProfessores[i].especializacoes = listaMateriasProfessores;
            }

            console.log(dadosProfessores);
            
            professorJSON.professores = dadosProfessores;
            professorJSON.quantidade = dadosProfessores.length;
            professorJSON.status_code = 200;
            return professorJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

const getListarProfessoresMentores = async function(id) {
    try {
        // Criar o objeto JSON
        let professoresMentoresJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosProfessoresMentores = await mentorDAO.selectProfessorMentorById(id);

        // Validação para verificar se existem dados 
        if (dadosProfessoresMentores) {
            // Criar o JSON para devolver para o APP
            professoresMentoresJSON.mentores = dadosProfessoresMentores;
            professoresMentoresJSON.quantidade = dadosProfessoresMentores.length;
            professoresMentoresJSON.status_code = 200;
            return professoresMentoresJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
}


// Função para buscar aluno por ID
const getBuscarProfessorId = async function(id) {
    try {
        let idProfessor = id;
        let professorJSON = {};

        if (idProfessor === '' || idProfessor === undefined || isNaN(idProfessor)) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            let dadosProfessores = await professorDAO.selectProfessorByID(idProfessor);

            if (dadosProfessores) {
                if (dadosProfessores.length > 0) {
                    for (let i = 0; i < dadosProfessores.length; i++) {
                        console.log(dadosProfessores[i]);

                        let materiasProfessor = await materiaDAO.selectMateriaByIdProfessor(dadosProfessores[i].id);
                        let listaMateriasProfessores = materiasProfessor;

                        dadosProfessores[i].materias = listaMateriasProfessores;
                        dadosProfessores[i].data_nascimento = formatarData(dadosProfessores[i].data_nascimento);
                    }
                    
                    professorJSON.professor = dadosProfessores;
                    professorJSON.status_code = 200;

                    return professorJSON;
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

// Função para inserir novo aluno
const setInserirNovoProfessor = async function(dadosProfessores, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let professorJSON = {};

            console.log('oi');

            // Validação de campos obrigatórios ou com digitação inválida
            if (dadosProfessores.nome === '' || dadosProfessores.nome === undefined || dadosProfessores.nome === null || dadosProfessores.nome.length > 100 ||
            dadosProfessores.email === '' || dadosProfessores.email === undefined || dadosProfessores.email === null || dadosProfessores.email.length > 100 ||
            dadosProfessores.telefone === '' || dadosProfessores.telefone === undefined || dadosProfessores.telefone === null || dadosProfessores.telefone.length > 12 ||
            dadosProfessores.senha === '' ||dadosProfessores.senha === undefined || dadosProfessores.senha === null || dadosProfessores.senha.length > 255 ||
            dadosProfessores.data_nascimento === '' ||dadosProfessores.data_nascimento === undefined || dadosProfessores.data_nascimento === null || dadosProfessores.data_nascimento.length !== 10 ||
                !isValidDate(dadosProfessores.data_nascimento) ||
                dadosProfessores.materia_id === '' || dadosProfessores.materia_id === undefined || dadosProfessores.materia_id === null || dadosProfessores.materia_id.length > 2
            ) {
                return message.ERROR_REQUIRED_FIELDS;

            } else {
                let novoProfessor = await professorDAO.insertProfessor(dadosProfessores);
                
                if (novoProfessor) {
                    let lastId = await professorDAO.lastIDProfessor();
                    dadosProfessores.id = lastId[0].id;

                    professorJSON.professor = dadosProfessores;
                    professorJSON.status = message.SUCCESS_CREATED_ITEM.status;
                    professorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                    professorJSON.message = message.SUCCESS_CREATED_ITEM.message;

                    return professorJSON; // 201
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB; // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};

// Função para excluir aluno
const setExcluirProfessor = async function(id) {
    try {
        let idProfessor = id;

        if (idProfessor === '' || idProfessor === undefined || isNaN(idProfessor)) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            let professorDeletado = await professorDAO.deleteProfessor(idProfessor);

            if (professorDeletado) {
                return message.SUCCESS_DELETED_ITEM;
            } else {
                return message.ERROR_INTERNAL_SERVER_DB; // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};

// Função para atualizar aluno
const setAtualizarProfessor = async function(id, dadosProfessores, contentType) {
    try {
        let idProfessor = id;

        if (idProfessor === '' || idProfessor === undefined || isNaN(idProfessor) || idProfessor === null) {
            return message.ERROR_INVALID_ID;
        } else {
            if (String(contentType).toLowerCase() === 'application/json') {
                let updateProfessorJSON = {};
                
                if (dadosProfessores.nome === '' || dadosProfessores.nome === undefined || dadosProfessores.nome === null || dadosProfessores.nome.length > 100 ||
                 dadosProfessores.email === '' || dadosProfessores.email === undefined || dadosProfessores.email === null || dadosProfessores.email.length > 100 ||
            dadosProfessores.telefone === '' || dadosProfessores.telefone === undefined || dadosProfessores.telefone === null || dadosProfessores.telefone.length > 12 ||
            dadosProfessores.senha === '' ||dadosProfessores.senha === undefined || dadosProfessores.senha === null || dadosProfessores.senha.length > 255 ||
            dadosProfessores.data_nascimento === '' ||dadosProfessores.data_nascimento === undefined || dadosProfessores.data_nascimento === null || dadosProfessores.data_nascimento.length !== 10 ||
                !isValidDate(dadosProfessores.data_nascimento) ||
                dadosProfessores.materia_id === '' || dadosProfessores.materia_id === undefined || dadosProfessores.materia_id === null || dadosProfessores.materia_id.length > 2
            ) {
                    return message.ERROR_REQUIRED_FIELDS;
                } else {
                    let professorById = await professorDAO.selectProfessorByID(id);

                    if (professorById.length > 0) {
                        let uptadeProfessor = await professorDAO.updateProfessor(id, dadosProfessores);
                        
                        if (uptadeProfessor) {
                            updateProfessorJSON.professor = dadosProfessores;
                            updateProfessorJSON.status = message.SUCCESS_UPDATED_ITEM.status;
                            updateProfessorJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code;
                            updateProfessorJSON.message = message.SUCCESS_UPDATED_ITEM.message;
                            
                            return updateProfessorJSON;
                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB;
                        }
                    } else {
                        return message.ERROR_NOT_FOUND;
                    }
                }
            } else {
                return message.ERROR_CONTENT_TYPE;
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Exporta as funções
module.exports = {
    getListarProfessor,
    getBuscarProfessorId,
    setInserirNovoProfessor,
    setAtualizarProfessor,
    setExcluirProfessor,
    getListarProfessoresMentores,
    converterData,
    formatarData
    
};
