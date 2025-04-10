//Busca informações pelo Cep
$("#busca-cep").on("click", ()=>{
    const cep = $("#cep").val();

    //faz uma requisição ao API viacep para obter os dados do cep digitado
    fetch(`https://viacep.com.br/ws/${cep}/json/`)

    //converte oque vier para json
    .then((res)=>{
        return res.json()
    })

    //remove campos que não deseja ser visto
    .then((cep)=>{

        delete cep.unidade
        delete cep.complemento
        delete cep.ibge
        delete cep.regiao
        delete cep.gia
        delete cep.siafi
        delete cep.uf
        delete cep.ddd



        //monta uma lista com os dados que sobraram e coloca ela no elemento #lista-cep
        lista = ""

        for(let prop in cep){
            lista += `<li class="collection-item">${prop.toUpperCase()}: ${cep[prop]}</li>`
        }

        $("#lista-cep").html(lista)
    })
})
//Busca informações pelo Cep

//-----------------------------------------------------------------------------------------------------------------------------------------------------

//Carregar os estados brasileiros
$(document).ready(() => {

    //faz um requisição ao API do IBGE, para obter os estados
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then(res => res.json())

        .then(ufs => {
            //cria a lista, e antes de clicar aparece a mensagem para selecionar um estado
            let listaUf = `<option value="" disabled selected>Selecione um estado</option>`;

            ufs.forEach(uf => {
                listaUf += `<option value="${uf.sigla}">${uf.nome}</option>`;
            });

            //cria uma lista dentro de select
            $("#uf").html(listaUf);
        });

    $("#uf").change(() => {

        //obtem a sigla do estado selecionado
        let ufSigla = $("#uf").val();
       
        //faz um requisição ao API do IBGE, para obter as cidades do estado escolhido
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSigla}/municipios`)
            .then(res => res.json())
            .then(cidades => {

                //cria a lista, e antes de clicar aparece a mensagem para selecionar uma cidade, após ter escolhido um estado
                let listaCity = `<option value="" disabled selected>Selecione uma cidade</option>`;

                //cria uma lista dentro de select
                cidades.forEach(cidade => {
                    listaCity += `<option value="${cidade.nome}">${cidade.nome}</option>`;
                });

                //atualiza o campo select
                $("#cidade").html(listaCity);
            });
    });
});
//Carregar os estados brasileiros


//-----------------------------------------------------------------------------------------------------------------------------------------------------


//Buscar dados das ruas pelo nome da rua, estado e cidade
$("#busca-rua").on("click", () => {
    //obtem o estado, cidade e nome da rua informado
    const uf = $("#uf").val();
    const cidade= $("#cidade").val();
    const rua = $("#street").val();

    //faz uma requisição ao API viacep, para trazer ruas com base nesses dados
    fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`)
        .then(res => res.json())

        //remove campos que não deseja ser visto
        .then(ruas => {

            for(let rua of ruas){
                delete rua.unidade
                delete rua.complemento
                delete rua.ibge
                delete rua.regiao
                delete rua.gia
                delete rua.siafi
                delete rua.uf
                delete rua.ddd
            }

            let lista = "";


            //Cria um html com os dados das ruas encontradas, 
            ruas.forEach(rua => {
                lista += `
                <ul style="border-radius: 10px; box-shadow: 0px 3px 10px #dad4d4;" class="collection">
                    <li class="collection-item"><strong>Estado:</strong> ${rua.estado}</li>
                    <li class="collection-item"><strong>Cidade:</strong> ${rua.localidade}</li>
                    <li class="collection-item"><strong>Bairro:</strong> ${rua.bairro}</li>
                    <li class="collection-item"><strong>Rua:</strong> ${rua.logradouro}</li>
                    <li class="collection-item"><strong>CEP:</strong> ${rua.cep}</li>
                </ul>
                <div style="text-align: center; font-weight: 900;">...</div>`;
            });
            
            $("#lista-ruas").html(lista);
        })
});
//Buscar dados das ruas pelo nome da rua, estado e cidade

//-----------------------------------------------------------------------------------------------------------------------------------------------------

//
document.addEventListener("DOMContentLoaded", function () {
    const listaRuas = document.getElementById("lista-ruas");
    const blocoFundo = document.getElementById("test2");

    const atualizarAltura = () => {
        const alturaBase = 150; 
        const alturaExtra = listaRuas.scrollHeight; 
        blocoFundo.style.height = `${alturaBase + alturaExtra}px`; 
    };

    
    const observer = new MutationObserver(atualizarAltura);
    observer.observe(listaRuas, { childList: true, subtree: true });

    
    document.getElementById("busca-rua").addEventListener("click", function () {
        setTimeout(atualizarAltura, 500); 
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const listaRuas = document.getElementById("lista-cep");
    const blocoFundo = document.getElementById("test1");

    const atualizarAltura = () => {
        const alturaBase = 120;
        const alturaExtra = listaRuas.scrollHeight;
        blocoFundo.style.height = `${alturaBase + alturaExtra}px`;
    };

    const observer = new MutationObserver(atualizarAltura);
    observer.observe(listaRuas, { childList: true, subtree: true });

    document.getElementById("busca-cep").addEventListener("click", function () {
        setTimeout(atualizarAltura, 500);
    });
});