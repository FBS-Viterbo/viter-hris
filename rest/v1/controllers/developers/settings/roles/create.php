<?php
// check database connection 
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes for save database

$role_name = $data["role_name"];

returnError($role_name);