<?php
  include("funciones.php");

  $ciudad=htmlspecialchars($_POST['ciudad']);
  $tipo=htmlspecialchars($_POST['tipo']);
  $rango=explode(';', $_POST['rango']);
  $r_min=$rango[0];
  $r_max=$rango[1];

  $respuestas=filtroRegistros($r_min,$r_max,$ciudad,$tipo);
  if (isset($respuestas)) {
    echo json_encode($respuestas);
  }else {
    echo("Error al cargar archivo1");
  }



 ?>
