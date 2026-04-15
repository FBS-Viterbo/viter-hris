<?php
// check database connection 
$conn = null;
$conn = checkDbConnection();
// make use of classes for save database
$val = new Roles($conn);

if (array_key_exists("id", $_GET)) {
    $val->role_aid = $_GET["id"];
    $val->role_name = $data['role_name'];
    $val->role_description = $data['role_description'];
    $val->role_updated = date("Y-m-d H:m:s");

    checkId($val->role_aid);

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Roles Update", $query);
}

checkEndpoint();

