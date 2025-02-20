<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $naam = htmlspecialchars($_POST["naam"]);
    $email = htmlspecialchars($_POST["email"]);
    $bericht = htmlspecialchars($_POST["bericht"]);

    $ontvanger = "VaDr121007@leerling.mosa-rt.be"; // Vervang met jouw e-mailadres
    $onderwerp = "Nieuw bericht van contactformulier";
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8";

    $berichtInhoud = "Naam: $naam\n";
    $berichtInhoud .= "E-mail: $email\n\n";
    $berichtInhoud .= "Bericht:\n$bericht\n";

    if (mail($ontvanger, $onderwerp, $berichtInhoud, $headers)) {
        header("Location: contact.html");
        exit();
    } else {
        echo "Er is iets misgegaan, probeer het later opnieuw.";
    }
} else {
    echo "Ongeldige aanvraag.";
}
?>
