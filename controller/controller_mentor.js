/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 2.0
*******************************************************/

// Importa as mensagens e os DAOs
const mentorDAO = require('../model/mentor.js');

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

// Função para listar todos os mentores
const getListarMentores = async function() {
    try {
        // Criar o objeto JSON
        let mentoresJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de mentores
        let dadosMentor = await mentorDAO.selectAllMentores();

        // Validação para verificar se existem dados 
        if (dadosMentor) {
            // Formatar as datas de nascimento dos mentores, se aplicável
            dadosMentor.forEach(mentor => {
                if (mentor.data_ingresso) {
                    mentor.data_ingresso = formatarData(mentor.data_ingresso);
                }
            });

            // Criar o JSON para devolver para o APP
            mentoresJSON.mentores = dadosMentor;
            mentoresJSON.quantidade = dadosMentor.length;
            mentoresJSON.status_code = 200;
            return mentoresJSON;
            
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
}

module.exports = {
    getListarMentores,
    formatarData
};
