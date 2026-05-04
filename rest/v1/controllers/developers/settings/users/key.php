<?php

require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/users/Users.php';
// database

$conn = null;
$conn = checkDbConnection();
// models
$val = new User($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    //validate data
    // checkPayload($data);
    if (array_key_exists('key', $_GET) == false) {
        $val->users_key = $_GET['key'];
        $query = checkReadKey($val);
        http_response_code(200);
        getQueriedData($query);
    }
    checkEndpoint();
}

http_response_code(200);
checkAccess();