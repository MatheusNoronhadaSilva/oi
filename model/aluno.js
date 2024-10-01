/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.1
*******************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instacia da classe PrismaClient
const prisma = new PrismaClient()


const selectAlunobyID = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_alunos where id = ${id}`;

        // Executa no banco de dados o script sql
        let rsAluno= await prisma.$queryRawUnsafe(sql);

            return rsAluno;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const selectAllAlunos = async function(){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_alunos where id > 0`;

        // Executa no banco de dados o script sql
        let rsAluno= await prisma.$queryRawUnsafe(sql);

            return rsAluno;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}



const selectUsuarioByEmailESenha = async function(email, senha) {
    try {
        let sql = `SELECT id FROM tbl_alunos WHERE email = '${email}' AND senha = '${senha}';`;
        let rsAluno = await prisma.$queryRawUnsafe(sql);
        return rsAluno;
    } catch (error) {
        console.log(error);
        return false;
    }
};




const insertAluno = async function(dadosAluno) {
    try {
        let sql

         sql = ` INSERT INTO tbl_alunos (
                            nome,
                            email,
                            senha,
                            telefone,
                            data_nascimento,
                            serie
                        ) 
         VALUES 
           ('${dadosAluno.nome}',
           '${dadosAluno.email}',
           '${dadosAluno.senha}',
           '${dadosAluno.telefone}',
           '${dadosAluno.data_nascimento}',
           '${dadosAluno.serie}'
           )`; 

           console.log(sql);

        let result = await prisma.$executeRawUnsafe(sql);
        
        if (result){

            console.log(dadosAluno);
            

            let lastID= await lastIDAluno()
            for (let aluno of dadosAluno.materias) {

                // Verificar se a combinação já existe
                let checkSql = `SELECT * FROM tbl_alunos_materias 
                                WHERE aluno_id = ${lastID[0].id} AND materia_id = ${aluno};`;

                let insert = await prisma.$queryRawUnsafe(checkSql);

                if (insert.length === 0) {
                    // Se não existe, insere
                    sql = `INSERT INTO tbl_alunos_materias (
                        aluno_id, 
                        materia_id
                    ) VALUES (
                        ${lastID[0].id},
                        ${aluno}
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

// Função para adicionar aluno à sala do rank mais baixo ou criar nova sala
const adicionarAlunoASala = async function(alunoId) {

    
    try {

        console.log('eeeeeeeee');
        
        // Busca a sala com o rank mais baixo que ainda não está cheia
        let salaDisponivel = await prisma.$queryRawUnsafe(`
            SELECT id, pessoas_atual 
            FROM tbl_salas 
            WHERE id_rank = (SELECT MIN(id_rank) FROM tbl_salas) 
              AND pessoas_atual < 25 
            LIMIT 1;
        `);
        

        console.log('ddddddddddd');
        

        if (salaDisponivel.length > 0) {
            // Se uma sala disponível foi encontrada, adiciona o aluno
            let salaId = salaDisponivel[0].id;

            await prisma.$executeRawUnsafe(`
                INSERT INTO tbl_salas_alunos (sala_id, aluno_id) 
                VALUES (${salaId}, ${alunoId});
            `);

            // Aumenta o contador de alunos na sala
            await prisma.$executeRawUnsafe(`
                UPDATE tbl_salas 
                SET pessoas_atual = pessoas_atual + 1 
                WHERE id = ${salaId};
            `);

            return true; // Aluno adicionado com sucesso
        } else {
            // Se não houver sala disponível, cria uma nova sala
            let novaSalaId = await prisma.$executeRawUnsafe(`
                INSERT INTO tbl_salas (rank_id, pessoas_atual) 
                VALUES ((SELECT MIN(id) FROM ranks), 1) RETURNING id;
            `);

            // Adiciona o aluno à nova sala
            await prisma.$executeRawUnsafe(`
                INSERT INTO tbl_salas_alunos (sala_id, aluno_id) 
                VALUES (${novaSalaId}, ${alunoId});
            `);

            return true; // Aluno adicionado à nova sala com sucesso
        }
    } catch (error) {
        console.log(error);
        return false; // Falha ao adicionar o aluno à sala
    }
};



const updateAluno = async function(id, dadosAluno) {
    try {
        // Atualiza os dados do aluno na tabela tbl_alunos
        let sql = `
            UPDATE tbl_alunos
            SET 
                nome = '${dadosAluno.nome}',
                email = '${dadosAluno.email}',
                senha = '${dadosAluno.senha}',
                telefone = '${dadosAluno.telefone}',
                data_nascimento = '${dadosAluno.data_nascimento}',
                serie = '${dadosAluno.serie}'
            WHERE id = ${id};
        `;
        
        console.log(sql);

        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            // Verifica se todas as matérias existem
            for (let materia of dadosAluno.materia_id) {
                let checkMateriaSql = `SELECT COUNT(*) AS count FROM tbl_materias WHERE id = ${materia};`;
                let countResult = await prisma.$queryRawUnsafe(checkMateriaSql);
                if (countResult[0].count === 0) {
                    console.log(`Erro: Matéria com ID ${materia} não encontrada.`);
                    return false;
                }
            }

            // Remove todas as associações antigas de matérias para o aluno
            sql = `DELETE FROM tbl_alunos_materias WHERE aluno_id = ${id};`;
            result = await prisma.$executeRawUnsafe(sql);

            if (!result) {
                return false;
            }

            // Adiciona as novas associações de matérias
            for (let materia of dadosAluno.materia_id) {
                sql = `
                    INSERT INTO tbl_alunos_materias (aluno_id, materia_id)
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


const lastIDAluno = async function(){
    try {
        let sql = `SELECT id FROM tbl_alunos ORDER BY id DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const deleteAluno = async(id) =>{
    try{

        let sql = `delete from tbl_alunos where id = ${id}`
       
    
        //Executa o sql no banco de dados
        let rsdeleteUsuario = await prisma.$executeRawUnsafe(sql)

    
       return rsdeleteUsuario
    
        } catch(error){
            return false
        }
}



const selectAlunosRank = async function(salaId) {
    try {
        // Realiza a busca dos alunos na sala especificada
        let sql = `
            SELECT 
                tbl_alunos.id AS id_aluno,
                tbl_alunos.nome AS nome_aluno,
                tbl_alunos_ranks.pontos_rank AS pontos_aluno,
                ROW_NUMBER() OVER (ORDER BY tbl_alunos_ranks.pontos_rank DESC) AS posicao
            FROM 
                tbl_alunos 
            JOIN 
                tbl_salas_alunos ON tbl_alunos.id = tbl_salas_alunos.aluno_id
            JOIN 
                tbl_salas ON tbl_salas_alunos.sala_id = tbl_salas.id
            JOIN 
                tbl_alunos_ranks ON tbl_alunos.id = tbl_alunos_ranks.aluno_id
            WHERE 
                tbl_salas.id = ${salaId}  
                AND tbl_alunos_ranks.rank_id = tbl_salas.id_rank 
            ORDER BY 
                tbl_alunos_ranks.pontos_rank DESC;
        `;

        // Executa no banco de dados o script SQL
        let rsAluno = await prisma.$queryRawUnsafe(sql);

        return rsAluno;

    } catch (error) {
        console.log(error);
        return false;
    }
}



module.exports ={
    adicionarAlunoASala,
    selectAllAlunos,
    selectAlunobyID,
    lastIDAluno,
    deleteAluno,
    insertAluno,
    updateAluno,
    selectUsuarioByEmailESenha,
    selectAlunosRank

}

