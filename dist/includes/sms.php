<?php
class sms{
     /**
      * Sending sms through Postiko service
-     * @param string $phone phone number
+     * @param string $phone Phone number
      * @param string $message Message text
-     * @return string $sms_answer  postiko answer
+     * @return string $sms_answer  Postiko answer
      */
     static function send_sms($phone,$message)
     {
 
     include_once SITE_PATH . 'Postiko_send_sms.php';
 
 
         if (!empty($phone) and !empty($message)) {
             $login = '2255483@mail.ru';
             $pass = 'nopasaran123';
             $_API_CHANNEL_OBJ = new PostikoApiChannel('$login','$pass'); //Перед выполнением любого из методов класса, необходимо создать объект содержащий логин и пароль.
 
             $_RECIPIENTS = array(
                 $phone
             );//Номера в любом формате через запятую
             $_TEXT = $message;
             $_SENDER = 'R-kosmetika';//не трогаем данные из личного кабинет
             $_PARAMETRS = 'login='.$login.'&pass='.$pass.'&method=send_sms&recipients='.json_encode($_RECIPIENTS).'&text_message='.$_TEXT.'&sender='.$_SENDER;
             $address = 'http://postiko.ru/cabinet/api/';
             $chp = curl_init($address);
             curl_setopt($chp, CURLOPT_HEADER, 0);
             curl_setopt($chp, CURLOPT_RETURNTRANSFER,1);
             curl_setopt($chp, CURLOPT_SSL_VERIFYPEER,0);
             curl_setopt($chp, CURLOPT_POST, true);
             curl_setopt($chp, CURLOPT_POSTFIELDS, $_PARAMETRS);
 
             return $sms_answer=curl_exec($chp);
         }
 
 }
 }
 ?>