<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require __DIR__ . '/../../../../core/header.php';
require __DIR__ . '/../../../../core/functions.php';
require __DIR__ . '/../../../../models/developers/settings/memo/Memo.php';

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $result = require 'create.php';
    sendResponse($result);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $result = require 'read.php';
    sendResponse($result);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $result = require 'update.php';
    sendResponse($result);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $result = require 'delete.php';
    sendResponse($result);
    exit;
}
