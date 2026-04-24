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
require '../../../../models/developers/settings/notifications/Notifications.php';

$conn = null;
$conn = checkDBConnection();
$val = new Notifications($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (!empty($data)) {
        checkPayload($data);
        $val->notification_is_active = trim($data['isActive']);
        $val->email = trim($data['email']);
        $val->notification_updated = date('Y-m-d H:m:s');

        $query = checkActive($val);
        http_response_code(200);
        returnSuccess($val, 'notification active', $query);
    }

    checkEndpoint();
}

checkAccess();
