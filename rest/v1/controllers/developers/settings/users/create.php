<?php
// import notification
require '../../../../notifications/verify-account.php';
// import encryption

// check database connection
$conn = null;
$conn = checkDbConnection();
// make use of classes for save database
$val = new Users($conn);
$encrypt = new Encryption();

$val->users_is_active = 1;
$val->users_first_name = trim($data['users_first_name']);
$val->users_last_name = trim($data['users_last_name']);
$val->users_email = trim($data['users_email']);
$val->users_password = '';
$val->users_key = $encrypt->doHash(rand());
$val->users_role_id = $data['users_role_id'];
$val->users_created = date('Y-m-d H:i:s');
$val->users_updated = date('Y-m-d H:i:s');
$password_link = "/create-password";

// VALIDATIONS
isNameExist($val, $val->users_first_name);

// CREATE

$emailSendCount = 0;
$sendEmail = [
    "mail_success" => false,
    "error" => "Email was not attempted.",
];
$query = checkCreate($val);
if ($query->rowCount() > 0) {
    $sendEmail = sendEmail(
        $password_link,
        $val->users_first_name,
        $val->users_email,
        $val->users_key,
    );
    if ($sendEmail['mail_success'])
        $emailSendCount++;
}
http_response_code(200);
returnSuccess($val, "Users Create", $query, $sendEmail);
