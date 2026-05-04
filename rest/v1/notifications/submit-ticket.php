<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

include_once("mail-config.php");
include_once("templates/submit-ticket.php");

function sendSubmitTicketEmail(
	$admin_email,
	$admin_first_name,
	$admin_last_name,
	$user_first_name,
	$user_last_name,
	$user_email,
	$date_submitted,
	$question,
) {
	//trigger exception in a "try" block
	try {
		$mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = HOST; // SiteGround
		$mail->Port = PORT;
		$mail->SMTPSecure = SMTPSECURE;
		$mail->SMTPAuth = true;
		$mail->Username =  USERNAME; // if gmail use your gmail email
		$mail->Password = PASSWORD; // if gmail use your email password
		$mail->Subject = SUBMIT_TICKET;
		$mail->setFrom(USERNAME, FROM);
		$mail->isHTML(true);
		$mail->Body = getHtmlSubmitTicket(
			$admin_first_name,
			$admin_last_name,
			$user_first_name,
			$user_last_name,
			$user_email,
			$date_submitted,
			$question,
			ROOT_DOMAIN,
			IMAGES_URL
		);
		$mail->addAddress($admin_email);

		if ($mail->Send()) {
			return array(
				"mail_success" => true,
				"error" => "No Error."
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
