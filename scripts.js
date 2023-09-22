/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/chamados';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.chamados.forEach(item => insertList(item.id,item.nome, item.descricao, item.prioridade))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um chamado na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputName, inputDesc, inputPriority) => {
  const formData = new FormData();
  formData.append('nome', inputName);
  formData.append('descricao', inputDesc);
  formData.append('prioridade', inputPriority);

  let url = 'http://127.0.0.1:5000/chamado';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("✓");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um chamado da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const idItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Quer encerra o chamado ?")) {
        div.remove()
        deleteItem(idItem)
        alert("Chamado Encerrado!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um Chamado da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/chamado?id=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo chamado com nome, descricao e prioridade 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  window.location.reload(false);
  let inputName = document.getElementById("newInput").value;
  let inputDesc = document.getElementById("newDesc").value;
  let inputPriority = document.getElementById("newPriority").value;

  if (inputName === '') {
    alert("Escreva o nome ddo solicitante!");
  } else if ((inputDesc === '') || (inputPriority === '')) {
    alert("Descricao e Prioridade precisam ser inseridas!");
  } else {
    postItem(inputName, inputDesc, inputPriority)
    alert("Chamado criado!")
    getList()
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (id,nameSolicitante, decricao, priority) => {
  var item = [id,nameSolicitante, decricao, priority]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newDesc").value = "";
  document.getElementById("newPriority").value = "";
  

  removeElement()
}
