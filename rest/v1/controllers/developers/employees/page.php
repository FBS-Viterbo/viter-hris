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

// set http header
require __DIR__ . '/../../../core/header.php';
// use needed functions
require __DIR__ . '/../../../core/functions.php';
// use models
require __DIR__ . '/../../../models/developers/employees/Employees.php';
// store models into variables

$conn = null;
$conn = checkDBConnection();

$val = new Employees($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    if (array_key_exists("start", $_GET)) {
        // check data if exist and data is required
        checkPayload($data);

        $val->start = $_GET['start'];
        $val->total = 10;
        $val->employee_is_active = $data['filterData'];
        $val->search = $data['searchValue'];

        // validation
        checkLimitId($val->start, $val->total);

        $query = checkReadLimit($val);
        $total_result = checkReadAll($val);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $val->total,
            $val->start
        );
    }
}

// return 404 if endpoint is active
checkEndpoint();
