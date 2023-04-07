var produto, index, pesquisaElemento;
var produtos = [];

function cadProduto(codigo, nome, tipo, valor, estoque) {
    
	/*
	** valida os itens que estão sendo passados
	*/
	
	

	if (codigo != "" && nome != "" && tipo != ""){
		
		produto = document.getElementById("tbProdutos");    
		var qtdlLinhas = produto.rows.length;
		var linha = produto.insertRow(qtdlLinhas);
		var linhaParam;

		var cellCodigo = linha.insertCell(0);
		var cellNome = linha.insertCell(1);
		var cellTipo = linha.insertCell(2);
		var cellValor = linha.insertCell(3);
		var cellEstoque = linha.insertCell(4);  

		cellCodigo.innerHTML = codigo;
		cellNome.innerHTML = nome;
		cellTipo.innerHTML = tipo;
		cellValor.innerHTML = valor;
		cellEstoque.innerHTML = estoque;
		
		/* 
		** Os valores serao armazenados em um local storage
		** dentro de um objeto JSON
		*/
		
		/*
		** transforma o objeto JSON em uma string para poder armazenar
		*/
		var objProduto = JSON.stringify({
			"codigo": codigo,
			"nome": nome,
			"tipo":tipo,
			"valor":valor,
			"estoque":estoque
		});
		
		/*
		** como o local storage armazena o par chave:valor o codigo vai ser a chave
		** e o valor um objeto com todos os valores
		*/
		localStorage.setItem(codigo, objProduto);
        atualizaProdutosCadastrados();

		preencheCamposForm();	
		
		alert("Produto Foi Cadastrado com Sucesso!");
	}else{
		alert("Os campos: Código, Nome e Tipo do produto são obrigatórios. ");
	}
	
}

function adicionaBuscaListener(){
	
	// Get the input field
       var input = document.getElementById("ibusca");

      // Execute a function when the user releases a key on the keyboard
      input.addEventListener("keyup", function(event) {
     // Number 13 is the "Enter" key on the keyboard
     if (event.keyCode === 13) {
     // Cancel the default action, if needed
      event.preventDefault();
    // Trigger the button element with a click
    //document.getElementById("myBtn").click();
	produtosPesquisa(input.value);
	
  }
});

}


/*
**
*/

function atualizaProdutosCadastrados(){
	produtos = [];
		var keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        produtos.push( localStorage.getItem(keys[i]) );
    }
	
	
}


function produtosInit(){	  
	
	var keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        produtos.push( localStorage.getItem(keys[i]) );
    }
			
	popularTabelas(produtos);	
}


function selecionaProdutos(valor){
		
	var objProdutoJson = JSON.parse(valor);
	var obtProdutoStr  = JSON.stringify({"tipo":objProdutoJson["tipo"],"nome":objProdutoJson["nome"]});
	
	if(obtProdutoStr.toUpperCase().includes(pesquisaElemento.toUpperCase()))
	
	{
		return valor;
	}
	
}

function produtosPesquisa(buscaElemento){

    pesquisaElemento = buscaElemento;
	
    var produtosBusca = produtos.filter(selecionaProdutos);
	
	produto = document.getElementById("tbProdutos"); 
	
	i = produto.rows.length;	
	
	while( -- i ){
	   produto.deleteRow(1); 	
	}
	
	popularTabelas(produtosBusca);
	
}


/*
** funcao para popular as tabelas com os itens do storage
*/

function popularTabelas(produtos){	
   
    produto = document.getElementById("tbProdutos");    
	
	for(var j=0; j<produtos.length; j++){
		
		produtoStr = JSON.parse(produtos[j]);
		
		var qtdlLinhas = produto.rows.length;
        var linha = produto.insertRow(qtdlLinhas);  
        var cellCodigo = linha.insertCell(0);
        var cellNome = linha.insertCell(1);
        var cellTipo = linha.insertCell(2);
        var cellValor = linha.insertCell(3);
        var cellEstoque = linha.insertCell(4);  

        cellCodigo.innerHTML = produtoStr["codigo"];
        cellNome.innerHTML = produtoStr["nome"];
        cellTipo.innerHTML = produtoStr["tipo"];
        cellValor.innerHTML = produtoStr["valor"];
        cellEstoque.innerHTML = produtoStr["estoque"];
		
	}	
	
	preencheCamposForm();	
}


function preencheCamposForm() {
    for(var i = 0; i < produto.rows.length; i++) {
        produto.rows[i].onclick = function() {
            index = this.rowIndex;
            document.getElementById("txtCodigo").value = produto.rows[index].cells[0].innerText;
            document.getElementById("txtNome").value = produto.rows[index].cells[1].innerText;
            document.getElementById("txtTipo").value = produto.rows[index].cells[2].innerText;
            document.getElementById("txtValor").value = produto.rows[index].cells[3].innerText;
            document.getElementById("txtEstoque").value = produto.rows[index].cells[4].innerText;
        }
    }
   
}

function alterar(codigo, valor, estoque) {
    produto.rows[index].cells[3].innerHTML = valor;
    produto.rows[index].cells[4].innerHTML = estoque;
	
	
	var auxobjProduto = localStorage.getItem(codigo);
	var auxJsonProduto = JSON.parse(auxobjProduto);
	
	var objProduto = JSON.stringify({
        "codigo": auxJsonProduto["codigo"],
        "nome": auxJsonProduto["nome"],
		"tipo":auxJsonProduto["tipo"],
		"valor":valor,
		"estoque":estoque
    });
		

	localStorage.setItem(codigo, objProduto);
	
	atualizaProdutosCadastrados();
	
    alert("Produto Foi Alterado com Sucesso!");
}

function delRegistro(codigo) {
    alert("Produto Foi Deletado com Sucesso!");
	
	localStorage.removeItem(codigo);
    atualizaProdutosCadastrados();	
	
    for(var i = 0; i < produto.rows.length; i++) {
        if (index == i) {
            produto.deleteRow(index);
            return;
        }
    }  
}

function logar(){
    const usuario = document.querySelector('#usuario').value
    const senha = document.querySelector('#senha').value

    console.log({
        usuario: usuario.toString() === "admin",
        senha: senha.toString() === "admin",
    })  

    if (usuario.toString() === "admin" && senha.toString() === "admin") {
        console.log({
            usuario: usuario.toString() === "admin",
            senha: senha.toString() === "admin",
        })
        window.location.href = "cadastro.html";
        alert("Acesso Autorizado!")
        
        }else{  
            alert("Acesso Negado!");
        }
    }

