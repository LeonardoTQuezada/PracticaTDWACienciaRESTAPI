let authHeader = null;
$(document).ready(function (){
    showData()
})

window.addEventListener("onload",function(){

    /*
        $.post(
            "/access_token",
            $("#form-login").serialize(),
            null
        ).success(function (data, textStatus, request) {
            print(data)
            // => show scopes, users, products, ...
            authHeader = request.getResponseHeader('Authorization');
            console.log(authHeader)
            showData();


        }).fail(function (xhr) {
            let message="";
            if (xhr.responseJSON && xhr.responseJSON.message) {
                message = xhr.responseJSON.message;
            }
            alert("Incorrecto :( \n" + message)
        });*/
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


            $.each(data.products, function(i, item) {
                console.log(item.product.name)
                let contenedor= document.querySelector(''+item.product.name);

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
            $.each(data.entities, function(i, item) {
                let contenedor= document.querySelector('${item.entity.name}');
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


            $.each(data.persons, function(i, item) {
                let contenedor= document.querySelector('${item.person.name}');
                contenedor.innerHTML = '';
                contenedor.innerHTML += `
                    <td ><button id="btnDelete"  onclick="eliminar('${valor.id}','${tipo}')">Delete</button></td>
                    <td><button id="btnEdit" onclick="editar('${valor.id}','${tipo}')">Edit</button></td> 
                    `
            });
        }
    })
}