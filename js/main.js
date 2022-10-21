const fecha = document.getElementById('fecha');
const lista = document.getElementById('lista');
const input = document.getElementById('input');
const botonEnter = document.getElementById('boton-enter');
const check = 'fa-circle-check';
const uncheck = 'fa-circle';
const lineThrough = 'text-decoration-line-through';
var id = 0;
const LIST=[];

// Función tarea

function agregarTarea(tarea, id, realizado, eliminado){

    if(eliminado){return}

    const REALIZADO = realizado ?check :uncheck;
    const LINE = realizado ?lineThrough :'';

    const elemento = `
        <li class="text-white rounded-pill my-1">
            <div class="row justify-content-center align-items-center py-1">
                <div class="col-1 d-flex justify-content-center">
                    <i class="fa-regular ${REALIZADO}" data="realizado" id="${id}"></i>
                </div>
                <div class="col-8">
                    <p class="text m-0 text-center ${LINE}" >${tarea}</p>
                </div>
                <div class="col-1 d-flex justify-content-center">
                    <i class="fa-solid fa-trash" data="eliminado" id="${id}"></i>
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
}

function tareaEliminada(element){
    element.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode);
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
    input.value='';
    id++;
    console.log(LIST);
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
        console.log(LIST);
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
})