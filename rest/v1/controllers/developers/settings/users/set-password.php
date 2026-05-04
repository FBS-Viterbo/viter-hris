<?php

require '../../../../core/header.php';
require '../../../../core/Encryption.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/users/Users.php';
// database

$conn = null;
$conn = checkDbConnection();
// models
$val = new User($conn);
$encrypt = new Encryption();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    //validate data
    checkPayload($data);
    $val->users_password = $encrypt->doPasswordHash($data['new_password']);
    $val->users_key = $data['key'];
    $val->users_updated = date("Y-m-d H:i:s");
    $query = checkSetPassword($val);
    http_response_code(200);
    returnSuccess($val, "User set password", $query);
}

http_response_code(200);
checkAccess();
