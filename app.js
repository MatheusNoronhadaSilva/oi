/****************************************************************
 * Objetivo: Arquivo responsavel pelos endpoints
 * Data: 03/09/2024
 * Autor: Ricardo
 * Versão: 1.0
 ****************************************************************/

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use((request, response, next) =>{

    // Permite especificar quem podera acessar a API ('*' = Liberar acesso público, 'IP' = Liberar acesso apenas para aquela maquina);
    response.header('Access-Control-Allow-Origin', '*')

    // Permite especificar como a API, sera requisitada ('GET', 'POST', 'PUT' e 'DELETE')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    // Ativa as confgurações de cors
    app.use(cors())


    next()
})

/*********************** Import dos arquivos de controller do projeto ***********************************/
const controllerAluno = require('./controller/controller_aluno.js')
const controllerMateria = require('./controller/controller_materia.js')
const controllerProfessor = require ('./controller/controller_professor.js')
const controllerMentor = require ('./controller/controller_mentor.js')
const controllerGrupoMentoria = require ('./controller/controller_grupoMentoria.js')
const controllerMembros = require ('./controller/controller_membros.js')
const controllerTipoQuestoes = require ('./controller/controller_tipoQuestao.js')
const controllerDuvidaCompartilhada = require ('./controller/controller_duvidaCompartilhada.js')
const controllerRespostaDuvida = require ('./controller/controller_respostaDuvida.js')
const controllerQuestao = require ('./controller/controller_questao.js')
const controllerAtividade = require ('./controller/controller_atividadeGrupoMentoria.js')
const controllerOrdemPalavra = require ('./controller/controller_ordemPalavra.js')
const controllerRespostaLacunas = require ('./controller/controller_respostaLacunas.js')
const controllerRespostaCorrespondencia = require ('./controller/controller_respostaCorrespondencia.js')
const controllerRespostaMultipla = require ('./controller/controller_respostaMultipla.js')
const controllerRespostaVerdadeiroFalso = require ('./controller/controller_verdadeiroFalso.js')
const controllerSalas = require ('./controller/controller_salas.js')
const controllerRank = require ('./controller/controller_rank.js')


/*******************************************************************************************************/

// Criando um objeto para controlar a chegada dos dados da requisição em formato JSON
const bodyParserJSON = bodyParser.json()


