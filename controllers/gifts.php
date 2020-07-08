<?php

header('Content-Type: application/json');
include_once __DIR__ .'/../models/gift.php';

if ($_REQUEST['action'] === 'index') {
  echo json_encode();
} elseif ($_REQUEST['action'] === 'post') {
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);
  $new_gift = new Gift(null, )


}




?>
