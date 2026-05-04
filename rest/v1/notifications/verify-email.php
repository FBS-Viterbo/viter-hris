<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

include_once("mail-config.php");
include_once("templates/verify-email.php");

function sendEmailVerify($link, $name, $email_old, $email, $key)
{
	//trigger exception in a "try" block
	try {
		$mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = HOST; // SiteGround
		$mail->Port = PORT;
		$mail->SMTPSecure = SMTPSECURE;
		$mail->SMTPAuth = true;
		$mail->Username = USERNAME; // if gmail use your gmail email
		$mail->Password = PASSWORD; // if gmail use your email password
		$mail->Subject = VERIFY_EMAIL;
		$mail->setFrom(USERNAME, FROM);
		$mail->isHTML(true);
		$mail->Body = getHtmlVerifyEmail(
			$link,
			$name,
			$email_old,
			$email,
			$key,
			ROOT_DOMAIN,
			IMAGES_URL
		);
		$mail->addAddress($email_old);

		if ($mail->Send()) {
			return array(
				"mail_success" => true,
				"error" => "No Error.",
			);
		} else {
			return array(
				"error" => "Could not send email. Please refresh your page and try again.",
				"mail_success" => false
			);
		}
	}
	//catch exception
	catch (Exception $e) {
		return array(
			"mail_error" => $e->getMessage(),
			"error" => "Could not authenticate. Please make sure your email and password are correct.",
			"mail_success" => false
		);
	}
}
