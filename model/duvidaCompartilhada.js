/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.1
*******************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instacia da classe PrismaClient
const prisma = new PrismaClient()


const selectAllDuvidas = async function(){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `SELECT 
        alunos.nome AS Nome_do_Aluno,
        duvidas.conteudo AS Conteudo_da_Dúvida,
        duvidas.data_envio AS Data_de_Envio,
        CASE WHEN duvidas.respondida = 1 THEN 'Respondida' ELSE 'Não respondida' END AS Status_da_Dúvida
    FROM 
        tbl_duvida_compartilhada duvidas
    INNER JOIN tbl_membros membros ON duvidas.membro_id = membros.id
    INNER JOIN tbl_alunos alunos ON membros.aluno_id = alunos.id;`;

        // Executa no banco de dados o script sql
        let rsDuvidas= await prisma.$queryRawUnsafe(sql);

            return rsDuvidas;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}



const selectDuvidasRespondidas = async function(){
    try {
        // Realiza a busca do genero pelo ID
        let sql = ` SELECT * FROM tbl_duvida_compartilhada WHERE respondida = 1;`;

        // Executa no banco de dados o script sql
        let rsDuvidas= await prisma.$queryRawUnsafe(sql);

            return rsDuvidas;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
    }



const selectDuvidasNaoRespondidas = async function(){
    try {
        // Realiza a busca do genero pelo ID
        let sql = ` SELECT * FROM tbl_duvida_compartilhada WHERE respondida = 'nao';`;

        // Executa no banco de dados o script sql
        let rsDuvidas= await prisma.$queryRawUnsafe(sql);

            return rsDuvidas;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
    }


    const inserirDuvidaCompartilhada = async function(dadosDuvida) {
        try {
            // SQL para inserir na tabela tbl_duvida_compartilhada
            let sql = `INSERT INTO tbl_duvida_compartilhada (
                            conteudo,
                            data_envio,
                            membro_id
                        ) 
                        VALUES 
                        (
                            '${dadosDuvida.conteudo}',
                            '${dadosDuvida.data_envio}',
                            ${dadosDuvida.membro_id}
                        );`;
    
            console.log(sql);
    
            // Executar a inserção
            let resultado = await prisma.$executeRawUnsafe(sql);
            
            return resultado ? true : false; // Retornar verdadeiro se a inserção for bem-sucedida
        } catch (erro) {
            console.log(erro);
            return false; // Retornar falso em caso de erro
        }
    };


    const getDuvidasPorMembro = async function(membroId) {
        try {
            // SQL para selecionar as dúvidas de um membro específico
            let sql = `
                SELECT 
                    d.id,
                    d.conteudo,
                    d.data_envio,
                    d.membro_id,
                    d.respondida
                FROM 
                    tbl_duvida_compartilhada d
                WHERE 
                    d.membro_id = ${membroId}
                ORDER BY 
                    d.data_envio DESC;`;
    
            // Executa a consulta e retorna os resultados
            const resultado = await prisma.$queryRawUnsafe(sql);
            return resultado;
        } catch (erro) {
            console.error(erro);
            throw new Error('Erro ao buscar as dúvidas do membro');
        }
    };

    const updateDuvidaCompartilhada = async function(id, dadosDuvida) {
        try {
            let sql;
    
            sql = `UPDATE tbl_duvida_compartilhada 
                   SET conteudo = '${dadosDuvida.conteudo}', 
                       data_envio = '${dadosDuvida.data_envio}', 
                       respondida = ${dadosDuvida.respondida} 
                   WHERE id = ${id};`;
    
            let result = await prisma.$executeRawUnsafe(sql);
            console.log(result);
    
            if (result) {
                return result;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    
    
    // Função para deletar um grupo de mentoria pelo ID
const deleteDuvidaCompartilhada = async function(id) {
    try {
        let sql = `DELETE FROM tbl_duvida_compartilhada WHERE id = ${id}`;

        // Executa o SQL para deletar o grupo de mentoria
        let result = await prisma.$executeRawUnsafe(sql);

        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports ={
    updateDuvidaCompartilhada,
    selectAllDuvidas,
    selectDuvidasNaoRespondidas,
    selectDuvidasRespondidas,
    inserirDuvidaCompartilhada,
    getDuvidasPorMembro,
    deleteDuvidaCompartilhada

}