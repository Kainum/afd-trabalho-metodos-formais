// classes para os objetos estados
class State {

    constructor(nome, final) {
        this.nome = nome;
        this.final = final;
        this.caminhos = {};
    }

}

// função do delay
function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function verificar () { 
    let palavra = document.getElementById('palavra').value;

    myArray = palavra.split("");

    let currentState = list[0];

    let passou = true;

    console.log("===========================================");
    console.log("Verificando a palavra: " + palavra);
    for (let i = 0; i < myArray.length; i++) {
        if (currentState.caminhos[myArray[i]] != undefined) {
            let lastState = currentState.nome;
            currentState = currentState.caminhos[myArray[i]];

            console.log("index " + i + " : " + lastState + " - " + myArray[i] + " -> " + currentState.nome);
        } else {
            passou = false;

            console.error("Erro no index " + i + ". Caractere \"" + myArray[i] + "\" não encontrado no estado \"" + currentState.nome + "\"");
            alert("Palavra não ok. Erro no index " + i);
            break;
        }
        await sleep(delay);
    }

    if (passou) {
        if (currentState.final) {
            alert("Palavra ok");
        } else {
            console.error("Estado \"" + currentState.nome + "\" não é final.");
            alert("Palavra não ok. Estado \"" + currentState.nome + "\" não é final.");
        }
    }

}

function updateDelay () {
    let value = document.getElementById('delay').value;
    document.getElementById('pDelay').innerHTML = value;

    delay = value * 1000;
}

// ========================= INICIO =========================

let delay;

updateDelay();

let list = [
    new State("q0", false),
    new State("q1", false),
    new State("q2", false),
    new State("q3", true),
    new State("q4", true),
];

list[0].caminhos["a"] = list[1];
list[1].caminhos["a"] = list[3];
list[1].caminhos["b"] = list[2];
list[2].caminhos["a"] = list[4];
list[2].caminhos["b"] = list[2];
list[3].caminhos["a"] = list[3];
list[3].caminhos["b"] = list[2];
list[4].caminhos["a"] = list[3];
list[4].caminhos["b"] = list[2];