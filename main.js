window.onload = (() => {
    montarTabela()
})         

let data = [{
    id: 0,
    descrição: 'Enviar Sprint 3',
    executor:'Júlia',
    prazo: '2021-11-26',
    status: 'Pendente',
}, {
    id: 1,
    descrição: 'Comprar ração',
    executor: 'Júlia',
    prazo: '2021-11-24',
    status: 'Pendente',
}]

function adicionarTarefa() {
    let tarefa = {
        id: document.getElementById("id").value,
        descrição: document.getElementById("descrição").value,
        executor: document.getElementById("executor").value,
        prazo: document.getElementById("prazo").value,
        status: document.getElementById("status").value, 
    }
    if (!tarefaValida(tarefa)) return
    if (tarefa.id !== "") {
        let velhaTarefa = data.find(vt => vt.id === tarefa.id)
        data[data.indexOF(velhaTarefa)] = tarefa
        todoStorage.save(data)
        data = todoStorage.fetch()
    } else {
        tarefa.id = data.length + 1
        data.push(tarefa)
        todoStorage.fetch()
        data = todoStorage.fetch()
    }
    montarTabela()
    limparCampos()
}
    

function montarTabela() {
    let trs = ``
    if (data.length ===0 ) {
        const tr = `
        <tr>
        <td colspan="5" class="text-center">Nenhuma tarefa adicionada</td>
        </tr>
        `
        document.getElementById("tabelaTarefasBody").innerHTML = tr
        return
    }
    data.forEach(task => {
        const tr = `
        <tr>
            <td>${task.descrição}</td>
            <td>${task.executor}</td>
            <td>${task.prazo}</td>
            <td>${task.status}</td>
            <td class="text-center">
            <a class="btn btn-success btn-sm" onclick="editarTarefa(${task.id})"><i class="far fa-edit"></i></a>
                <a class="btn btn-danger btn-sm" onclick="removerTarefa(${task.id})"><i class="fas fa-trash-alt"></i></a>
            </td>
        </tr>
        `
        trs += tr
    })
    document.getElementById("tabelaTarefasBody").innerHTML = trs
}

function removerTarefa (id) {
    let task = data.find(task => task.id === id)
    data.splice(data.indexOf(task), 1)
    todoStorage.save(data)
    data = todoStorage.fetch()
    montarTabela()

}
function editarTarefa(id) {
    let tarefa = data.find(tarefa => tarefa.id === id)
    document.getElementById("id").value = tarefa.id
     document.getElementById("descrição").value = tarefa.descrição
     document.getElementById("executor").value = tarefa.executor
     document.getElementById("prazo").value = tarefa.prazo
     document.getElementById("status").value = tarefa.status
}
function limparCampos() {
    document.getElementById("id").value = ''
     document.getElementById("descrição").value = ''
     document.getElementById("executor").value = ''
     document.getElementById("prazo").value = ''
     document.getElementById("status").value = ''
}

function tarefaValida(tarefa) {
    return tarefa.descrição !== "" && tarefa.executor !== "" && tarefa.prazo !== "" && tarefa.status !== ""

}
