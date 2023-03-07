// preencher o  formulario com os  dados de reotrno da API
function preencherFormulario(endereco) {
    document.getElementById("endereco").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("estado").value = endereco.uf;
    document.getElementById("ibge").value = endereco.ibge;
    document.getElementById("ddd").value = endereco.ddd;
    document.getElementById("siafi").value = endereco.siafi;
}


// função para pesquesar o CEP  via API

//verefica se o que foi digitado pelo usuario é somente numero
function eNumero(numero){
    return /^[0-9]+$/.test(numero);
}

//vereficar se o cep possui tamanho 8 é só possui numero
function cepValido(cep) {
    return cep.length == 8 && eNumero (cep);
}

// função para pesquisar o CEP via API
async function pesquesarCEP(){

    const cep = document.getElementById("cep").value.replace("-","");
    const url = `https://viacep.com.br/ws/${cep}/json`;

    if( cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        console.log(endereco);
        if (endereco.hasOwnProperty("erro")){
            document.getElementById("endereco").value = "CEP não encontrado!"
        } else {
            preencherFormulario(endereco);
        }


    } else {
        document.getElementById("endereco").value = "CEP incorreto"
    }

    // nova tentativa

    if( cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        console.log(endereco);
        if (endereco.hasOwnProperty("erro")){
            document.getElementById("endereco").value = "CEP não encontrado!"
        } else {
            preencherFormulario(endereco);
        }


    } else {
        document.getElementById("endereco").value = "CEP incorreto"
    }
}

document.getElementById("cep").addEventListener("focusout",pesquesarCEP);

var cep = document.getElementById('cep');
cep.addEventListener("focusin",() => limparCampos()); // função para limpar os campos 
cep.addEventListener("focusin",() => limparEndereco(cep.value));

function limparCampos() {
        cidade.value = "";
        estado.value = "";
        bairro.value = "";
        ibge.value = "";
        ddd.value = "";
        siafi.value = "";
}
