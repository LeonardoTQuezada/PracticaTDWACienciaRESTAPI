let etag=null;
$(document).ready(function (){
    let authHeader= sessionStorage.getItem('Authorization');
    let id= sessionStorage.getItem('idElemento');
    let tipo= sessionStorage.getItem('tipoE');
    cargaRelaciones(tipo,id);
    let ruta=dimeRutaApi(tipo)+'/'+id;
    $.ajax({
        type: "get",
        url: ruta,
        headers: {"Authorization": authHeader},
        dataType: 'json',

        success: function (data)  {
            let contenedor= document.querySelector('#formUpdate');
            contenedor.innerHTML = '';
            let elemento=null;
            switch (tipo) {
                case 'Product':
                    elemento=data.product;
                    break;
                case 'Entity':
                    elemento=data.entity;
                    break;
                case 'Person':
                    elemento=data.person;
                    break;

            }

            contenedor.innerHTML += `
                    <pre>ID  <input id='miId' type = "text" value="`+elemento.id+`" disabled ></pre>
                    <pre>Nombre <input id='txtNombre' type="text"  name="name" maxlength="40" value="`+elemento.name+`" required ></pre>
        
                    <pre>Fecha nacimiento  <input id='fechaI' type ="text" name="brithDate" value="`+elemento.birthDate+`"></pre>
        
                    <pre>Fecha Death  <input id='fechaF' type="date" name="deatDate" value="`+elemento.deathDate+`"></pre>
              
                    <pre>Url Imagen <input id='urlImg' type="text" name="imageUrl" value="`+elemento.imageUrl+`"></pre>
                    
                    <pre>Url Wiki   <input id='urlWiki' type = "text" name="wikiUrl" value="`+elemento.wikiUrl+`"></pre>
        
                    
        
                    </br>
                    <input type="button" id="btnUpdate" value="Actualizar" />
                 
                   
                    `
            document.querySelector('#btnUpdate').addEventListener('click',updateElemento);
        },
        complete: function(xhr){
             etag=xhr.getResponseHeader("Etag")

        },
        error: function (xhr) {
            let message = "";
            if (xhr.responseJSON && xhr.responseJSON.message) {
                message = xhr.responseJSON.message;
            }
            alert("Error:( \n" + message)
        }
    })

})





function dimeRutaApi(tip){
    let rutaApi='';
    switch (tip) {
        case 'Product':
            rutaApi='/api/v1/products';
            break;
        case 'Entity':
            rutaApi='/api/v1/entities';
            break;
        case 'Person':
            rutaApi='/api/v1/persons';
            break;

    }
    return rutaApi
}

function updateElemento(){

    let authHeader= sessionStorage.getItem('Authorization');
    let id= sessionStorage.getItem('idElemento');
    let tipo= sessionStorage.getItem('tipoE');
    let ruta=dimeRutaApi(tipo)+'/'+id;
    let confirma= confirm("Estas seguro de Modificar");
    if(confirma){
        $.ajax({
            type: "put",
            url: ruta,
            headers: {"Authorization": authHeader,"If-Match": etag},
            dataType: 'json',
            data:  $("#formUpdate").serialize() ,
            success: function () {
                $(window).attr('location', 'PagWriter.html')
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
}
//cargar lista de relacion de elementos
function cargaRelaciones(tipo,id) {
    switch (tipo) {
        case 'Product':
            cargarlistaProdEnt(id);
            cargarlistaProdPers(id);
            break;
        case 'Entity':
            cargarlistaEntPers(id);
            cargarlistaEntProd(id);
            break;
        case 'Person':
            cargarlistaPersProd(id);
            cargarlistaPersEnt(id)
            break;

    }
}

//Relacion producto con entidad
function cargarlistaProdEnt(id) {
    $.ajax({
        type: "GET",
        url: '/api/v1/products/'+id+'/entities',
        success: function (data) {
            let contenedor= document.querySelector('#listaEnt');
            contenedor.innerHTML = '';
            $.each(data.entities, function(i, item) {
                contenedor.innerHTML += `
                    <li style="color: white">${item.entity.name}</li>`

            });

        }
    })
}
//Relacion producto con  persona
function cargarlistaProdPers(id) {
    $.ajax({
        type: "GET",
        url: '/api/v1/products/'+id+'/persons',
        success: function (data) {
            let contenedor= document.querySelector('#listaPer');
            contenedor.innerHTML = '';
            $.each(data.persons, function(i, item) {
                contenedor.innerHTML += `
                    <li style="color: white">${item.person.name}</li>`

            });

        }
    })
}
//Relacion entidad con producto
function cargarlistaEntProd(id) {
    $.ajax({
        type: "GET",
        url: '/api/v1/entities/'+id+'/products',
        success: function (data) {
            let contenedor= document.querySelector('#listaPro');
            contenedor.innerHTML = '';
            $.each(data.products, function(i, item) {
                contenedor.innerHTML += `
                    <li style="color: white">${item.product.name}</li>`

            });

        }
    })
}

//Relacion entidad con persona
function cargarlistaEntPers(id) {
    $.ajax({
        type: "GET",
        url: '/api/v1/entities/'+id+'/persons',
        success: function (data) {
            let contenedor= document.querySelector('#listaPer');
            contenedor.innerHTML = '';
            $.each(data.persons, function(i, item) {
                contenedor.innerHTML += `
                    <li style="color: white">${item.person.name}</li>`

            });

        }
    })
}
//Relacion persona con producto
function cargarlistaPersProd(id) {
    $.ajax({
        type: "GET",
        url: '/api/v1/persons/'+id+'/products',
        success: function (data) {
            let contenedor= document.querySelector('#listaPro');
            contenedor.innerHTML = '';
            $.each(data.products, function(i, item) {
                contenedor.innerHTML += `
                    <li style="color: white">${item.product.name}</li>`

            });

        }
    })
}
//Relaciion persona con entidad
function cargarlistaPersEnt(id) {
    $.ajax({
        type: "GET",
        url: '/api/v1/persons/'+id+'/entities',
        success: function (data) {
            let contenedor= document.querySelector('#listaEnt');
            contenedor.innerHTML = '';
            $.each(data.entities, function(i, item) {
                contenedor.innerHTML += `
                    <li style="color: white">${item.entity.name}</li>`

            });

        }
    })
}