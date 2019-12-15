<?php

$token = 'your_telegram_bot_token';

if (isset($_GET["id"])) {
    $id = $_GET["id"];
    sendmsgId($id, "Tem alguém no tapete 🎄".date("d/m/y, g:i a"));
}

function sendmsgId($id, $msg) 
{
	global $token;
	
	$chatid = $id;
	$firstname = $m['message']['chat']['first_name'];
	
	unset($a); 
	exec('curl -s -d "chat_id='.$chatid.'&text='.urlencode($msg).'" "https://api.telegram.org/bot'.$token.'/sendMessage"', $a);
}

?>