//       --------------------   CRUD ALUNOS  ---------------------        //


    // -> EndPoint: Versão 2.0 - Retorna os dados de produtos do Banco de Dados
    app.get('/v1/studyfy/alunos', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosAlunos = await controllerAluno.getListarAluno()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosAlunos.status_code)
        response.json(dadosAlunos)
    })

   

    // // EndPoint: ele retorna os dados pelo id
    app.get('/v1/studyFy/aluno/:id', cors(), async function(request, response){

        // Recebe o id da requisição
        let idAluno = request.params.id
        // Encaminha o ID para a controller buscar o Filme
        let dadosAluno = await controllerAluno.getBuscarAlunoId(idAluno)

        
        response.status(dadosAluno.status_code)
        response.json(dadosAluno)
    })

    // //EndPoint: Ele insere dados sobre o filme
    app.post('/v1/studyFy/aluno', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovoAluno = await controllerAluno.setInserirNovoAluno(dadosBody, contentType)
        
        response.status(resultDadosNovoAluno.status_code)
        response.json(resultDadosNovoAluno)
    })

     //EndPoint: Ele deleta os dados pelo id 
    app.delete('/v1/studyFy/alunos/:id', cors(), async function(request, response, next){
        let idAluno = request.params.id

        let dadosAluno = await controllerAluno.setExcluirAluno(idAluno)

        response.status(dadosAluno.status_code)
        response.json(dadosAluno)
    })

     app.put('/v1/studyFy/alunos/:id', cors(), bodyParserJSON, async function(request, response){
         let contentType = request.headers['content-type']
         let dadosBody = request.body
         let idAluno = request.params.id

         let dadosAluno = await controllerAluno.setAtualizarAluno(idAluno, dadosBody, contentType)

       response.status(dadosAluno.status_code)
       response.json(dadosAluno)
     })


     //       --------------------   CRUD PROFESSORES  ---------------------        //


    // -> EndPoint: Versão 2.0 - Retorna os dados de produtos do Banco de Dados
    app.get('/v1/studyfy/professores', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosProfessores = await controllerProfessor.getListarProfessor()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosProfessores.status_code)
        response.json(dadosProfessores)
    })

    // // EndPoint: ele retorna os dados pelo id
    app.get('/v1/studyFy/professor/:id', cors(), async function(request, response){

        // Recebe o id da requisição
        let idProfessor = request.params.id
        // Encaminha o ID para a controller buscar o Filme
        let dadosProfessores = await controllerProfessor.getBuscarProfessorId(idProfessor)

        
        response.status(dadosProfessores.status_code)
        response.json(dadosProfessores)
    })

    // //EndPoint: Ele insere dados sobre o filme
    app.post('/v1/studyFy/professores', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovoProfessor = await controllerProfessor.setInserirNovoProfessor(dadosBody, contentType)
        
        response.status(resultDadosNovoProfessor.status_code)
        response.json(resultDadosNovoProfessor)
    })

     //EndPoint: Ele deleta os dados pelo id 
    app.delete('/v1/studyFy/professores/:id', cors(), async function(request, response, next){
        let idProfessor = request.params.id

        let dadosProfessores = await controllerProfessor.setExcluirProfessor(idProfessor)

        response.status(dadosProfessores.status_code)
        response.json(dadosProfessores)
    })

     app.put('/v1/studyFy/professores/:id', cors(), bodyParserJSON, async function(request, response){
         let contentType = request.headers['content-type']
         let dadosBody = request.body
         let idProfessor = request.params.id

         let dadosProfessores = await controllerProfessor.setAtualizarProfessor(idProfessor, dadosBody, contentType)

       response.status(dadosProfessores.status_code)
       response.json(dadosProfessores)
     })


      //       --------------------   CRUD MATERIA  ---------------------        //

      app.get('/v1/studyfy/materias', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosMaterias = await controllerMateria.getListarMaterias()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosMaterias.status_code)
        response.json(dadosMaterias)
    })

    app.get('/v1/studyfy/alunos/materias/:id', cors(), async function(request, response){

        let idAluno = request.params.id

        let dadosMaterias = await controllerMateria.getListarMateriasByIdAluno(idAluno)

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosMaterias.status_code)
        response.json(dadosMaterias)
    })


     // //EndPoint: Ele insere dados sobre o filme
     app.post('/v1/studyFy/materias', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovaMateria = await controllerMateria.setInserirNovaMateria(dadosBody, contentType)
        
        response.status(resultDadosNovaMateria.status_code)
        response.json(resultDadosNovaMateria)
    })

     //EndPoint: Ele deleta os dados pelo id 
    app.delete('/v1/studyFy/materias/:id', cors(), async function(request, response, next){
        let idMateria = request.params.id

        let dadosMaterias = await controllerMateria.setExcluirMateria(idMateria)

        response.status(dadosMaterias.status_code)
        response.json(dadosMaterias)
    })

     app.put('/v1/studyFy/materias/:id', cors(), bodyParserJSON, async function(request, response){
         let contentType = request.headers['content-type']
         let dadosBody = request.body
         let idMateria = request.params.id

         let dadosMaterias = await controllerMateria.setAtualizarMateria(idMateria, dadosBody, contentType)

       response.status(dadosMaterias.status_code)
       response.json(dadosMaterias)
     })

     app.listen('8080', function(){
        console.log('API funcionando!!')
    })


 //       --------------------   CRUD MENTOR  ---------------------        //



 app.get('/v1/studyfy/mentor', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosMentor = await controllerMentor.getListarMentores()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosMentor.status_code)
        response.json(dadosMentor)
    })

    app.get('/v1/studyfy/aluno/mentor/:id', cors(), async function(request, response){

        let idAlunoMentor = request.params.id

        let dadosAlunosMentores = await controllerAluno.getListarAlunosMentores(idAlunoMentor)

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosAlunosMentores.status_code)
        response.json(dadosAlunosMentores)
    })

    app.get('/v1/studyfy/professor/mentor/:id', cors(), async function(request, response){

        let idProfessorMentor = request.params.id

        let dadosProfessoresMentores = await controllerProfessor.getListarProfessoresMentores(idProfessorMentor)

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosProfessoresMentores.status_code)
        response.json(dadosProfessoresMentores)
    })



// --------------------   CRUD GRUPO DE DE MENTORIA  ---------------------        

