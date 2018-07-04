/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/


$(document).ready(function() {
    $('select').material_select();
});

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
// function playVideoOnScroll(){
//   var ultimoScroll = 0,
//       intervalRewind;
//   var video = document.getElementById('vidFondo');
//   $(window)
//     .scroll((event)=>{
//       var scrollActual = $(window).scrollTop();
//       if (scrollActual > ultimoScroll){
//        video.play();
//      } else {
//         //this.rewind(1.0, video, intervalRewind);
//         video.play();
//      }
//      ultimoScroll = scrollActual;
//     })
//     .scrollEnd(()=>{
//       video.pause();
//     }, 10)
// }
//Funcion para cargar los selects de ciudades y tipo
// function cargarCiudades() {
//   $.ajax({
//     url:'index.php',
//     type:"post",
//     dataType:"json",
//     success:function (data) {
//     $.each(data[0],function(index, value){
//         $("#selectCiudad").append("<option value="+value+">"+value+"</option>");
//       },
//     );
//     $.each(data[1],function(index, value){
//         $("#selectTipo").append("<option value="+value+">"+value+"</option>");
//       }
//     );
//     },
//     error:function () {
//       alert("error");
//     }
//   })
// }
//Funcion llamodo ajax para mostrar en pantalla todos los registros
$("#mostrarTodos").on("click",function () {
   $.ajax({
     url:"index-1.php",
     type:"post",
     dataType:"json",
     success:function (data) {
      imprimirPantalla(data);
     },
     error:function () {
       alert("Error cargar ciudades");
     }
   })
})

//Funcion llamado ajax para los distintos tipos de filtrado de las busquedas

$("#formulario").submit(function (e) {
  e.preventDefault();

    var ciudad=$("select[name='ciudad']").val();
    var rango=$("input[name='precio']").val();
    var tipo=$("select[name='tipo']").val();
    $.ajax({
      url:"buscador.php",
      type:"post",
      data:{'ciudad':ciudad,'tipo':tipo,'rango':rango},
      success:function(response){
       let data = JSON.parse(response);
       imprimirPantalla(data);
      },
      error:function () {
        alert("error buscador");
      }
    })
})
//Funcion para cargar los selects de la vista
function cargarSelects(){
    var tipos = [];
    var ciudades = [];
    $.get('data-1.json', function(data){
        for(let i = 0; i < data.length; i++){
            if(tipos.indexOf(data[i].Tipo) === -1) tipos.push(data[i].Tipo);
            if(ciudades.indexOf(data[i].Ciudad) === -1) ciudades.push(data[i].Ciudad);
        }
        for(let i = 0; i < ciudades.length; i++){
            $('#selectCiudad').append('<option value="'+ciudades[i]+'">'+ciudades[i]+'</option>');
        }
        for(let j = 0; j < tipos.length; j++){
            $('#selectTipo').append('<option value="'+tipos[j]+'">'+tipos[j]+'</option>');
        }
        $('select').material_select();
    });
}

//Funcion que carga los datos en pantalla
function imprimirPantalla(data) {
   $(".colContenido").empty();
  for (var i = 0; i < data.length; i++) {
     var plantilla="<div class='row card'>"+
                       "<div class='col s4 m4'>"+
                         "<div class='card-image  place-wrapper'>"+
                           "<img src='img/home.jpg' class='responsive-img place-image'>"+
                         "</div>"+
                       "</div>"+
                       "<div class='col s6'>"+
                         "<div class='card-content'>"+
                           "<p><b>Direccion: </b>"+data[i].Direccion+"</p>"+
                           "<p><b>Ciudad:</b> "+data[i].Ciudad+"</p>"+
                           "<p><b>Telefono: </b>"+data[i].Telefono +"</p>"+
                           "<p><b>Codigo Postal: </b>"+data[i].Codigo_Postal +"</p>"+
                           "<p><b>Tipo: </b>"+data[i].Tipo +"</p>"+
                           "<p ><b class='deep-orange-text'>Precio: </b>"+data[i].Precio+"</p>"+
                         "</div>"+
                         "<div class='card-action'>"+
                         "<a>Ver mas</a>"+
                         "</div>"+
                         "</div>"+
                       "</div>"
           $(".colContenido").append(plantilla);
  }
}

//playVideoOnScroll();
inicializarSlider();
cargarSelects();
