<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/departments/Departments.php';

$conn = null;
$conn = checkDBConnection();
$val = new Departments($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists('id', $_GET)) {
        checkPayload($data);
        $val->department_aid = $_GET['id'];
        $val->department_is_active = trim($data['isActive']);
        $val->department_updated = date('Y-m-d H:m:s');

        checkId($val->department_aid);

        $query = checkActive($val);
        http_response_code(200);
        returnSuccess($val, 'department active', $query);
    }

    checkEndpoint();
}

checkAccess();
