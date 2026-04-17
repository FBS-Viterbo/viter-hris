<?php
// check database connection 
$conn = null;
$conn = checkDbConnection();
// make use of classes for save database
$val = new Employees($conn);

if (array_key_exists("id", $_GET)) {
    $val->employee_aid = $_GET["id"];
    $val->employee_first_name = trim($data['employee_first_name']);
    $val->employee_middle_name = trim($data['employee_middle_name']);
    $val->employee_last_name = trim($data['employee_last_name']);
    $val->employee_email = trim($data['employee_email']);
    $val->employee_updated = date("Y-m-d H:m:s");

    $employee_email_old = $data['employee_email_old'];

    // validations
    checkId($val->employee_aid);
    compareEmail(
        $val,//models
        $employee_email_old,//old record
        $val->employee_email//new record
    );

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Employees Update", $query);
}

checkEndpoint();