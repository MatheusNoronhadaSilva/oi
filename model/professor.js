/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instacia da classe PrismaClient
const prisma = new PrismaClient()

const selectProfessorByID = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_professor where id = ${id}`;

        // Executa no banco de dados o script sql
        let rsProfessor= await prisma.$queryRawUnsafe(sql);

            return rsProfessor;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}


const selectAllProfessores = async function(){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_professor where id > 0`;

        // Executa no banco de dados o script sql
        let rsProfessor= await prisma.$queryRawUnsafe(sql);

            return rsProfessor;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}


const insertProfessor = async function(dadosProfessores) {
    try {
        
        let sql;

         sql = ` INSERT INTO tbl_professor (
                            nome,
                            email,
                            senha,
                            telefone,
                            data_nascimento
                        ) 
         VALUES 
           ('${dadosProfessores.nome}',
           '${dadosProfessores.email}',
           '${dadosProfessores.senha}',
           '${dadosProfessores.telefone}',
           '${dadosProfessores.data_nascimento}'        
           )`; 
           
           console.log(sql);
           

        let result = await prisma.$executeRawUnsafe(sql);
        
        if (result){

            let lastID=await lastIDProfessor()
            for (let professor of dadosProfessores.materia_id) {

                // Verificar se a combinação já existe
                let checkSql = `SELECT * FROM tbl_professor_materias 
                                WHERE professor_id = ${lastID[0].id} AND materia_id = ${professor};`;

                let insert = await prisma.$queryRawUnsafe(checkSql);

                if (insert.length === 0) {
                    // Se não existe, insere
                    sql = `INSERT INTO tbl_professor_materias (
                        professor_id, 
                        materia_id
                    ) VALUES (
                        ${lastID[0].id},
                        ${professor}
                    );`;

                    let insertResult = await prisma.$executeRawUnsafe(sql);

                    if (!insertResult) {
                        return false;
                    }
                }
            }

            return result;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}


const lastIDProfessor = async function(){
    try {
        let sql = `SELECT id FROM tbl_professor ORDER BY id DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}


const updateProfessor = async function(id, dadosProfessores) {
    try {
        // Atualiza os dados do professor na tabela tbl_professor
        let sql = `
            UPDATE tbl_professor
            SET 
                nome = '${dadosProfessores.nome}',
                email = '${dadosProfessores.email}',
                senha = '${dadosProfessores.senha}',
                telefone = '${dadosProfessores.telefone}',
                data_nascimento = '${dadosProfessores.data_nascimento}'
            WHERE id = ${id};
        `;
        
        console.log(sql);

        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            // Verifica se todas as matérias existem
            for (let materia of dadosProfessores.materia_id) {
                let checkMateriaSql = `SELECT COUNT(*) AS count FROM tbl_materias WHERE id = ${materia};`;
                let countResult = await prisma.$queryRawUnsafe(checkMateriaSql);
                if (countResult[0].count === 0) {
                    console.log(`Erro: Matéria com ID ${materia} não encontrada.`);
                    return false;
                }
            }

            // Remove todas as associações antigas de matérias para o professor
            sql = `DELETE FROM tbl_professor_materias WHERE professor_id = ${id};`;
            result = await prisma.$executeRawUnsafe(sql);

            if (!result) {
                return false;
            }

            // Adiciona as novas associações de matérias
            for (let materia of dadosProfessores.materia_id) {
                sql = `
                    INSERT INTO tbl_professor_materias (professor_id, materia_id)
                    VALUES (${id}, ${materia});
                `;
                
                let insertResult = await prisma.$executeRawUnsafe(sql);

                if (!insertResult) {
                    return false;
                }
            }

            return result;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};


module.exports ={
    selectAllProfessores,
    selectProfessorByID,
    lastIDProfessor,
    insertProfessor,
    updateProfessor
}
