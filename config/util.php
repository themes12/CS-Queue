<?php
class Util
{
    public function testInput($data)
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        $data = strip_tags($data);

        return $data;
    }

    public function checkId($id): bool
    {
        if (isset($id) === false || empty($id)) return false;
        return true;
    }

    public function checkNum($num): bool
    {
        if (isset($num) === false) return false;
        return true;
    }

    /*
    * returnJsonHttpResponse
    * @param $success: Boolean
    * @param $data: Object or Array
    */
    function returnJsonHttpResponse($success, $data)
    {
        // remove any string that could create an invalid JSON 
        // such as PHP Notice, Warning, logs...
        ob_clean();

        // this will clean up any previously added headers, to start clean
        header_remove();

        // Set the content type to JSON and charset 
        // (charset can be set to something else)
        header("Content-type: application/json; charset=utf-8");

        // Set your HTTP response code, 2xx = SUCCESS, 
        // anything else will be error, refer to HTTP documentation
        if ($success) {
            http_response_code(200);
        } else {
            http_response_code(500);
        }

        // encode your PHP Object or Array into a JSON string.
        // stdClass or array
        echo json_encode($data);

        // making sure nothing is added
        exit();
    }
}
