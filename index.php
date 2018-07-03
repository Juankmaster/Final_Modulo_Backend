<?php
include("funciones.php");
  $respuesta=cargarCiudades();
    if (isset($respuesta)) {
      echo json_encode($respuesta);
    }else {
      echo("Error al cargar archivo");
    }

 ?>
