<?php
require_once '../config/db.php';
require_once '../config/util.php';

$db = new Database();
$util = new Util();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if(isset($_POST["readAll"])) {
        $result = $db->readAll();
        $arr = array();

        foreach ($result as $key => $item) {
            $arr[$item['floor']][] = $item;
        }

        ksort($arr, SORT_NUMERIC);
        $util->returnJsonHttpResponse(true, $arr);
    }

    if(isset($_POST["readOne"])) {
        if(!$util->checkId($_POST["id"])) {
            $util->returnJsonHttpResponse(false, [
                "message" => "missing parameter."
            ]);
        }

        $result = $db->readOne($_POST["id"]);
        $util->returnJsonHttpResponse(true, $result);
    }

    if(isset($_POST["updateIncrementQueue"])) {
        if(!$util->checkId($_POST["id"]) || !$util->checkNum($_POST["num"])) {
            $util->returnJsonHttpResponse(false, [
                "message" => "missing parameter."
            ]);
        }

        $result = $db->updateIncrementQueue($_POST["id"], $_POST["num"]);
        $util->returnJsonHttpResponse(true, $result);
    }

    if(isset($_POST["updateDecrementQueue"])) {
        if(!$util->checkId($_POST["id"]) || !$util->checkNum($_POST["num"])) {
            $util->returnJsonHttpResponse(false, [
                "message" => "missing parameter."
            ]);
        }

        $result = $db->updateDecrementQueue($_POST["id"], $_POST["num"]);
        $util->returnJsonHttpResponse(true, $result);
    }

    if(isset($_POST["updateStatusDB"])) {
        if(!$util->checkId($_POST["id"])) {
            $util->returnJsonHttpResponse(false, [
                "message" => "missing parameter."
            ]);
        }
        $result = $db->updateStatus($_POST["id"]);
        $util->returnJsonHttpResponse(true, $result);
    }

    if(isset($_POST["updateAvailable"])) {
        if(!$util->checkId($_POST["id"]) || !$util->checkNum($_POST["num"])) {
            $util->returnJsonHttpResponse(false, [
                "message" => "missing parameter."
            ]);
        }
        $result = $db->updateAvailable($_POST["id"], $_POST["num"]);
        $util->returnJsonHttpResponse(true, $result);
    }
}
?>