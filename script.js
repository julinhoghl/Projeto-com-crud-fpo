// Ids de variaveis
const campoId = document.getElementById("campoId");
const campoNome = document.getElementById("campoNome");
const campoEmail = document.getElementById("campoEmail");
const campoIdade = document.getElementById("campoIdade");
const campoCurso = document.getElementById("campoCurso");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const mensagem = document.getElementById("mensagem");
const corpoTabela = document.getElementById("corpoTabela");
const linhaVazia = document.getElementById("linhaVazia");
const contadorAlunos = document.getElementById("contadorAlunos");

// Variaveis arrays de Alunos
const alunosCadastrados = [];
let identificadorUnico = 1;

// --------------------------funçoes------------------------------

// Função exibir Mensagem

function exibirMensagem(texto, tipo) {
  mensagem.textContent = texto;

  if (tipo === "erro") {
    mensagem.classList.add("erro");
  } else {
    mensagem.classList.remove("erro");
  }
}

//função validar usuario

function validarUsuario() {
  if (campoNome.value.trim() === "") {
    exibirMensagem("Informe o seu nome.", "Erro");
    return false;
  }

  if (campoEmail.value.trim() === "") {
    exibirMensagem("Informe o seu emaill.", "Erro");
    return false;
  }

  if (campoIdade.value.trim() === "") {
    exibirMensagem("Informe sua idade.", "Erro");
    return false;
  }

  if (campoCurso.value.trim() === "") {
    exibirMensagem("Informe o curso.", "Erro");
    return false;
  }
  return true;
}

// função cadastrar aluno

function cadastrarAluno() {
  const novoAluno = {
    id: identificadorUnico,
    nome: campoNome.value.trim(),
    email: campoEmail.value,
    idade: campoIdade.value,
    curso: campoCurso.value,
  };
  alunosCadastrados.push(novoAluno);
  identificadorUnico++;
}

// funcao limpar formulario

function limparFormulario() {
  campoId.value = "";
  campoNome.value = "";
  campoEmail.value = "";
  campoIdade.value = "";
  campoCurso.value = "";
}

// função da tabela

function renderizarTabela() {
  corpoTabela.innerHTML = "";

  alunosCadastrados.forEach(function (aluno) {
    const linha = document.createElement("tr");

    linha.innerHTML = `
    <td>${aluno.id}</td>
    <td>${aluno.nome}</td>
    <td>${aluno.email}</td>
    <td>${aluno.idade}</td>
    <td>${aluno.curso}</td>
    <td>
    <button class="btn-editar" data-id="${aluno.id}">Editar</button>
    <button class="btn-apagar" data-id="${aluno.id}">Apagar</button>
    </td>
    
  `;
    corpoTabela.appendChild(linha);
  });
  contadorAlunos.textContent = alunosCadastrados.length;
}

// funçao apagar aluno

function apagarAluno(id) {
  if (!confirm("Deseja realmente apagar?")) return;
  const indice = alunosCadastrados.findIndex(function (p) {
    return p.id === id;
  });
  if (indice !== -1) {
    alunosCadastrados.splice(indice, 1);
    renderizarTabela();
  }
}

// funçao editar aluno

function editarAluno(id) {
  const prod = alunosCadastrados.find(function (p) {
    return p.id === id;
  });
  campoNome.value = prod.nome;
  campoEmail.value = prod.email;
  campoIdade.value = prod.idade;
  campoCurso.value = prod.curso;
  campoId.value = prod.id; // campo oculto
  btnCancelar.style.display = "inline-block";
}

// funçao atualizar

function atualizarAluno() {
  const id = Number(campoId.value);
  const indice = alunosCadastrados.findIndex(function (p) {
    return p.id === id;
  });
  alunosCadastrados[indice].nome = campoNome.value.trim();
  alunosCadastrados[indice].email = campoEmail.value;
  alunosCadastrados[indice].idade = campoIdade.value;
  alunosCadastrados[indice].curso = campoCurso.value;
}

// -----------------------botoes----------------------

// qual botao foi clicado

corpoTabela.addEventListener("click", function (evento) {
  const alvo = evento.target;
  const id = Number(alvo.dataset.id);
  if (alvo.classList.contains("btn-editar")) editarAluno(id);
  if (alvo.classList.contains("btn-apagar")) apagarAluno(id);
});

// botao salvar
btnSalvar.addEventListener("click", function () {
  if (!validarUsuario()) return;

  if (campoId.value !== "") {
    atualizarAluno(); // modo edição
  } else {
    cadastrarAluno(); // modo cadastro
  }

  renderizarTabela();
  limparFormulario();
  exibirMensagem("Cadastro salvo", "sucesso");
});

// botao cancelar
btnCancelar.addEventListener("click", function () {
  limparFormulario();
  btnCancelar.style.display = "none";
});
