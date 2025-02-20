<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Zorg dat Composer PHPMailer heeft geïnstalleerd

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $naam = htmlspecialchars($_POST["naam"]);
    $email = htmlspecialchars($_POST["email"]);
    $bericht = htmlspecialchars($_POST["bericht"]);

    $mail = new PHPMailer(true);
    
    try {
        // SMTP instellingen
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Gebruik de SMTP-server van je provider (bijv. smtp.gmail.com)
        $mail->SMTPAuth = true;
        $mail->Username = 'JOUW_EMAIL@gmail.com'; // ✏️ Vervang met jouw e-mailadres
        $mail->Password = 'JOUW_WACHTWOORD'; // ✏️ Vervang met jouw SMTP-wachtwoord
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; 

        // Verzender & Ontvanger
        $mail->setFrom($email, $naam);
        $mail->addAddress('VaDr121007@leerling.mosa-rt.be'); // Jouw e-mail waar het bericht naartoe gaat

        // E-mail inhoud
        $mail->isHTML(true);
        $mail->Subject = "Nieuw bericht van contactformulier";
        $mail->Body = "<strong>Naam:</strong> $naam<br><strong>E-mail:</strong> $email<br><br><strong>Bericht:</strong><br>$bericht";

        $mail->send();
        
        // JavaScript-popup voor succesmelding
        echo "<script>
            alert('Je bericht is succesvol verzonden!');
            window.location.href='contact.html';
        </script>";
    } catch (Exception $e) {
        echo "Er is een fout opgetreden: {$mail->ErrorInfo}";
    }
} else {
    echo "Ongeldige aanvraag.";
}
?>
