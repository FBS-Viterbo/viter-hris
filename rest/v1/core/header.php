<?php
header("Content-Type: application/json; charset=UTF-8");
// header('WWW-Authenticate: Basic realm="Protected zone"');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
// date_default_timezone_set("Asia/Manila");
date_default_timezone_set("Asia/Taipei");

