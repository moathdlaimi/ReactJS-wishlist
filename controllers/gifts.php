<?php

header('Content-Type: application/json');
include_once __DIR__ .'/../models/gift.php';

if($_REQUEST['action'] === 'index') {
  echo json_encode(Gifts::all());


} elseif ($_REQUEST['action'] === 'post') {
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);
  $new_gift = new Gift(null,$body_object->wisher,$body_object->item,$body_object->image,$body_object->des,$body_object->link);
  $all_gifts = Gifts::create($new_gift);
  echo json_encode($all_gifts);
}
elseif ($_REQUEST['action'] === 'update') {
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);
  $updated_gift = new Gift($_REQUEST['id'] ,$body_object->wisher,$body_object->item,$body_object->image,$body_object->des,$body_object->link);
  $all_gifts = Gifts::update($updated_gift);
  echo json_encode($all_gifts);

}
elseif ($_REQUEST['action'] === 'delete') {
  $all_gifts = Gifts::delete($_REQUEST['id']);
  echo json_encode($all_gifts);
}




?>
