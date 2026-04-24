<?php

$conn = null;
$conn = checkDbConnection();
$val = new Notifications($conn);

$val->notification_is_active = 1;
$val->first_name = trim($data['first_name']);
$val->last_name = trim($data['last_name']);
$val->purpose = trim($data['purpose']);
$val->email = trim($data['email']);
$val->notification_created = date("Y-m-d H:m:s");
$val->notification_updated = date("Y-m-d H:m:s");

isEmailExist($val, $val->email);

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Notifications Create", $query);
