const express = require('express');
const router = express.Router();
const dados = require('./Dados');

const validar = require('./validar');

router.get('/clientes', async (req,res)=>{
    let cli = new dados.Cliente();

    res.render('users', { cliente : cli, lista : await dados.GetListaClientes()});
});

router.post('/clientes/:id',async (req,res)=>{
    let id = req.params.id; 
    let cli = dados.CarregaClientePorCodigo(id);
    
    cli.data = validar.apresentarData(cli.data);

    res.render('edit', { cliente : cli, lista : await dados.GetListaClientes()});
});


router.post('/clientes/del/:id', async (req,res) => {
    let id = req.params.id; 
    await dados.DeletaClientePorCodigo(id);
    res.redirect('/clientes');
});


router.post('/clientes', async  (req,res) => {
    var erros = [];
    var erroMsg = '';
    let cli = new dados.Cliente();

    let {codigo, nome, sobreNome, senha, email, sexo, cpf, telefone, data, estado, cep, endereco, rg} = req.body;

    data =  validar.formatarData(data);
    
    
    cli = {codigo, nome, sobreNome, senha, email, sexo, cpf, telefone, data, estado, cep, endereco, rg};
    
    

    if(req.body.estado == 'Estado Civil'){
        cli.estado = ''
    }else{
        cli.estado = cli.estado.substring(0,1).toUpperCase(0,1);
    }

    if(req.body.sexo == 'Sexo'){
        cli.sexo = ''
    }else{
        cli.sexo = cli.sexo.substring(0,1).toUpperCase(0,1);    
    }
    
    if (cli.codigo != '' && cli.nome != '' && cli.sobreNome != '' && cli.senha != '' && cli.email != '' &&  validar.validarCep(cep)){
        
        await dados.AddClientes(cli);
        cli = new dados.Cliente();       
      
    
    }else{

        if (cli.codigo == '' ){
            erros.push('Código')
        }
        
        if (cli.nome == '' ){
            erros.push('Nome')
        }

        if (cli.sobreNome == '' ){
            erros.push('Sobrenome')
        }

        if (cli.senha == ''){
            erros.push('senha')
        }

        if (cli.email == ''){
            erros.push('email')
        }
        if( validar.validarCep(cep) == false){
            erros.push('cep');
        }

        if (erros.length > 0){
            erroMsg = ' Campos inválidos ou vazios: (' + erros.join(',')+')';
        }

        
    }
    res.render('cadastro', {cliente : cli, lista : await dados.GetListaClientes(), erroMsg : erroMsg});
});


router.get('/cadastroUser', (req, res)=> {
    res.render('cadastro')
});

module.exports = router;