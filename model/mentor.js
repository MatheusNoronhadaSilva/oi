/*******************************************************
 * DATA: 12/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.1
*******************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instacia da classe PrismaClient
const prisma = new PrismaClient()


const selectAllMentores = async function(){
    try {
        let sql = `SELECT
  m.id AS mentor_id,
  m.data_ingresso,
  CASE
    WHEN NOT EXISTS (SELECT 1 FROM tbl_aluno_mentor am WHERE am.mentor_id = m.id)
         AND EXISTS (SELECT 1 FROM tbl_professor_mentor pm WHERE pm.mentor_id = m.id) THEN 'Professor'
    WHEN EXISTS (SELECT 1 FROM tbl_aluno_mentor am WHERE am.mentor_id = m.id) THEN 'Aluno'
    ELSE 'Outro'
  END AS tipo_mentor,
  COALESCE(
    (SELECT a.nome FROM tbl_alunos a WHERE am.aluno_id = a.id),
    (SELECT p.nome FROM tbl_professor p WHERE pm.professor_id = p.id)
  ) AS nome_associado
FROM
  tbl_mentor m
LEFT JOIN tbl_professor_mentor pm ON m.id = pm.mentor_id
LEFT JOIN tbl_aluno_mentor am ON m.id = am.mentor_id;
`;
        // Executa no banco de dados o script sql
        let rsMentor= await prisma.$queryRawUnsafe(sql);

            return rsMentor;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
}

const selectAlunoMentorById = async function(id) {

    console.log(id);
    try {
        let sql = ` SELECT 
    alunos.id AS aluno_id,
    alunos.nome AS aluno_nome,
    mentores.id AS mentor_id,
    mentores.data_ingresso AS mentor_data_ingresso
FROM 
    tbl_aluno_mentor AS aluno_mentor
JOIN 
    tbl_alunos AS alunos ON aluno_mentor.aluno_id = alunos.id
JOIN 
    tbl_mentor AS mentores ON aluno_mentor.mentor_id = mentores.id;`

        // Executa no banco de dados o script sql
        let rsMentor = await prisma.$queryRawUnsafe(sql);

        console.log('oioiiiiiiiiioioioi' + rsMentor);

            return rsMentor;
    
        } catch (error) {
            console.log('caindo qui');
            return false;
            
        }
}



const selectProfessorMentorById = async function(id) {

    console.log(id);
    try {
        let sql = `     SELECT 
		professores.id AS professor_id,
        professores.nome AS professor_nome,
        mentores.id AS mentor_id,
        mentores.data_ingresso AS mentor_data_ingresso
        FROM 
        tbl_professor_mentor AS professor_mentor
        JOIN
         tbl_professor AS professores ON professor_mentor.professor_id = professores.id
JOIN 
    tbl_mentor AS mentores ON professor_mentor.mentor_id = mentores.id ;`

        // Executa no banco de dados o script sql
        let rsMentor = await prisma.$queryRawUnsafe(sql);

        console.log('oioiiiiiiiiioioioi' + rsMentor);

            return rsMentor;
    
        } catch (error) {
            console.log('caindo qui');
            return false;
            
        }
}



module.exports ={
   selectAllMentores,
   selectAlunoMentorById,
   selectProfessorMentorById
}

