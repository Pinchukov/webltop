<?php
$frm_name  = "WeblTOP";
$recepient = "info@dvgid.ru";
$sitename  = "WeblTOP";
$subject   = "Новое сообщение с вашего сайта \"$sitename\"";

$name = trim($_POST["name"]);
$mail = trim($_POST["mail"]);
$text = trim($_POST["text"]);
$formname = trim($_POST["formname"]);

$message = "
Форма: $formname <br>
Имя: $name <br>
Телефон или почта: $mail <br>
Сообщение: $text <br>
";

mail($recepient, $subject, $message, "From: $frm_name <$email>" . "\r\n" . "Reply-To: $email" . "\r\n" . "X-Mailer: PHP/" . phpversion() . "\r\n" . "Content-type: text/html; charset=\"utf-8\"");
