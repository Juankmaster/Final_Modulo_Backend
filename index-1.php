<?php
include("funciones.php");
$registros=leerArchivo();
if (isset($registros)) {
  echo json_encode($registros);
}else {
  echo("Error al cargar archivo");
}

 ?>
