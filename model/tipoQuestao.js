/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instacia da classe PrismaClient
const prisma = new PrismaClient()


const selectTipoQuestao = async function(){
    try {
        let sql = `select * from tbl_tipo_questao`;

        // Executa no banco de dados o script sql
        let rstipoQuestao= await prisma.$queryRawUnsafe(sql);

            return rstipoQuestao;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
}



const lastIDTipoQuestao = async function(){
    try {
        let sql = `SELECT id FROM tbl_tipo_questao ORDER BY id DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const deleteTipoQuestao = async(id) =>{
    try{

        let sql = `delete from tbl_tipo_questao where id = ${id}`
       
    
        //Executa o sql no banco de dados
        let rsdeleteTipoQuestao = await prisma.$executeRawUnsafe(sql)

    
       return rsdeleteTipoQuestao
    
        } catch(error){
            return false
        }
}


const insertTipoQuestao = async function(dadosTipoQuestao){
    
    try {
    
        let sql;

         sql = `insert into tbl_tipo_questao ( 
            tipo_questao
    ) values (
                '${dadosTipoQuestao.tipo_questao}'
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

const updateTipoQuestao = async function(id,dadosTipoQuestao){
    try{

        let sql;

        
            sql = `UPDATE tbl_tipo_questao SET tipo_questao = '${dadosTipoQuestao.tipo_questao}'
                where tbl_tipo_questao.id = ${id};`
        

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



const selectByIdTipoQuestao =async function(id){
    try {
        let sql=`select * from tbl_tipo_questao where id=${id}`
        let rstipoQuestao = await prisma.$queryRawUnsafe(sql)
        return rstipoQuestao
    } catch (error) {
        return false
    }
}

const InsertByIdTipoQuestao = async function (){
    try {
        
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_tipo_questao limit 1`;
        let rstipoQuestao = await prisma.$queryRawUnsafe(sql);

        return rstipoQuestao;

    } catch (error) {
        return false        
    }
}


module.exports ={
    selectTipoQuestao,
    lastIDTipoQuestao,
    selectByIdTipoQuestao,
    deleteTipoQuestao,
    updateTipoQuestao,
    insertTipoQuestao,
    InsertByIdTipoQuestao

}
