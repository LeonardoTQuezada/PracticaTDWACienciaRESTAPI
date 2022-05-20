let authHeader = sessionStorage.getItem('Authorization');
let tipo =sessionStorage.getItem('tipoE');

$("#btnGuardar").click(function(){
    nomb= $('#txtNombre').val();
    if(nomb==''){
        window.alert("Se requiere un Nombre")
    }else {

        $.ajax({
            type: "POST",
            url: dimeRutaApi(tipo),
            headers: {"Authorization": authHeader},
            dataType: 'json',
            data: $("#formletter").serialize(),
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
});

function eliminarElemento(id,tipo) {
   let ruta=dimeRutaApi(tipo)+'/'+id;
   let confirma= confirm("Estas seguro de Eliminar");
   if(confirma){
       $.ajax({
           type: "delete",
           url: ruta,
           headers: {"Authorization": authHeader},
           dataType: 'json',
           data: id,
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
function editarElemento(id,tipo) {
    sessionStorage.setItem('tipoE', tipo);
    sessionStorage.setItem('idElemento',id);
    $(window).attr('location', 'pagUpdate.html')
}


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
function showTokenRol(authHeader) {
    let token = authHeader.split(' ')[1];   // Elimina 'Bearer '
    let myData = JSON.parse(atob(token.split('.')[1]));
    return  myData.scopes;
}