(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_clientes')) ?? [];
}

function setLocalStorage(bd_clientes) {
  localStorage.setItem('bd_clientes', JSON.stringify(bd_clientes));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { 
  limparTabela();
  const bd_clientes = getLocalStorage();
  let index = 0;
  for (cliente of bd_clientes) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${cliente.nome}</td>
        <td>${cliente.modelo}</td>
        <td>${cliente.cor}</td>
        <td>${cliente.anofabr}</td>
        <td>${cliente.velmax}</td>
        <td>${cliente.numplaca}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() { 
  const cliente = {
    nome: document.getElementById('nome').value,
    modelo: document.getElementById('modelo').value,
    cor: document.getElementById('cor').value,
    anofabr: document.getElementById('anofabr').value,
    velmax: document.getElementById('velmax').value,
    numplaca: document.getElementById('numplaca').value,
  }
  const bd_clientes = getLocalStorage();
  bd_clientes.push(cliente);
  setLocalStorage(bd_clientes);
  atualizarTabela();
}

function excluir(index) { 
  const bd_clientes = getLocalStorage();
  bd_clientes.splice(index, 1);
  setLocalStorage(bd_clientes);
  atualizarTabela();
}

function validarSerial() { 
  const bd_clientes = getLocalStorage();
  for (cliente of bd_clientes) {
    if (numplaca.value == cliente.numplaca) {
      numplaca.setCustomValidity("Esta placa já existe!");
      feedbackNumSerial.innerText = "Esta placa já existe!";
      return false;
    } else {
      numplaca.setCustomValidity("");
      feedbackNumSerial.innerText = "Informe o número da placa corretamente.";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada
const numplaca = document.getElementById("numplaca");
const feedbackNumSerial = document.getElementById("feedbackNumSerial");
numplaca.addEventListener('input', validarSerial);
