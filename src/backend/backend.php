<?php
   header("Access-Control-Allow-Origin: http://localhost:4200");
   header("Content-type: application/json");
   
   $notas = json_decode(file_get_contents("notas.json"), True);
   
   if( isset($_POST["titulo"]) && isset( $_POST["estado"]) && isset( $_POST["descripcion"])) {
      
      if( isset($_POST["id"]) ) {
         
         foreach($notas as &$n)
            if( $n["id"] == $_POST["id"]) {
               $nota = $n;
               break;
            }
            
      }
      
      $nota["titulo"] = $_POST["titulo"];
      $nota["estado"] = $_POST["estado"];
      $nota["descripcion"] = $_POST["descripcion"];
      
      if( !isset($nota["id"]) )
         $nota["id"] = count($notas);
     
      $notasFile = fopen("notas.json", "w");
      fwrite($notasFile, json_encode($notas));
      fclose($notasFile);
  
   } else if( isset($_GET["borrar"]) ) {
      
      $actualizadas = array();
      
      foreach($notas as $nota)
         if( $nota["id"] != $_GET["borrar"] ) 
            array_push($actualizadas, $nota);
      
      $notasFile = fopen("notas.json", "w");
      fwrite($notasFile, json_encode($actualizadas));
      fclose($notasFile);
      
      echo "0";
      
   } else {
      
      echo json_encode($notas);
      
   }
?>