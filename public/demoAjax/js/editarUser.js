let etag=null;
$(document).ready(function (){
    let authHeader= sessionStorage.getItem('Authorization');
    let id= sessionStorage.getItem('idUser');


    $.ajax({
        type: "get",
        url: '/api/v1/users/'+id,
        headers: {"Authorization": authHeader},
        dataType: 'json',

        success: function (data)  {
            let contenedor= document.querySelector('#form-upUser');
            contenedor.innerHTML = '';

            let usuario=data.user;
            contenedor.innerHTML += `
             <label for="id" style="color: white;">Id: </label>
            <input id='miId' type = "text" value="`+usuario.id+`" disabled >
            <label for="username" style="color: white;">Usuario: </label>
            <input type="text" id="username" name="username"  value="`+usuario.username+`"  required/>
            <label for="email" style="color: white;">Email: </label>
            <input type="email" id="useremail" name="email"  value="`+usuario.email+`"  />
            <label for="rol" style="color: white;">Rol: </label>
            `;
            if(usuario.role.toString()=='writer'){
                contenedor.innerHTML += ` <select id="role" name="role" >
                                            <option  selected>Writer</option>
                                            <option >Reader</option> </select>`;
            }
            else{
                contenedor.innerHTML += `  <select id="role" name="role" >
                                            <option  >Writer</option>
                                            <option selected>Reader</option></select> `;
            }

            contenedor.innerHTML += `
                <input type="button" id="btn-upUser" value="Actualizar cuenta"/>
                <hr/>    `
            document.querySelector('#btn-upUser').addEventListener('click',updateUser);
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


function updateUser(){

    let authHeader= sessionStorage.getItem('Authorization');
    let id= sessionStorage.getItem('idUser');

    let confirma= confirm("Estas seguro de Modificar");
    if(confirma){
        $.ajax({
            type: "put",
            url: '/api/v1/users/'+id,
            headers: {"Authorization": authHeader,"If-Match": etag},
            dataType: 'json',
            data:  $("#form-upUser").serialize() ,
            success: function (data) {
                $(window).attr('location', 'manejarUsuarios.html')
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