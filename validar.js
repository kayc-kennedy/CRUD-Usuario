function validarCep(cep){
    let tamanho = cep.length;
    let posicao = 5;

    let formatacao = cep.substring(posicao, posicao + 1); 

    if(tamanho == 9){
        if(formatacao == '-'){

            return true;
        }
        return false;
    }
    return false;

}


function apresentarData(data){
    let dia;
    let ano;
    let mes;

    ano = data.substring( 6,  10);
    mes = data.substring(3, 5);
    dia = data.substring( 0, 2);
    
    
    let dataFormatada = (`${ano}-${mes}-${dia}`);
    
    return dataFormatada;
  

}

function formatarData(data){
    let dia;
    let ano;
    let mes;

    dia = data.substring( 8,  10);
    mes = data.substring(5, 7);
    ano = data.substring( 0, 4);
    

    let dataFormatada = (`${dia}/${mes}/${ano}`);
    
    return dataFormatada;
    
    
}

module.exports = {validarCep, formatarData, apresentarData};