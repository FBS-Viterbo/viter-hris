<?php

$conn = null;
$conn = checkDbConnection();
$val = new Departments($conn);

$val->department_is_active = 1;
$val->department_name = trim($data['department_name']);
$val->department_created = date("Y-m-d H:m:s");
$val->department_updated = date("Y-m-d H:m:s");

isNameExist($val, $val->department_name);

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Departments Create", $query);
