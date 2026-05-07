<?php

$conn = null;
$conn = checkDbConnection();
$val = new DirectReport($conn);

$val->direct_report_is_active = $_GET["status"] ?? "";
$val->search = $_GET["search"] ?? "";

$query = checkReadAll($val);
http_response_code(200);
getQueriedData($query);
