const fecha = document.getElementById('fecha');
const lista = document.getElementById('lista');
const input = document.getElementById('input');
const botonEnter = document.getElementById('boton-enter');
const check = 'fa-circle-check';
const uncheck = 'fa-circle';
const lineThrough = 'text-decoration-line-through';
let id;
let LIST;

// Creacion de fecha

const FECHA = new Date();
fecha.innerHTML= FECHA.toLocaleDateString('es-MX', {weekday:'long', month: 'short', day: 'numeric'},)

// Función tarea

function agregarTarea(tarea, id, realizado, eliminado){

    if(eliminado){return}

    const REALIZADO = realizado ?check :uncheck;
    const LINE = realizado ?lineThrough :'';

    const elemento = `
        <li class="text-white rounded-pill my-1">
            <div class="row justify-content-center align-items-center py-1">
                <div class="col-1 d-flex justify-content-center">
                    <i class="fa-regular ${REALIZADO} " data="realizado" id="${id}"></i>
                </div>
                <div class="col-8">
                    <p class="text m-0 text-center ${LINE}" >${tarea}</p>
                </div>
                <div class="col-1 d-flex justify-content-center">
                    <i class="fa-solid fa-trash" data="eliminado" id="${id}" role="button"></i>
                </div>
            </div>
        </li>
        `

    lista.insertAdjacentHTML('beforeend', elemento)
}

function tareaRealizada(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true;
}

function tareaEliminada(element){
    element.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode);
    LIST[element.id].eliminado = true;
}


botonEnter.addEventListener('click', () =>{
    const tarea = input.value;
    if(tarea){
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id:id,
            realizado:false,
            elminiado:false
        })
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
    input.value='';
    id++;
})

document.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        const tarea = input.value;
        if(tarea){
            agregarTarea(tarea, id, false, false);
            LIST.push({
                nombre: tarea,
                id:id,
                realizado:false,
                elminiado:false
            })
        }
        input.value='';
        id++;
        localStorage.setItem('TODO', JSON.stringify(LIST));
    }
})

lista.addEventListener('click', function(event){
    const element = event.target;
    console.log(element);
    const elementData = element.attributes.data.value;
    console.log(element.attributes.data.value);
    if(elementData == 'realizado'){
        tareaRealizada(element);
    }
    else if (elementData == 'eliminado'){
        tareaEliminada(element);
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
})

let data = localStorage.getItem('TODO');
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;
}

function cargarLista(DATA){
    DATA.forEach(element => {
        agregarTarea(element.nombre, element.id, element.realizado, element.eliminado);
    });
}