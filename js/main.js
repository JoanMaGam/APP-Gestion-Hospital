const ulPacientes = document.querySelector('ul');


// li.textContent = listaPacientes
// ulPacientes.appendChild(li)


/* Pintar un listado de pacientes con la maquetación que queráis, podéis usar
bootstrap o hacerla vosotros mismos. (2 puntos) */
function printOnePatient(pPatient, pDom) {

    const li = document.createElement('li');

    li.innerHTML = `<p><span>Nombre y apellidos:</span> ${pPatient.nombre} ${pPatient.apellidos}</p>
    <p><span>Edad:</span> ${pPatient.edad}</p>
    <p><span>Diagnóstico:</span> ${pPatient.diagnostico}</p>
    <p><span>Num SS.:</span> ${pPatient.seguridadSocial}</p>`;

    pDom.appendChild(li)
}

function printAllPatients(pList, pDom) {
    pDom.innerHTML = '';
    pList.forEach(patient => printOnePatient(patient, pDom));
}

printAllPatients(listaPacientes, ulPacientes);

/* El interfaz tendrá dos inputs independientes que recogerán una edad mínima y
una edad máxima. Con un botón que accionará al click el evento. Posteriormente
aparecerán por pantalla los pacientes que tengan esa edad, en lugar del listado
con todos los pacientes. (2 puntos) */
const form = document.querySelector('#form');
// const button = document.querySelector('#btnBuscar'); //no hace falta ponerlo pk ya tiene el atributo submit y esta dentro del form con lo cual al capturar el form se captura todo lo de dentro.
form.addEventListener('submit', searchPatientsByAge);

//creo funcion de filtrar por edad:
function filterAges(pList, pEdad1, pEdad2) {
    const listaFiltrada = []
    pList.forEach(element => {
        if (element.edad >= pEdad1 && element.edad <= pEdad2) {
            listaFiltrada.push(element)
        }
    });
    return listaFiltrada
}
// //pinto la lista filtrada por edad con pintarTodos:(este paso me lo puedo saltar directamente pero lo dejo para saber realcionar los pasos.)
// printAllPatients(filterAges(listaPacientes, 20, 30), ulPacientes)
// console.log(filterAges(listaPacientes, 20, 30));

//Creo funcion buscarPacientes y encapsulo filtraPorEdad y pintarTodos:
function searchPatientsByAge(event) {
    event.preventDefault();
    printAllPatients(filterAges(listaPacientes, event.target.edadMinima.value, event.target.edadMaxima.value), ulPacientes)

    event.target.reset();
}


/* En el interfaz habrá un filtro independiente donde se mostrarán un selector con
todas las enfermedades disponibles en el hospital. Una vez seleccionada una
enfermedad el listado de pacientes mostrará aquellos pacientes que tengan dicho
diagnostico. El selector reaccionará al evento de change. (2 puntos) */

//primero creo un array con las enfermedades/diagnosticos:
function filterIllness(pList) {
    const listaa = []
    pList.forEach(element => {
        // console.log(element.diagnostico);
        listaa.push(element.diagnostico)
        return listaa
    });
    console.log(listaa);
    return listaa
}

const lis = filterIllness(listaPacientes)
console.log(typeof lis);

//ahora filtro los que estan duplicados:

function filterDuplicated(pList) {
    const otraLista = []
    pList.forEach((element, index) => {
        if (otraLista.includes(element)) {
            console.log(index, element + ' ya esta en la lista');
        } else {
            otraLista.push(element)
        }
    });
    return otraLista
}
const listaDiag = filterDuplicated(lis)
console.log(listaDiag);
console.log(typeof listaDiag);

// Ahora asigno los diagnosticos a los diferentes selectores:
const select = document.querySelector('#select')

function pintarDiag(pList, pDom) {
    pList.forEach((diag, index) => {
        const option = document.createElement('option')
        option.textContent = diag;
        option.value = index;
        // < option value = "" > Selecciona diagnóstico</option >
        pDom.appendChild(option)
    })

}
pintarDiag(listaDiag, select)


// Ahora vinculo los selectores con las acciones de pintar según diagnostico.
select.addEventListener('change', selectOption);

//He creado esta función para no repetir código en cada case:
function caseFunction(pLista, pDom) {
    let diagnostic = ''
    diagnostic = listaDiag.at(event.target.value)
    console.log(diagnostic);

    return pLista.forEach(patient => {
        if (patient.diagnostico === diagnostic) {
            printOnePatient(patient, pDom)
        }
    });
}


function selectOption(event) {

    ulPacientes.innerHTML = '';
    switch (event.target.value) {
        case '0':
            //COVID
            caseFunction(listaPacientes, ulPacientes)
            break;

        case '1':
            //fractura de brazo
            caseFunction(listaPacientes, ulPacientes)
            break;

        case '2':
            //dolor de espalda
            caseFunction(listaPacientes, ulPacientes)
            break;

        case '3':
            //dolor de cabeza
            caseFunction(listaPacientes, ulPacientes)
            break;
        case '4':
            //fractura de pierna
            caseFunction(listaPacientes, ulPacientes)
            break;
        case '5':
            //alergia
            caseFunction(listaPacientes, ulPacientes)
            break;
        default:
            //cargar los valores iniciales(toda la lista)
            printAllPatients(listaPacientes, ulPacientes)
            break;
    }

}



/* El interfaz tendrá un input de tipo text que me permita buscar pacientes por nombre,
apellido o por numero de la seguridad social. Cualquiera de las opciones es posible,
Ojo es un único input que filtra por nombre, apellido y por numero de la seguridad
social, el buscador deberá permitir buscar por los tres campos y que no sean exactos,
pueden esta incompletos. EJEMPLO: Juan mostraría Juan Ramon, Juanjo Juan
Antonio, Miguel Juan, etc. (2 puntos) */

const form2 = document.querySelector('#form2');

form2.addEventListener('submit', searchPatients);

function filterTotal(pList, pDato) {
    let filteredList = pList.filter(patient => patient.seguridadSocial.toLowerCase().includes(pDato.toLowerCase()) || patient.nombre.toLowerCase().includes(pDato.toLowerCase()) || patient.apellidos.toLowerCase().includes(pDato.toLowerCase()))
    console.log(filteredList);
    return filteredList
}

function searchPatients(event) {
    event.preventDefault();

    printAllPatients(filterTotal(listaPacientes, event.target.multiple.value), ulPacientes)
    event.target.reset();
}

