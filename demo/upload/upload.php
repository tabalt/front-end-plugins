<?php 
$result = isset($_GET['result']) ? $_GET['result'] : 'error';

if($result == 'success') {
    $data = array(
        "status" => 1,
        "info" => 'upload success',
        "data" => '',
    );
} else {
    $data = array(
        "status" => 0,
        "info" => 'upload error',
        "data" => '',
    );
}

exit(json_encode($data));