let etag=null;
let pas=null
$(document).ready(function (){
    let authHeader= sessionStorage.getItem('Authorization');
    let id= showToken(authHeader).uid
    let usuarioName= document.querySelector('#nameUser');
    usuarioName.innerHTML=`
            ${showToken(authHeader).sub}`

    $.ajax({
        type: "get",
        url: '/api/v1/users/'+id,
        headers: {"Authorization": authHeader},
        dataType: 'json',

        success: function (data)  {

            let contenedor= document.querySelector('#form-upUser');
            contenedor.innerHTML = '';
            let usuario=data.user;
            pas=usuario.pwd;
            contenedor.innerHTML += `
             <label for="id" style="color: #fcf9f9;">Id: </label>
            <input id='miId' type = "text" value="`+usuario.id+`" disabled >
            <label for="username" style="color: white;">Usuario: </label>
            <input type="text" id="username" name="username"  value="`+usuario.username+`"  required/>
            <label for="pwd" style="color: white;">PWD: </label>
            <input  type="password" id="pwd" name="password"  value="" /><br><br>
            <label for="email" style="color: white;">Email: </label>
            <input type="email" id="useremail" name="email"  value="`+usuario.email+`"  />
            <label for="birthDate" style="color: white;">BirthDate: </label>
            <input type="date" id="birthDate" name="birthDate"  value="`+usuario.birthDate+`"  />
            <label for="url" style="color: white;">My Url: </label>
            <input type="text" id="url" name="url"  value="`+usuario.url+`"  />
            <label for="rol" style="color: white;">Rol: </label>
            <input id='rol' type = "text" name ="role"    value="`+usuario.role+`" disabled ><br><br>
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

    let nombre = $("#username").val();
    let email = $("#useremail").val();
    let pwd = $("#pwd").val();
    let birthDate=$("#birthDate").val();
    let url=$("#url").val();
    let dat='username='+nombre+'&password='+pwd+'&email='+email+'&birthDate='+birthDate+'&url='+url
    if(pwd=="") {
       dat='username='+nombre+'&email='+email+'&birthDate='+birthDate+'&url='+url
    }

    let id= showToken(authHeader).uid;
    let confirma= confirm("Estas seguro de Modificar");
    if(confirma){
        $.ajax({
            type: "put",
            url: '/api/v1/users/'+id,
            headers: {"Authorization": authHeader,"If-Match": etag},
            dataType: 'json',
            data:  dat ,
            success: function (data) {
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
}
function showToken(authHeader) {
    let token = authHeader.split(' ')[1];   // Elimina 'Bearer '
    let myData = JSON.parse(atob(token.split('.')[1]));
    return  myData;
}