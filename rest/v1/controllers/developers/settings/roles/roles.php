<?php

require '../../../../core/header.php';
require '../../../../core/functions.php';

// get payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// CREATE / POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $result = require 'create.php';
    sendResponse($result);
    exit;
}