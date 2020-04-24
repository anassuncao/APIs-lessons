const baseURL = "https://ci-swapi.herokuapp.com/api/";

//var xhr = new XMLHttpRequest(); //cria um novo instance da função HMLHttpRequest. Foi comented out para aprendermos a função Callback
// var data; //Foi criada para armazenar e podermos depois manipular o conteúdo do objecto a que acedemos com a última função. Foi retirada depois para aprendermos a função Callback

//Para aprender o Callback apagámos a variável data e criámos a seguinte função: com o código e variáveis que usámos antes:
function getData(type, cb) { //cb significa Callback
  var xhr = new XMLHttpRequest();

  //xhr.open("GET", "https://ci-swapi.herokuapp.com/api/"); //Indica que queremos aceder (GET) a info no site ci-swapi.
  xhr.open("GET", baseURL + type + "/"); //Tiramos daqui o link e criamos uma constante para o colocar fora da função e substituimos o argumento que ele estava a preencher pelo que lá está agora a seguir à vírgula.
  xhr.send();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(this.responseText));
    }
  };
}

//Como o botão os dados relativos a "films" não têm uma key chamada "name", não conseguimos aceder aos dados com a mesma função. Vamos criar outra que permita mostrar os dados em formato tabela.
function getTableHeaders(obj) {
    var tableHeaders = []; //criamos uma array vazia onde vamos armazenar depois os dados.

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}


function writeToDocument(type) {
    var tableRows = [];
    var el = document.getElementById("data");//criar esta variável permite armazenar aqui os dados para que depois possamos usar o seguinte para limpar o ecrã sempre que clicamos no botão.
    el.innerHTML = ""; //Isto limpa o ecrã cada vez que o botão é clicado. Assim os resultados não acumulam sempre que clicamos num botão.
    getData(type, function(data) {
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item){
            var dataRow = [];

            Object.keys(item).forEach(function(key){
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`); //Esta forma de escrever o template literal permite mostrar cada nome de key existente dos dados e não apenas um determinado key name do index que pudessemos ter seleccionado.
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
            
           // el.innerHTML += "<p>" + item.name + "</p>";
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    }); //Para isto funcionar temos de fazer algumas mudanças no código acima. Assim, vou comment out o que fiz antes para não perder a informação e reescrever.
}

/* Retiramos a função seguinte e a getData para substituirmos por uma que permite publicar mesmo o site em vez de apenas vermos as coisas na consola.
function printDataToConsole(data) {
    console.log(data);
}

getData(printDataToConsole);

/*
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { //o numero 4 indica que queremos que esta função ocorra quando a operação está completa. Fazer pesquisa na net por "xhr readystate" para mais info sobre estes estados.
        //o número 200 refere-se ao status do http, significa "request succeded, content delivered". Na net tb há mais info sobre isto. O mais comum é o "404 page not found", por ex.
        document.getElementById("data").innerHTML = this.responseText;
    } //Depois de sabermos que as condições definidas foram verificadas, usamos o método getElementById para aceder ao #data no DOM e o innerHTML para substituir o responseText pelo que resulta do nosso objecto xhr.
}; */

/*
xhr.open("GET", "https://ci-swapi.herokuapp.com/api/"); //Indica que queremos aceder (GET) a info no site ci-swapi.
xhr.send(); //Permite enviar o pedido anterior de acesso à info.

/*
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(typeof(JSON.parse(this.responseText)));
    } //Esta função permite transformar o responseText de uma string (que veio da função anterior que está comented out) para um objecto que é o que precisamos.
}*/

/*
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(this.responseText));
    } //Esta função permite ver o conteúdo do objecto em vez de nos dizer apenas que é um objecto.
} */

/*
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = this.responseText;
    } //Se fizermos um console.log a esta função só funcionará se ficar dentro da função. Isto porque se estiver fora é executado antes do if statement estar garantido e portanto não tem
};    //info para mostrar. Se colocarmos o console.log dentro desta função obrigar-nos-ia a escrever todo o código que queremos dentro desta função, o que torna tudo confuso e vai contra
      // as boas práticas. */

/*
function setData(jsonData) {
  data = jsonData;
  //console.log(data);
} /*Criamos esta função para conseguirmos retirar a variável data de dentro da função e podermos aceder ao seu conteúdo sem ter que ser dentro da função anterior. No entanto, continuamos
   a estar dentro de uma função, o que não resolve o nosso problema. Vamos ter que recorrer à função setTimeout */

/*
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        setData(JSON.parse(this.responseText));
    }
}; */

/*
setTimeout(function () {
  console.log(data);
}, 500);
//Esta função pode ter dois argumentos. O primeiro é uma função que definimos como sendo para fazer console.log à variável data. O segundo é um parâmetro em milisegundos que indica o tempo
//que queremos que o programa espere antes de correr.

//Como o setTimeout funcionou, podemos voltar a ter a seguinte função:
/*
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText);
    } 
}; */
