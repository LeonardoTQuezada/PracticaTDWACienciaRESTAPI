



$(document).ready(function (){
    authHeader= sessionStorage.getItem('Authorization')
    showProducts(authHeader);
    showEntity(authHeader);
    showPerson(authHeader);
})

function showProducts(authHeader) {
    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": authHeader},
        // dataType: 'json',
        success: function (data) {
            let roles =showToken(authHeader)
            let contenedor= document.querySelector('#tableProduct');
            contenedor.innerHTML = '';
            $.each(data.products, function(i, item) {

                if(roles[1]=='writer') {
                    contenedor.innerHTML+= `
                         <tr id='${item.product.name}'>
                               <td><img src=${item.product.imageUrl} class="dimensionImg"> ${item.product.name}</td>
                                <td><button id="btnDelete" onclick="eliminarElemento('${item.product.id}','Product')">Delete</button></td>
                              
                                <td><button id="btnEdit" onclick="editarElemento('${item.product.id}','Product')">Edit</button></td>       
                        </tr>       `
                }else{
                    contenedor.innerHTML+= `  
                      <tr id='${item.product.name}'>
                         <td><img src=${item.product.imageUrl} class="dimensionImg"> ${item.product.name}</td>     
                      </tr>       
                 `
                }

            });
        }
    })
}

function showEntity(authHeader) {
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": authHeader},
        // dataType: 'json',
        success: function (data) {
            let roles =showToken(authHeader)
            let contenedor= document.querySelector('#tableEntity');
            contenedor.innerHTML = '';
            $.each(data.entities, function(i, item) {
                if(roles[1]=='writer') {
                    contenedor.innerHTML += `
                    <tr id='${item.entity.name}'>
                        <td><img src=${item.entity.imageUrl} class="dimensionImg"> ${item.entity.name}</td>
                        <td><button id="btnDelete" onclick="eliminarElemento('${item.entity.id}','Entity')">Delete</button></td>
                        
                        <td><button id="btnEdit" onclick="editarElemento('${item.entity.id}','Entity')">Edit</button></td>       
                    </tr>
                    `
                }else{
                    contenedor.innerHTML += `
                    <tr id='${item.entity.name}'>
                        <td><img src=${item.entity.imageUrl} class="dimensionImg"> ${item.entity.name}</td>
                    </tr>
                    `
                }
            });
        }
    })
}
function showPerson(authHeader) {
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": authHeader},
        // dataType: 'json',
        success: function (data) {
            let roles =showToken(authHeader)
            let contenedor= document.querySelector('#tablePersons');
            contenedor.innerHTML = '';
            $.each(data.persons, function(i, item) {
                if(roles[1]=='writer') {
                    contenedor.innerHTML += `
                    <tr id='${item.person.name}'>
                        <td><img src=${item.person.imageUrl} class="dimensionImg"> ${item.person.name}</td>
                        <td><button id="btnDelete" onclick="eliminarElemento('${item.person.id}','Person')">Delete</button></td>
                        <td><button id="btnEdit" onclick="editarElemento('${item.person.id}','Person')">Edit</button></td>
                    </tr>
                    `
                }
                else{
                    contenedor.innerHTML += `
                    <tr id='${item.person.name}'>
                        <td><img src=${item.person.imageUrl} class="dimensionImg"> ${item.person.name}</td>
                    </tr>
                    `
                }

            });
        }
    })
}
function showToken(authHeader) {
    let token = authHeader.split(' ')[1];   // Elimina 'Bearer '
    let myData = JSON.parse(atob(token.split('.')[1]));
    return  myData.scopes;
}
$("#btnCrearProd").click(function(){
    sessionStorage.setItem('tipoE','Product');
    $(window).attr('location','pagCrear.html')
})
$("#btnCrearE").click(function(){
    sessionStorage.setItem('tipoE','Entity');
    $(window).attr('location','pagCrear.html')
})
$("#btnCrearP").click(function(){
    sessionStorage.setItem('tipoE','Person');
    $(window).attr('location','pagCrear.html')
})

$("#btnLogout").click(function(){
    sessionStorage.clear();
    $(window).attr('location','index.html');
})