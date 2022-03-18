class Contato {
    
    constructor() {
        this.id = 1;
        this.listaContatos = [];
        this.editarId = null;
    }

    salvar() {
        let contato = this.lerInfos();

        if(this.validarInfos(contato)) {
            if(this.editarId == null){
                this.adicionar(contato);
                alert('Contato salvo!');
            } else {
                this.atualizar(this.editarId, contato);
            }
        }

        this.listarContatos();
        this.cancelar();
    }

    listarContatos() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i< this.listaContatos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_sobrenome = tr.insertCell();
            let td_celular = tr.insertCell();
            let td_email = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.listaContatos[i].id;
            td_nome.innerText = this.listaContatos[i].nomeContato;
            td_sobrenome.innerText = this.listaContatos[i].sobrenomeContato;
            td_celular.innerText = this.listaContatos[i].numeroContato;
            td_email.innerText = this.listaContatos[i].emailContato;

            let imgEditar = document.createElement('img');
            imgEditar.src = 'assets/img/icone-editar.svg';
            imgEditar.setAttribute("onclick", "contato.editando("+ JSON.stringify(this.listaContatos[i]) +")");

            let imgExcluir = document.createElement('img');
            imgExcluir.src = 'assets/img/icone-deletar.svg';
            imgExcluir.setAttribute("onclick", "contato.deletar("+ this.listaContatos[i].id +")");

            td_acoes.appendChild(imgEditar);
            td_acoes.appendChild(imgExcluir);
        }
    }
        

    adicionar(contato) {
        this.listaContatos.push(contato);
        this.id++;
    }

    atualizar(id, contato) {
        
        for( let i = 0; i < this.listaContatos.length; i++){
            if(this.listaContatos[i].id == id) {
                this.listaContatos[i].nomeContato = contato.nomeContato;
                this.listaContatos[i].sobrenomeContato = contato.sobrenomeContato;
                this.listaContatos[i].numeroContato = contato.numeroContato;
                this.listaContatos[i].emailContato = contato.emailContato;
                alert('Contato editado');
            }
        }
    }

    buscar() {
        let buscando = document.getElementById('txtBuscar').value;
        let achado = this.listaContatos.find(contato => buscando==contato.nomeContato || buscando==contato.numeroContato);
        if(achado){
            this.editando(achado);
        } else {
            alert('Este contato não existe');
        }
    }

    editando(dados) {
        this.editarId = dados.id;

        document.getElementById('nome').value = dados.nomeContato;
        document.getElementById('sobrenome').value = dados.sobrenomeContato;
        document.getElementById('numero').value = dados.numeroContato;
        document.getElementById('email').value = dados.emailContato;

        document.getElementById('atualiza').innerText = 'Atualizar';
    }

    lerInfos() {
        let contato = {}

        contato.id = this.id;
        contato.nomeContato = document.getElementById('nome').value;
        contato.sobrenomeContato= document.getElementById('sobrenome').value;
        contato.numeroContato = document.getElementById('numero').value;
        contato.emailContato = document.getElementById('email').value;

        return contato;
    }

    validarInfos(contato) {
        let msg = '';

        if(contato.nomeContato == ''){
            msg += 'Por favor, informe o nome do contato \n'
        }

        if(contato.numeroContato == ''){
            msg += 'Por favor, informe o número do contato'
        }

        if(msg != ''){
            alert(msg);
            return false;
        }

        return true;
    }

    cancelar() {
        document.getElementById('nome').value = '';
        document.getElementById('sobrenome').value = '';
        document.getElementById('numero').value = '';
        document.getElementById('email').value = '';

        document.getElementById('atualiza').innerText = 'Salvar';
        this.editarId = null;
    }

    deletar(id){

        let tbody = document.getElementById('tbody');

        for(let i = 0; i < this.listaContatos.length; i++){
            if(this.listaContatos[i].id == id){
                this.listaContatos.splice(i, 1);
                alert('Contato deletado!');
                tbody.deleteRow(i);
            }
        }
    }
}

let contato = new Contato();