<?php
//Funcion para leer el archivo json
  function leerArchivo()
  {
    $archivo=fopen("data-1.json","r");
    $datos=fread($archivo, filesize("data-1.json"));
    $data=json_decode($datos,true);
    fclose($archivo);
    return $data;
  }
//Funcion para cargar los selects de ciudades y Tipo
  function cargarCiudades()
  {
    $datos=leerArchivo();
      foreach ($datos as $value) {
        $arreglo_ciudad[]=$value['Ciudad'];
        $arreglo_tipo[]=$value['Tipo'];
      }
      $respuesta[0]=array_unique($arreglo_ciudad);
      $respuesta[1]=array_unique($arreglo_tipo);
      return $respuesta;
  }

//Funcion para mostrar  los registros disponibles por cada filtro
function filtroRegistros($r_min,$r_max,$ciudad,$tipo)
{
    $datos=leerArchivo();
     $respuestas=[];
     $resultado=[];
//Filtro solo por rango de precio
    if (isset($datos)) {
        foreach ($datos as $value) {
          $precios_str=$value['Precio'];
          $precios_str=str_replace("$", "", $precios_str);
          $precios_n=str_replace(",", "" , $precios_str);
            if ($precios_n >= $r_min && $precios_n <= $r_max) {
                 array_push($respuestas,$value);
            }
        }
//Filtro por Ciudad y Tipo
     if ($ciudad != '' &&  $tipo != '') {
            foreach ($respuestas as $value) {
              if ($value['Ciudad']==$ciudad && $value['Tipo']== $tipo) {
                  array_push($resultado,$value);
                }
              }
            }elseif ($ciudad!='') {
              foreach ($respuestas as  $value) {
                if ($value['Ciudad']==$ciudad) {
                    array_push($resultado,$value);
                }
              }
            }elseif ($tipo!='') {
              foreach ($respuestas as $value) {
                if ($value['Tipo']==$tipo) {
                    array_push($resultado,$value);
                }
              }
            }else {
                $resultado=$respuestas;
            }
                return $resultado;
      }
}
 ?>
