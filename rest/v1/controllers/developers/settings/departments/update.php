<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$conn = null;
$conn = checkDbConnection();
$val = new Departments($conn);

if (array_key_exists("id", $_GET)) {
    $val->department_aid = $_GET["id"];
    $val->department_name = trim($data['department_name']);
    $val->department_updated = date("Y-m-d H:m:s");

    $department_name_old = $data['department_name_old'];

    checkId($val->department_aid);
    compareName(
        $val,
        $department_name_old,
        $val->department_name
    );

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Departments Update", $query);
}

checkEndpoint();
