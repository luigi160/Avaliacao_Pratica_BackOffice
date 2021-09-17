//CODIGO ESCRITO PARA NODE.JS 
// Para que o codigo funcione sera necessario instalar os modulos na pasta raiz do projeto (Explicação abaixo)
// NO TERMINAL, utilizar o comando "npm install" utilizando o caminho da pasta raiz do projeto
// O comando "npm install", instala os modulos necessarios de acordo com o historico da pasta json

//Início do código mandando uma requisição ao arquivo JSON

const request = require('request');

url = 'https://storage.googleapis.com/raccoon-humane/psel.json'

request(url, { json: true }, (err, res) => {

    //Qualquer mudança na URL console imprimi um erro
    if (err) { return console.log(err); }

    
    //Console retorna o STATUS CODE da requisição . Status==200 : Requisição Bem Sucedida
    console.log("Status: "+ res.statusCode)
    
    
    const objs = res.body
    
    
    
        
     
        
       
        for(i=0; i<objs.length; i++){
        
        //Variaveis recebendo os valores das chaves dos objetos

        const {cpf} = objs[i]
        const {cargo} = objs[i]
        const {salario} = objs[i]
        
        //Criacao de variaveis auxiliares para usar como parametro nas funcoes
        var cpf_aux = cpf;
        var cargo_aux = cargo;
        var salario_aux = salario;
        
        //Funcao replace tira os "-" e "." do cpf
        cpf_aux = cpf_aux.replace('.','').replace('.','').replace('.','').replace('-','')
        
        //para testar funcionalidade da funcao replace descomentar linha abaixo
        //console.log(cpf_aux)

        objs[i].cpf_valido = ValidaCpf(cpf_aux)
        objs[i].adicional_insalubridade = Calcula_Insalubridade(salario_aux,cargo_aux)
        
    }
        
     
    //Funcao para validar CPF
    
    function ValidaCpf (cpf_aux)

    {
        //1ª Etapa da validacao do 1º Digito
        
        soma = 0
        avetx=[10,9,8,7,6,5,4,3,2]
        for(nx=0;nx<9;nx++)
        {
            
            soma+=(parseInt(cpf_aux[nx].substring(0,8))*avetx[nx])
            
            
        }
        
        soma = soma%11;

        if (soma==10 || soma==11)
        {
        soma=0
        } 
        
        //2ª Etapa da validacao do 2º Digito
        
        soma_aux = 0
        
        avety=[11,10,9,8,7,6,5,4,3,2]  
      for(ny=0;ny<10;ny++)
      {
          
        soma_aux+=(parseInt(cpf_aux[ny].substring(0,9))*avety[ny])
          
          
        }
      
        

      soma_aux = soma_aux%11;
    
        if (soma_aux==10 || soma_aux==11)
        {
         soma_aux=0;
        }
        //PARA TESTE DE RESULTADOS DA PRIMEIRA SOMA/MULT E RESTO DA DIVISAO, DESCOMENTAR LINHA DE BAIXO
        //console.log(soma)
        
        //PARA TESTE DE RESULTADOS DA SEGUNDA SOMA/MULT E RESTO DA DIVISAO, DESCOMENTAR LINHA DE BAIXO
        //console.log(soma_aux)
        
        //SE SOMA FOR DIFERENTE DO 1º DIGITO DO CPF RETORNA FALSO
        if(soma!=cpf_aux[9])
       { 
        
        return false
            
        }    
        //SE SOMA_AUX FOR DIFERENTE DO 2º DIGITO DO CPF RETORNA FALSO
        if(soma_aux!=cpf_aux[10])
        {
            return false
        }
        
        //SENAO RETORNA VERDADEIRO
       else return true
    }
        
        //Funcao para calcular Insalubridade

        function Calcula_Insalubridade (salario_aux,cargo_aux){
                
            var insalubridade = 0
                
            //Condicionais de acordo com os cargos ocupados para o calculo da insalubridade

                if(cargo_aux =='Butler')
                {
                        insalubridade = 0
                        return insalubridade
                }

                if(cargo_aux == 'Assassin')
                {
                    insalubridade = salario_aux*0.05
                    return insalubridade
                }

                if(cargo_aux == 'Batman')
                {

                    insalubridade = salario_aux*0.10
                    return insalubridade
                }

                if(cargo_aux == 'Side Kick')
                {
                    insalubridade = salario_aux*0.15
                    return insalubridade

                }

                if(cargo_aux == 'The Chief Demon')
                {
                    insalubridade = salario_aux*0.125
                    return insalubridade

                }


        }
     
        console.log(objs)
  

});

