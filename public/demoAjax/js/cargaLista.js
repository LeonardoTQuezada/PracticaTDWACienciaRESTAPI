



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
                                <td><button id="btnDelete" onClick="">Delete</button></td>
                                <td><button id="btnEdit" onClick="">Edit</button></td>       
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
                        <td><button id="btnDelete" onClick="">Delete</button></td>
                        <td><button id="btnEdit" onClick="">Edit</button></td>       
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
                        <td><button id="btnDelete" onClick="">Delete</button></td>
                        <td><button id="btnEdit" onClick="">Edit</button></td>
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