app.get('/v1/studyfy/mentorias', cors(), async function(request, response) {
    try {
        // Chama a função da controller para retornar todos os grupos de mentoria
        let dadosMentorias = await controllerGrupoMentoria.getListarGruposMentoria();
        
        // Validação para verificar se existem dados a serem retornados
        response.status(dadosMentorias.status_code);
        response.json(dadosMentorias);
    } catch (error) {
        console.error('Erro ao listar grupos de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});

// Endpoint: Retorna um grupo de mentoria pelo ID
app.get('/v1/studyfy/mentoria/:id', cors(), async function(request, response) {
    try {
        // Recebe o ID da requisição
        let idMentoria = request.params.id;
        
        // Encaminha o ID para a controller buscar o grupo de mentoria
        let dadosMentoria = await controllerGrupoMentoria.getBuscarGrupoMentoriaId(idMentoria);
        
        response.status(dadosMentoria.status_code);
        response.json(dadosMentoria);
    } catch (error) {
        console.error('Erro ao buscar grupo de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});

// Endpoint: Insere um novo grupo de mentoria
app.post('/v1/studyfy/mentorias', cors(), bodyParserJSON, async function(request, response) {
    try {
        // Recebe o content-type da requisição
        let contentType = request.headers['content-type'];
        
        // Recebe todos os dados encaminhados na requisição pelo body
        let dadosBody = request.body;
        
        // Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovaMentoria = await controllerGrupoMentoria.setInserirNovoGrupoMentoria(dadosBody, contentType);
        
        response.status(resultDadosNovaMentoria.status_code);
        response.json(resultDadosNovaMentoria);
    } catch (error) {
        console.error('Erro ao inserir grupo de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});

// Endpoint: Deleta um grupo de mentoria pelo ID
app.delete('/v1/studyfy/mentorias/:id', cors(), async function(request, response) {
    try {
        let idMentoria = request.params.id;
        
        let dadosMentoria = await controllerGrupoMentoria.setExcluirGrupoMentoria(idMentoria);
        
        response.status(dadosMentoria.status_code);
        response.json(dadosMentoria);
    } catch (error) {
        console.error('Erro ao excluir grupo de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});

// Endpoint: Atualiza um grupo de mentoria pelo ID
app.put('/v1/studyfy/mentorias/:id', cors(), bodyParserJSON, async function(request, response) {
    try {
        let contentType = request.headers['content-type'];
        let dadosBody = request.body;
        let idMentoria = request.params.id;
        
        let dadosMentoria = await controllerGrupoMentoria.setAtualizarGrupoMentoria(idMentoria, dadosBody, contentType);
        
        response.status(dadosMentoria.status_code);
        response.json(dadosMentoria);
    } catch (error) {
        console.error('Erro ao atualizar grupo de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});

  


// --------------------   CRUD DE MEMBROS  --------------------- 


app.get('/v1/studyfy/membros/grupo', cors(), async function(request, response) {
    try {
        // Chama a função da controller para retornar todos os grupos de mentoria
        let dadosMembros = await controllerMembros.getListarMembros();
        
        // Validação para verificar se existem dados a serem retornados
        response.status(dadosMembros.status_code);
        response.json(dadosMembros);
    } catch (error) {
        console.error('Erro ao listar os membros:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});



app.get('/v1/studyfy/membros/grupo/:id', cors(), async function(request, response) {
    try {
        // Recebe o ID da requisição
        let idMembros = request.params.id;
        
        // Encaminha o ID para a controller buscar o grupo de mentoria
        let dadosMembros = await controllerMembros.getBuscarMembroId(idMembros);
        
        response.status(dadosMembros.status_code);
        response.json(dadosMembros);
    } catch (error) {
        console.error('Erro ao buscar grupo de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});


app.get('/v1/studyfy/membros/mentor', cors(), async function(request, response) {
    try {
        // Chama a função da controller para retornar todos os grupos de mentoria
        let dadosMembrosMentores = await controllerMembros.getListarMembrosMentores();
        
        // Validação para verificar se existem dados a serem retornados
        response.status(dadosMembrosMentores.status_code);
        response.json(dadosMembrosMentores);
    } catch (error) {
        console.error('Erro ao listar os membros:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});



// --------------------   CRUD TIPO QUESTAO  ---------------------        

app.get('/v1/studyfy/tipoQuestao', cors(), async function(request, response) {
    try {
        // Chama a função da controller para retornar todos os grupos de mentoria
        let dadosTipoQuestao = await controllerTipoQuestoes.getTipoQuestao();
        
        // Validação para verificar se existem dados a serem retornados
        response.status(dadosTipoQuestao.status_code);
        response.json(dadosTipoQuestao);
    } catch (error) {
        console.error('Erro ao listar tipo questao:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});

// Endpoint: Retorna um grupo de mentoria pelo ID
app.get('/v1/studyfy/tipoQuestao/:id', cors(), async function(request, response) {
    try {
        // Recebe o ID da requisição
        let idTipoQuestao = request.params.id;
        
        // Encaminha o ID para a controller buscar o grupo de mentoria
        let dadosTipoQuestao = await controllerTipoQuestoes.getBuscarTipoQuestaoId(idTipoQuestao);
        
        response.status(dadosTipoQuestao.status_code);
        response.json(dadosTipoQuestao);
    } catch (error) {
        console.error('Erro ao buscar grupo de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});

// Endpoint: Insere um novo grupo de mentoria
app.post('/v1/studyfy/tipoQuestao', cors(), bodyParserJSON, async function(request, response) {
    try {
        // Recebe o content-type da requisição
        let contentType = request.headers['content-type'];
        
        // Recebe todos os dados encaminhados na requisição pelo body
        let dadosBody = request.body;
        
        // Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovoTipoQuestao = await controllerTipoQuestoes.setInserirNovoTipoQuestao(dadosBody, contentType);
        
        response.status(resultDadosNovoTipoQuestao .status_code);
        response.json(resultDadosNovoTipoQuestao );
    } catch (error) {
        console.error('Erro ao inserir grupo de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});

// Endpoint: Deleta um grupo de mentoria pelo ID
app.delete('/v1/studyfy/tipoQuestao/:id', cors(), async function(request, response) {
    try {
        let idTipoQuestao = request.params.id;
        
        let dadosTipoQuestao = await controllerTipoQuestoes.setExcluirTipoQuestao(idTipoQuestao);
        
        response.status(dadosTipoQuestao.status_code);
        response.json(dadosTipoQuestao);
    } catch (error) {
        console.error('Erro ao excluir grupo de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});

// Endpoint: Atualiza um grupo de mentoria pelo ID
app.put('/v1/studyfy/tipoQuestao/:id', cors(), bodyParserJSON, async function(request, response) {
    try {
        let contentType = request.headers['content-type'];
        let dadosBody = request.body;
        let idTipoQuestao = request.params.id;
        
        let dadosTipoQuestao = await controllerTipoQuestoes.setAtualizarTipoQuestao(idTipoQuestao, dadosBody, contentType);
        
        response.status(dadosTipoQuestao.status_code);
        response.json(dadosTipoQuestao);
    } catch (error) {
        console.error('Erro ao atualizar grupo de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});



// --------------------   CRUD DE DUVIDA COMPARTILHADA  --------------------- 


app.get('/v1/studyfy/duvidaCompartilhada', cors(), async function(request, response) {
    try {
        // Chama a função da controller para retornar todos os grupos de mentoria
        let dadosDuvidaCompartilhada = await controllerDuvidaCompartilhada.getListarAllDuvidas();
        
        // Validação para verificar se existem dados a serem retornados
        response.status(dadosDuvidaCompartilhada.status_code);
        response.json(dadosDuvidaCompartilhada);
    } catch (error) {
        console.error('Erro ao listar os membros:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});


app.get('/v1/studyfy/duvidaCompartilhada/Respondida', cors(), async function(request, response) {
    try {
        // Chama a função da controller para retornar todos os grupos de mentoria
        let dadosDuvidaCompartilhada = await controllerDuvidaCompartilhada.getListarDuvidasRespondidas();
        
        // Validação para verificar se existem dados a serem retornados
        response.status(dadosDuvidaCompartilhada.status_code);
        response.json(dadosDuvidaCompartilhada);
    } catch (error) {
        console.error('Erro ao listar os membros:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});


app.get('/v1/studyfy/duvidaCompartilhada/NaoRespondida', cors(), async function(request, response) {
    try {
        // Chama a função da controller para retornar todos os grupos de mentoria
        let dadosDuvidaCompartilhada = await controllerDuvidaCompartilhada.getListarDuvidasNaoRespondidas();
        
        // Validação para verificar se existem dados a serem retornados
        response.status(dadosDuvidaCompartilhada.status_code);
        response.json(dadosDuvidaCompartilhada);
    } catch (error) {
        console.error('Erro ao listar os membros:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});


// Endpoint: Insere uma nova dúvida compartilhada
app.post('/v1/studyfy/duvidaCompartilhada', cors(), bodyParserJSON, async function(request, response) {
    try {
        // Recebe o content-type da requisição
        let contentType = request.headers['content-type'];
        
        // Recebe todos os dados encaminhados na requisição pelo body
        let dadosBody = request.body;
        
        // Encaminha os dados para a controller
        let resultDadosNovaDuvida = await controllerDuvidaCompartilhada.setInserirNovaDuvida(dadosBody, contentType);
        
        // Define o status da resposta e envia os dados de volta
        response.status(resultDadosNovaDuvida.status_code);
        response.json(resultDadosNovaDuvida);
    } catch (error) {
        console.error('Erro ao inserir dúvida compartilhada:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});


// server.js ou routes.js

app.get('/v1/studyfy/duvidasCompartilhada/:membroId', cors(), async function(request, response) {
    try {
        const membroId = parseInt(request.params.membroId);
        const resultadoDuvidas = await controllerDuvidaCompartilhada.getBuscarDuvidasPorMembro(membroId);

        if (resultadoDuvidas.length === 0) {
            return response.status(404).json({ message: 'Nenhuma dúvida encontrada para este membro.' });
        }

        response.status(200).json(resultadoDuvidas);
    } catch (error) {
        console.error('Erro ao buscar dúvidas compartilhadas:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});


// Endpoint: Atualiza uma dúvida compartilhada pelo ID
app.put('/v1/studyfy/duvidaCompartilhada/:id', cors(), bodyParserJSON, async function(request, response) {
    try {
        let contentType = request.headers['content-type'];
        let dadosBody = request.body;
        let idDuvida = request.params.id;
        
        let dadosDuvida = await controllerDuvidaCompartilhada.setAtualizarDuvida(idDuvida, dadosBody, contentType);
        
        response.status(dadosDuvida.status_code || 200);
        response.json(dadosDuvida);
    } catch (error) {
        console.error('Erro ao atualizar dúvida compartilhada:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});


// Endpoint: Deleta um grupo de mentoria pelo ID
app.delete('/v1/studyfy/duvidaCompartilhada/:id', cors(), async function(request, response) {
    try {
        let idDuvidaCompartilhada = request.params.id;
        
        let dadosDuvida = await controllerDuvidaCompartilhada.setExcluirDuvidaCompartilhada( idDuvidaCompartilhada);
        
        response.status(dadosDuvida.status_code);
        response.json(dadosDuvida);
    } catch (error) {
        console.error('Erro ao excluir grupo de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});



// --------------------   post para o login  --------------------- 

// Endpoint: Realiza o login do usuário
app.post('/v1/studyFy/login', cors(), bodyParserJSON, async function(request, response) {
    // Recebe o content-type da requisição
    let contentType = request.headers['content-type'];

    // Recebe todos os dados encaminhados na requisição pelo Body
    let dadosBody = request.body;

    // Encaminha os dados para a controller realizar o login
    let resultadoLogin = await controllerAluno.loginUsuario(dadosBody.email, dadosBody.senha);

    response.status(resultadoLogin.status_code);
    response.json(resultadoLogin);
});

//       --------------------   CRUD RESPOSTAS DÚVIDA  ---------------------        //

// -> EndPoint: Retorna todos os dados de respostas do Banco de Dados
app.get('/v1/studyFy/respostas', cors(), async function(request, response) {
    // -> Chama a função da controller para retornar todas as respostas
    let dadosRespostas = await controllerRespostaDuvida.getListarRespostas();

    // -> Validação para verificar se existem dados a serem retornados
    response.status(dadosRespostas.status_code);
    response.json(dadosRespostas);
});

// // EndPoint: Retorna os dados de uma resposta pelo ID
app.get('/v1/studyFy/respostas/:id', cors(), async function(request, response) {
    // Recebe o ID da requisição
    let idResposta = request.params.id;

    // Encaminha o ID para a controller buscar a resposta
    let dadosResposta = await controllerRespostaDuvida.getBuscarRespostaId(idResposta);

    response.status(dadosResposta.status_code);
    response.json(dadosResposta);
});

// // EndPoint: Insere uma nova resposta
app.post('/v1/studyFy/respostas', cors(), bodyParserJSON, async function(request, response) {
    // Recebe o content-type da requisição
    let contentType = request.headers['content-type'];

    // Recebe todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body;

    // Encaminha os dados para a controller enviar para o DAO
    let resultDadosNovaResposta = await controllerRespostaDuvida.setInserirNovaResposta(dadosBody, contentType);

    response.status(resultDadosNovaResposta.status_code);
    response.json(resultDadosNovaResposta);
});

// // EndPoint: Deleta uma resposta pelo ID
app.delete('/v1/studyFy/respostas/:id', cors(), async function(request, response) {
    let idResposta = request.params.id;

    let dadosResposta = await controllerRespostaDuvida.setExcluirResposta(idResposta);

    response.status(dadosResposta.status_code);
    response.json(dadosResposta);
});

// // EndPoint: Atualiza uma resposta pelo ID
app.put('/v1/studyFy/respostas/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idResposta = request.params.id;

    let dadosResposta = await controllerRespostaDuvida.setAtualizarResposta(idResposta, dadosBody, contentType);

    response.status(dadosResposta.status_code);
    response.json(dadosResposta);
});



//       --------------------   CRUD QUESTOES ---------------------        //

// EndPoint: Retorna todas as questões
app.get('/v1/studyfy/questoesGeral', cors(), async function(request, response) {
    let dadosQuestoes = await controllerQuestao.getListarTudoQuestao();
    response.status(dadosQuestoes.status_code);
    response.json(dadosQuestoes);
});


// EndPoint: Retorna todas as questões
app.get('/v1/studyfy/questoes', cors(), async function(request, response) {
    let dadosQuestoes = await controllerQuestao.getListarQuestoes();
    response.status(dadosQuestoes.status_code);
    response.json(dadosQuestoes);
});

// EndPoint: Retorna a questão pelo ID
app.get('/v1/studyfy/questao/:id', cors(), async function(request, response) {
    let idQuestao = request.params.id;
    let dadosQuestao = await controllerQuestao.getBuscarQuestaoId(idQuestao);
    response.status(dadosQuestao.status_code);
    response.json(dadosQuestao);
});

// EndPoint: Insere nova questão
app.post('/v1/studyfy/questoes', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultDadosNovaQuestao = await controllerQuestao.setInserirNovaQuestao(dadosBody, contentType);
    response.status(resultDadosNovaQuestao.status_code);
    response.json(resultDadosNovaQuestao);
});

// EndPoint: Atualiza questão pelo ID
app.put('/v1/studyfy/questao/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idQuestao = request.params.id;
    let dadosQuestao = await controllerQuestao.setAtualizarQuestao(idQuestao, dadosBody, contentType);
    response.status(dadosQuestao.status_code);
    response.json(dadosQuestao);
});

// EndPoint: Deleta questão pelo ID
app.delete('/v1/studyfy/questao/:id', cors(), async function(request, response) {
    let idQuestao = request.params.id;
    let dadosQuestao = await controllerQuestao.setExcluirQuestao(idQuestao);
    response.status(dadosQuestao.status_code);
    response.json(dadosQuestao);
});



//       --------------------   CRUD ATIVIDADES GRUPO DE MENTORIA ---------------------        //


// Endpoint: Listar todas as atividades
app.get('/v1/studyfy/atividades', async (req, res) => {
    let resultado = await controllerAtividade.getListarAtividades();
    res.status(resultado.status_code).json(resultado);
});

// Endpoint: Buscar atividade por ID
app.get('/v1/studyfy/atividade/:id', async (req, res) => {
    let idAtividade = req.params.id;
    let resultado = await controllerAtividade.getBuscarAtividadeById(idAtividade);
    res.status(resultado.status_code).json(resultado);
});

app.post('/v1/studyfy/atividade', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultDadosNovaAtividade = await controllerAtividade.setInserirNovaAtividade(dadosBody, contentType);
    response.status(resultDadosNovaAtividade.status_code);
    response.json(resultDadosNovaAtividade);
});

// EndPoint: Atualiza questão pelo ID
app.put('/v1/studyfy/atividade/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idAtividade = request.params.id;
    let dadosAtividade = await controllerAtividade.setAtualizarAtividade(idAtividade, dadosBody, contentType);
    response.status(dadosAtividade.status_code);
    response.json(dadosAtividade);
});

// EndPoint: Deleta questão pelo ID
app.delete('/v1/studyfy/atividades/:id', cors(), async function(request, response) {
    let idAtividade = request.params.id;
    let dadosAtividade = await controllerAtividade.setExcluirAtividade(idAtividade);
    response.status(dadosAtividade.status_code);
    response.json(dadosAtividade);
});





//       --------------------   CRUD ORDEM PALAVRA ---------------------        //

// Endpoint: Listar todas as ordens de palavra
app.get('/v1/studyfy/ordens-palavra', async (req, res) => {
    let resultado = await controllerOrdemPalavra.getListarOrdemPalavras();
    res.status(resultado.status_code).json(resultado);
});

// Endpoint: Buscar ordem de palavra por ID
app.get('/v1/studyfy/ordem-palavra/:id', async (req, res) => {
    let idOrdem = req.params.id;
    let resultado = await controllerOrdemPalavra.getBuscarOrdemPalavraById(idOrdem);
    res.status(resultado.status_code).json(resultado);
});

app.post('/v1/studyfy/ordem-palavra', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultDadosNovaOrdem = await controllerOrdemPalavra.setInserirNovaOrdemPalavra(dadosBody, contentType);
    response.status(resultDadosNovaOrdem.status_code);
    response.json(resultDadosNovaOrdem);
});

// EndPoint: Atualiza questão pelo ID
app.put('/v1/studyfy/ordem-palavra/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idOrdem = request.params.id;
    let dadosOrdemPalavra = await controllerOrdemPalavra.setAtualizarOrdemPalavra(idOrdem, dadosBody, contentType);
    response.status(dadosOrdemPalavra.status_code);
    response.json(dadosOrdemPalavra);
});

// Endpoint: Deletar ordem de palavra pelo ID
app.delete('/v1/studyfy/ordem-palavra/:id', async (req, res) => {
    let idOrdem = req.params.id;
    let resultado = await controllerOrdemPalavra.setExcluirOrdemPalavra(idOrdem);
    res.status(resultado.status_code).json(resultado);
});





//       --------------------   CRUD RESPOSTAS LACUNAS ---------------------        //

// Endpoint: Listar todas as respostas de lacunas
app.get('/v1/studyfy/resposta-lacunas', async (req, res) => {
    let resultado = await controllerRespostaLacunas.getListarRespostasLacunas();
    res.status(resultado.status_code).json(resultado);
});

// Endpoint: Buscar resposta de lacuna por ID
app.get('/v1/studyfy/resposta-lacunas/:id', async (req, res) => {
    let idResposta = req.params.id;
    let resultado = await controllerRespostaLacunas.getBuscarRespostaLacunaById(idResposta);
    res.status(resultado.status_code).json(resultado);
});

// Endpoint: Inserir nova resposta de lacunas
app.post('/v1/studyfy/resposta-lacunas', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultDadosLacunas = await controllerRespostaLacunas.setInserirNovaRespostaLacuna(dadosBody, contentType);
    response.status(resultDadosLacunas.status_code);
    response.json(resultDadosLacunas);
});

// EndPoint: Atualiza questão pelo ID
app.put('/v1/studyfy/resposta-lacunas/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idLacuna = request.params.id;
    let dadosRespostaLacuna = await controllerRespostaLacunas.setAtualizarRespostaLacuna(idLacuna, dadosBody, contentType);
    response.status(dadosRespostaLacuna.status_code);
    response.json(dadosRespostaLacuna);
});

// Endpoint: Deletar resposta de lacunas
app.delete('/v1/studyfy/resposta-lacunas/:id', async (req, res) => {
    let idResposta = req.params.id;
    let resultado = await controllerRespostaLacunas.setExcluirRespostaLacuna(idResposta);
    res.status(resultado.status_code).json(resultado);
});



//       --------------------   CRUD RESPOSTAS CORRESPONDENCIA ---------------------        //


// Endpoint: Listar todas as respostas de correspondência
app.get('/v1/studyfy/resposta-correspondencia', async (req, res) => {
    let resultado = await controllerRespostaCorrespondencia.getListarRespostasCorrespondencia();
    res.status(resultado.status_code).json(resultado);
});

// Endpoint: Buscar resposta de correspondência por ID
app.get('/v1/studyfy/resposta-correspondencia/:id', async (req, res) => {
    let idResposta = req.params.id;
    let resultado = await controllerRespostaCorrespondencia.getBuscarRespostaCorrespondenciaById(idResposta);
    res.status(resultado.status_code).json(resultado);
});


// Endpoint: Inserir nova resposta de lacunas
app.post('/v1/studyfy/resposta-correspondencia', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultDadosCorrespondencia = await controllerRespostaCorrespondencia.setInserirNovaRespostaCorrespondencia(dadosBody, contentType);
    response.status(resultDadosCorrespondencia.status_code);
    response.json(resultDadosCorrespondencia);
});


// EndPoint: Atualiza questão pelo ID
app.put('/v1/studyfy/resposta-correspondencia/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idCorrespondencia = request.params.id;
    let dadosRespostaCorrespondencia = await controllerRespostaCorrespondencia.setAtualizarRespostaCorrespondencia(idCorrespondencia, dadosBody, contentType);
    response.status( dadosRespostaCorrespondencia.status_code);
    response.json( dadosRespostaCorrespondencia);
});


// Endpoint: Deletar resposta de correspondência
app.delete('/v1/studyfy/resposta-correspondencia/:id', async (req, res) => {
    let idResposta = req.params.id;
    let resultado = await controllerRespostaCorrespondencia.setExcluirRespostaCorrespondencia(idResposta);
    res.status(resultado.status_code).json(resultado);
});



//       --------------------   CRUD RESPOSTAS MULTIPLA ESCOLHA ---------------------        //


// Endpoint: Listar todas as respostas de correspondência
app.get('/v1/studyfy/resposta-multipla', async (req, res) => {
    let resultado = await controllerRespostaMultipla.getListarRespostasMultiplas();
    res.status(resultado.status_code).json(resultado);
});

// Endpoint: Buscar resposta de correspondência por ID
app.get('/v1/studyfy/resposta-multipla/:id', async (req, res) => {
    let idResposta = req.params.id;
    let resultado = await controllerRespostaMultipla.getBuscarRespostaMultiplasById(idResposta);
    res.status(resultado.status_code).json(resultado);
});


// Endpoint: Inserir nova resposta de lacunas
app.post('/v1/studyfy/resposta-multipla', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultDadosMultipla = await controllerRespostaMultipla.setInserirNovaRespostaMultipla(dadosBody, contentType);
    response.status(resultDadosMultipla.status_code);
    response.json(resultDadosMultipla);
});


// EndPoint: Atualiza questão pelo ID
app.put('/v1/studyfy/resposta-multipla/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idMultipla = request.params.id;
    let dadosRespostaMultipla = await controllerRespostaMultipla.setAtualizarRespostaMultipla(idMultipla, dadosBody, contentType);
    response.status( dadosRespostaMultipla.status_code);
    response.json( dadosRespostaMultipla);
});


// Endpoint: Deletar resposta de correspondência
app.delete('/v1/studyfy/resposta-multipla/:id', async (req, res) => {
    let idResposta = req.params.id;
    let resultado = await controllerRespostaMultipla.setExcluirRespostaMultipla(idResposta);
    res.status(resultado.status_code).json(resultado);
});





//       --------------------   CRUD RESPOSTAS VERDADEIRO E FALSO ---------------------        //


// Endpoint: Listar todas as respostas de correspondência
app.get('/v1/studyfy/resposta-vf', async (req, res) => {
    let resultado = await controllerRespostaVerdadeiroFalso.getListarRespostasVF();
    res.status(resultado.status_code).json(resultado);
});

// Endpoint: Buscar resposta de correspondência por ID
app.get('/v1/studyfy/resposta-vf/:id', async (req, res) => {
    let idResposta = req.params.id;
    let resultado = await controllerRespostaVerdadeiroFalso.getBuscarRespostaVFById(idResposta);
    res.status(resultado.status_code).json(resultado);
});


// Endpoint: Inserir nova resposta de lacunas
app.post('/v1/studyfy/resposta-vf', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultDadosVF = await controllerRespostaVerdadeiroFalso.setInserirNovaRespostaVF(dadosBody, contentType);
    response.status(resultDadosVF.status_code);
    response.json(resultDadosVF);
});


// EndPoint: Atualiza questão pelo ID
app.put('/v1/studyfy/resposta-vf/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idVF = request.params.id;
    let dadosRespostaVF = await controllerRespostaVerdadeiroFalso.setAtualizarRespostaVF(idVF, dadosBody, contentType);
    response.status( dadosRespostaVF.status_code);
    response.json( dadosRespostaVF);
});


// Endpoint: Deletar resposta de correspondência
app.delete('/v1/studyfy/resposta-vf/:id', async (req, res) => {
    let idResposta = req.params.id;
    let resultado = await controllerRespostaVerdadeiroFalso.setExcluirRespostaVF(idResposta);
    res.status(resultado.status_code).json(resultado);
});





//       --------------------   CRUD SALAS ---------------------        //


// Endpoint: Listar todas as respostas de correspondência
app.get('/v1/studyfy/salas', async (req, res) => {
    let resultado = await controllerSalas.getSalas();
    res.status(resultado.status_code).json(resultado);
});


// Endpoint: Buscar resposta de correspondência por ID
app.get('/v1/studyfy/salas/:id', async (req, res) => {
    let idSala = req.params.id;
    let resultado = await controllerSalas.getBuscarSalaId(idSala);
    res.status(resultado.status_code).json(resultado);
});


// Endpoint: Inserir nova resposta de lacunas
app.post('/v1/studyfy/sala', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultDadosSala = await controllerSalas.setInserirNovaSala(dadosBody, contentType);
    response.status(resultDadosSala.status_code);
    response.json(resultDadosSala);
});


// EndPoint: Atualiza questão pelo ID
app.put('/v1/studyfy/sala/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idSala = request.params.id;
    let dadosRespostasSala = await controllerSalas.setAtualizarSala(idSala, dadosBody, contentType);
    response.status( dadosRespostasSala.status_code);
    response.json( dadosRespostasSala);
});


// Endpoint: Deletar resposta de correspondência
app.delete('/v1/studyfy/sala/:id', async (req, res) => {
    let idRespostaSala = req.params.id;
    let resultado = await controllerSalas.setExcluirSala(idRespostaSala);
    res.status(resultado.status_code).json(resultado);
});



//       --------------------   SELECT ALUNO SALA  ---------------------        //


// Endpoint: Listar todas as respostas de correspondência
app.get('/v1/studyfy/salas-Aluno/:salaId', async (req, res) => {
    try {
        const { salaId } = req.params; // Pega o ID da sala dos parâmetros da rota
        let resultado = await controllerAluno.getListarAlunosPorSala(salaId); // Chama a função da controller
        res.status(resultado.status_code).json(resultado); // Retorna o resultado
    } catch (error) {
        console.log(error);
        res.status(500).json({ status_code: 500, message: 'Erro interno do servidor.' });
    }
});





//       --------------------   CRUD RANK ---------------------        //


// Endpoint: Listar todas as respostas de correspondência
app.get('/v1/studyfy/rank', async (req, res) => {
    let resultado = await controllerRank.getRank();
    res.status(resultado.status_code).json(resultado);
});


// Endpoint: Buscar resposta de correspondência por ID
app.get('/v1/studyfy/rank/:id', async (req, res) => {
    let idRank = req.params.id;
    let resultado = await controllerRank.getBuscarRankId(idRank);
    res.status(resultado.status_code).json(resultado);
});


// Endpoint: Inserir nova resposta de lacunas
app.post('/v1/studyfy/rank', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultDadosRank = await controllerRank.setInserirNovoRank(dadosBody, contentType);
    response.status(resultDadosRank.status_code);
    response.json(resultDadosRank);
});


// EndPoint: Atualiza questão pelo ID
app.put('/v1/studyfy/rank/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let idRank = request.params.id;
    let dadosRank = await controllerRank.setAtualizarRank(idRank, dadosBody, contentType);
    response.status(dadosRank.status_code);
    response.json( dadosRank);
});


// Endpoint: Deletar resposta de correspondência
app.delete('/v1/studyfy/rank/:id', async (req, res) => {
    let idRank = req.params.id;
    let resultado = await controllerRank.setExcluirRank(idRank);
    res.status(resultado.status_code).json(resultado);
});
