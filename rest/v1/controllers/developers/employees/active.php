<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use models
require '../../../../models/developers/employees/Employees.php';
// store models into variables

$conn = null;
$conn = checkDBConnection();

$val = new Employees($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {
    // check data if exist and data is required
    checkPayload($data);
    $val->employee_aid = $_GET['id'];
    $val->employee_is_active = trim($data['isActive']);
    $val->employee_updated = date('Y-m-d H:m:s');

    // validate is id
    checkId($val->employee_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'employee active', $query);
}

// return 404 if endpoint is active
checkEndpoint();