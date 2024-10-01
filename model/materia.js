/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instacia da classe PrismaClient
const prisma = new PrismaClient()

const selectAllMaterias = async function(){
    try {
        let sql = `select * from tbl_materias`;

        // Executa no banco de dados o script sql
        let rsMateria= await prisma.$queryRawUnsafe(sql);

            return rsMateria;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
}

const selectMateriaByIdAluno = async function(id) {

    console.log(id);
    try {
        let sql = `   SELECT 
        m.id AS id, 
        m.nome_materia AS materia
    FROM 
        tbl_alunos a
    JOIN 
        tbl_alunos_materias am ON a.id = am.aluno_id
    JOIN 
        tbl_materias m ON am.materia_id = m.id
    WHERE 
        a.id = ${id};`

        // Executa no banco de dados o script sql
        let rsMateria = await prisma.$queryRawUnsafe(sql);

        console.log('oioiiiiiiiiioioioi' + rsMateria);

            return rsMateria;
    
        } catch (error) {
            console.log('caindo qui');
            return false;
            
        }
}

const selectMateriaByIdProfessor = async function(id) {

    try {
        let sql = `   SELECT 
        m.id As id, m.nome_materia AS materia
    FROM 
        tbl_professor a
    JOIN 
        tbl_professor_materias am ON a.id = am.professor_id
    JOIN 
        tbl_materias m ON am.materia_id = m.id
    WHERE 
        a.id = ${id};`

        // Executa no banco de dados o script sql
        let rsMateria= await prisma.$queryRawUnsafe(sql);

        console.log(rsMateria);

            return rsMateria;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
}

const lastIDMateria = async function(){
    try {
        let sql = `SELECT id FROM tbl_materias ORDER BY id DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const deleteMateria = async(id) =>{
    try{

        let sql = `delete from tbl_materias where id = ${id}`
       
    
        //Executa o sql no banco de dados
        let rsdeleteMateria = await prisma.$executeRawUnsafe(sql)

    
       return rsdeleteMateria
    
        } catch(error){
            return false
        }
}


const insertMateria = async function(dadosMaterias){
    
    try {
    
        let sql;

         sql = `insert into tbl_materias ( 
            nome_materia
    ) values (
                '${dadosMaterias.nome_materia}'
    )`;
   
        let result = await prisma.$executeRawUnsafe(sql);
        console.log(result);

        if (result)
            return true
        else
            return false;

        } catch (error) {
            return false 
        }

}

const updateMateria = async function(id,dadosMaterias){
    try{

        let sql;

        
            sql = `UPDATE tbl_materias SET nome_materia = '${dadosMaterias.nome_materia}'
                where tbl_materias.id = ${id};`
        

        let result = await prisma.$executeRawUnsafe(sql);
        console.log(result)

        if (result)
            return result
        else
            return false;
        
    } catch (error) {
        return false

    }
}

const InsertByIdMateria = async function (){
    try {
        
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_materias limit 1`;
        let rsMateria = await prisma.$queryRawUnsafe(sql);

        return rsMateria;

    } catch (error) {
        return false        
    }
}

const selectByIdMateria =async function(id){
    try {
        let sql=`select * from tbl_materias where id=${id}`
        let rsMateria = await prisma.$queryRawUnsafe(sql)
        return rsMateria
    } catch (error) {
        return false
    }
}


module.exports ={
    selectAllMaterias,
    selectMateriaByIdAluno,
    selectMateriaByIdProfessor,
    lastIDMateria,
    deleteMateria,
    insertMateria,
    updateMateria,
    InsertByIdMateria,
    selectByIdMateria
}

