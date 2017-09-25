<?php

if (strlen($_POST['email']) > 5) {

    $to = 'samosval.aod@yandex.ru';
    $subject = 'Сообщение с сайта [smirnovdm.ru]';
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: smirnovdm.ru <smirnovdm.ru>\r\n";

    $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <h3>'.$subject.'</h3>                 
                        <p>Имя: '.$_POST['name'].'</p>                                
                        <p>E-mail: '.$_POST['email'].'</p>
                        <p>Текст сообщения: '.$_POST['message'].'</p>
                    </body>
                </html>';

     mail($to, $subject, $message, $headers);

}

?>