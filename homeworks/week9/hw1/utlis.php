<?php
// 連線用 php
require_once("conn.php");
// markdown 與 XSS 過濾
require_once("Parsedown.php");
$parsedown = new Parsedown();
// 一些實用 function
// 產生 token

function generateToken($length)
{
  $s = '';
  $tokenLength = $length;
  for ($i = 1; $i <= $tokenLength; $i++) {
    $s .= chr(rand(65, 90));
  }
  return $s;
}

?>