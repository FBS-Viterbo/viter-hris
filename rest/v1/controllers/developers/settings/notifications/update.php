<?php

$conn = null;
$conn = checkDbConnection();
$val = new Notifications($conn);

if (!empty($data)) {
    $val->first_name = trim($data['first_name']);
    $val->last_name = trim($data['last_name']);
    $val->purpose = trim($data['purpose']);
    $val->email = trim($data['email']);
    $val->email_old = trim($data['email_old']);
    $val->notification_updated = date("Y-m-d H:m:s");

    compareEmail(
        $val,
        $val->email_old,
        $val->email
    );

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Notifications Update", $query);
}

checkEndpoint();
