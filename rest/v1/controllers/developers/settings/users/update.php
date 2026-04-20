<?php
// CORS headers - must be first
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

// Handle preflight immediately
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// check database connection 
$conn = null;
$conn = checkDbConnection();
// make use of classes for save database
$val = new Users($conn);

if (array_key_exists("id", $_GET)) {
    $val->users_aid = $_GET["id"];
    $val->users_first_name = $data['users_first_name'];
    $val->users_last_name = $data['users_last_name'];
    $val->users_email = $data['users_email'];
    $val->users_role_id = $data['users_role_id'];
    $val->users_updated = date("Y-m-d H:m:s");

    $users_email_old = $data['users_email_old'];

    // validations
    checkId($val->users_aid);
    compareEmail(
        $val,//models
        $users_email_old,//old record
        $val->users_email//new record
    );

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "User Update", $query);
}

checkEndpoint();

