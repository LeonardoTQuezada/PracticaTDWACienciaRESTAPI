let authHeader = null;
$(document).ready(function (){

    showData()
})


function showData() {
    showProducts();
    showEntity();
    showPerson();
}
function showProducts() {
    $.ajax({
        type: "GET",
        url: '/api/v1/products',

        // dataType: 'json',
        success: function (data) {


            $.each(data.products, function(i, valor) {
                let contenedor= document.querySelector(''+valor.product.name);

                contenedor.innerHTML += `
                        <td ><button id="btnDelete"  onclick="eliminar('${valor.id}','${tipo}')">Delete</button></td>
                        <td><button id="btnEdit" onclick="editar('${valor.id}','${tipo}')">Edit</button></td>       
            `
            });
        }
    })
}

function showEntity() {
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        // dataType: 'json',
        success: function (data) {
            $.each(data.entities, function(i, valor) {
                let contenedor= document.querySelector('${valor.entity.name}');
                contenedor.innerHTML = '';
                contenedor.innerHTML += `
                       <td ><button id="btnDelete"  onclick="eliminar('${valor.id}','${tipo}')">Delete</button></td>
                        <td><button id="btnEdit" onclick="editar('${valor.id}','${tipo}')">Edit</button></td>       
            `
            });
        }
    })
}
function showPerson() {
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        // dataType: 'json',
        success: function (data) {


            $.each(data.persons, function(i,valor) {
                let contenedor= document.querySelector('${valor.person.name}');
                contenedor.innerHTML = '';
                contenedor.innerHTML += `
                    <td ><button id="btnDelete"  onclick="eliminar('${valor.id}','${tipo}')">Delete</button></td>
                    <td><button id="btnEdit" onclick="editar('${valor.id}','${tipo}')">Edit</button></td> 
                    `
            });
        }
    })
}
