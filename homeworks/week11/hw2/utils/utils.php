<?php
// 在這邊直接開啟 SESSION
session_start();
// 連線用 php
require_once("conn.php");

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