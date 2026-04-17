<?php

require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developers/employees/Employees.php';

// get payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// CREATE / POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $result = require 'create.php';
    sendResponse($result);
    exit;
}


// READ / GET
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $result = require 'read.php';
    sendResponse($result);
    exit;
}

// UPDATE / PUT
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $result = require 'update.php';
    sendResponse($result);
    exit;
}

// DELETE / PUT
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $result = require 'delete.php';
    sendResponse($result);
    exit;
}