$(document).ready(function (){
    let authHeader= sessionStorage.getItem('Authorization');
    let tipo= sessionStorage.getItem('tipoE');
    cargarListas(tipo,authHeader);
})
function cargarListas(tipo,authHeader) {
    switch (tipo) {
        case 'Product':
            ListaEntity(authHeader)
            ListaPersonas(authHeader)
            let contProductos = document.querySelector('#contProductos')
            contProductos.style.display = "none";

            break;
        case 'Entity':
            ListaProducto(authHeader)
            ListaPersonas(authHeader)
            let contEntidades = document.querySelector('#contEntidades')
            contEntidades.style.display = "none";
            break;
        case 'Person':
            ListaEntity(authHeader)
            ListaProducto(authHeader)
            let contPer = document.querySelector('#contPersonas')
            contPer.style.display = "none";
            break;


    }

}
function ListaEntity(authHeader) {
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": authHeader},
        success: function (data) {
            let contenedor= document.querySelector('#sEntidad');
            contenedor.innerHTML = '';
            $.each(data.entities, function(i, item) {
                contenedor.innerHTML += `
                         <option  value="${item.entity.id}">${item.entity.name}</option>
               `
            })
        },
    })

}
function ListaProducto(authHeader) {
    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": authHeader},
        success: function (data) {
            let contenedor= document.querySelector('#sProducto');
            contenedor.innerHTML = '';
            $.each(data.products, function(i, item) {
                contenedor.innerHTML += `
                         <option  value="${item.product.id}">${item.product.name}</option>
               `
            })
        },
    })

}

function ListaPersonas(authHeader) {
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": authHeader},
        success: function (data) {
            let contenedor= document.querySelector('#sPersona');
            contenedor.innerHTML = '';
            $.each(data.persons, function(i, item) {
                contenedor.innerHTML += `                
                         <option  value="${item.person.id}">${item.person.name}</option>
               `
            })
        },
    })

}
// Añadir relaciones a los elementos
$("#btnRProd").click(function(){
    let id= sessionStorage.getItem('idElemento');
    let tipo= sessionStorage.getItem('tipoE');
    let idR = $("#sProducto").val();
    switch (tipo) {
        case 'Entity':
            relacionEntidadProducto(id,idR, 'add')
            break;
        case 'Person':
            relacionPersonaProducto(id,idR, 'add')
            break;

    }
})
$("#btnRP").click(function(){
    let id= sessionStorage.getItem('idElemento');
    let tipo= sessionStorage.getItem('tipoE');
    let idR = $("#sPersona").val();
    switch (tipo) {
        case 'Entity':
            relacionEntidadPersona(id,idR, 'add');
            break;
        case 'Product':
            relacionProductoPersona(id,idR, 'add');
            break;

    }
})
$("#btnRE").click(function(){
    let id= sessionStorage.getItem('idElemento');
    let tipo= sessionStorage.getItem('tipoE');
    let idR = $("#sEntidad").val();
    switch (tipo) {
        case 'Person':
            relacionEntidadPersona(idR,id, 'add');
            break;
        case 'Product':
            relacionEntidadProducto(idR,id, 'add');
            break;

    }
})

function relacionEntidadProducto(id,idR, op) {
    let authHeader= sessionStorage.getItem('Authorization');
    $.ajax({
        type: "PUT",
        url: '/api/v1/entities/'+id+'/products/'+op+'/'+idR,
        headers: {"Authorization": authHeader},
        success: function () {
            if(op==='add')
                alert('Relación agregada con èxito');
            else
                alert('Relación eliminada con èxito');
            window.location.href=window.location.href;

        },
        error: function (xhr) {
            let message = "";
            if (xhr.responseJSON && xhr.responseJSON.message) {
                message = xhr.responseJSON.message;
            }
            alert("Error:( \n" + message)
        }

     })
}


//eliminar la relacion de los elementos

$("#btnERProd").click(function(){
    let id= sessionStorage.getItem('idElemento');
    let tipo= sessionStorage.getItem('tipoE');
    let idR = $("#sProducto").val();
    switch (tipo) {
        case 'Entity':
            relacionEntidadProducto(id,idR, 'rem')
            break;
        case 'Person':
            relacionPersonaProducto(id,idR, 'rem')
            break;

    }
})

$("#btnERP").click(function(){
    let id= sessionStorage.getItem('idElemento');
    let tipo= sessionStorage.getItem('tipoE');
    let idR = $("#sPersona").val();
    switch (tipo) {
        case 'Entity':
            relacionEntidadPersona(id,idR, 'rem');
            break;
        case 'Product':
            relacionProductoPersona(id,idR, 'rem');
            break;

    }
})
$("#btnREE").click(function(){
    let id= sessionStorage.getItem('idElemento');
    let tipo= sessionStorage.getItem('tipoE');
    let idR = $("#sEntidad").val();
    switch (tipo) {
        case 'Person':
            relacionEntidadPersona(idR,id, 'rem');
            break;
        case 'Product':
            relacionEntidadProducto(idR,id, 'rem');
            break;

    }
})

function relacionPersonaProducto(id,idR, op) {
    let authHeader= sessionStorage.getItem('Authorization');
    $.ajax({
        type: "PUT",
        url: '/api/v1/persons/'+id+'/products/'+op+'/'+idR,
        headers: {"Authorization": authHeader},
        success: function () {
            if(op==='add')
                 alert('Relación agregada con èxito');
            else
                alert('Relación eliminada con èxito');
            window.location.href=window.location.href;
        },
        error: function (xhr) {
            let message = "";
            if (xhr.responseJSON && xhr.responseJSON.message) {
                message = xhr.responseJSON.message;
            }
            alert("Error:( \n" + message)
        }

    })
}
function relacionEntidadPersona(id,idR, op) {
    let authHeader= sessionStorage.getItem('Authorization');
    $.ajax({
        type: "PUT",
        url: '/api/v1/entities/'+id+'/persons/'+op+'/'+idR,
        headers: {"Authorization": authHeader},
        success: function () {
            if(op==='add')
                alert('Relación agregada con èxito');
            else
                alert('Relación eliminada con èxito');
            window.location.href=window.location.href;
        },
        error: function (xhr) {
            let message = "";
            if (xhr.responseJSON && xhr.responseJSON.message) {
                message = xhr.responseJSON.message;
            }
            alert("Error:( \n" + message)
        }

    })
}
function relacionProductoPersona(id,idR, op) {
    let authHeader= sessionStorage.getItem('Authorization');
    $.ajax({
        type: "PUT",
        url: '/api/v1/products/'+id+'/persons/'+op+'/'+idR,
        headers: {"Authorization": authHeader},
        success: function () {
            if(op==='add')
                alert('Relación agregada con èxito');
            else
                alert('Relación eliminada con èxito');
            window.location.href=window.location.href;
        },
        error: function (xhr) {
            let message = "";
            if (xhr.responseJSON && xhr.responseJSON.message) {
                message = xhr.responseJSON.message;
            }
            alert("Error:( \n" + message)
        }

    })
}