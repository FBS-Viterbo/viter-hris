<?php

$conn = null;
$conn = checkDbConnection();
$val = new DirectReport($conn);

checkPayload($data);

$val->direct_report_is_active = 1;
$val->direct_report_subordinate_id = checkIndex($data, "direct_report_subordinate_id");
$val->direct_report_supervisor_id = checkIndex($data, "direct_report_supervisor_id");
$val->direct_report_created = date("Y-m-d H:i:s");
$val->direct_report_updated = date("Y-m-d H:i:s");

if ($val->direct_report_subordinate_id === $val->direct_report_supervisor_id) {
    returnError("The subordinate and supervisor cannot be the same person.");
}

$subordinate = $val->checkEmployee($val->direct_report_subordinate_id);
checkQuery($subordinate, "There's a problem processing your request. (subordinate)");

if ($subordinate->rowCount() === 0) {
    returnError("Subordinate employee not found.");
}

$supervisor = $val->checkEmployee($val->direct_report_supervisor_id);
checkQuery($supervisor, "There's a problem processing your request. (supervisor)");

if ($supervisor->rowCount() === 0) {
    returnError("Supervisor employee not found.");
}

$reverse = $val->checkReverseAssignment();
checkQuery($reverse, "There's a problem processing your request. (direct report validation)");

if ($reverse->rowCount() > 0) {
    returnError("Invalid request, the supervisor cannot be assigned to the selected subordinate.");
}

$query = checkCreate($val);
http_response_code(200);
returnSuccess($val, "Direct Report Create", $query);
