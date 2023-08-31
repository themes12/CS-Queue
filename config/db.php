<?php
require_once 'config.php';
date_default_timezone_set("Asia/Bangkok");
class Database extends Config {
    public function readAll() {
        $sql = "SELECT * FROM rooms ORDER BY name";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }

    public function readOne(int $id) {
        $sql = "SELECT * FROM rooms WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            'id' => $id
        ]);
        $result = $stmt->fetch();
        return $result;
    }

    public function updateQueue(int $id, int $num) {
        $sql = "UPDATE rooms SET in_queue = :num WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            'num' => $num,
            'id' => $id,
            'num' => $num
        ]);

        return true;
    }

    // public function updateIncrementQueue(int $id, int $num) {
    //     $sql = "UPDATE rooms SET in_queue = in_queue + :num WHERE id = :id";
    //     $stmt = $this->conn->prepare($sql);
    //     $stmt->execute([
    //         'num' => $num,
    //         'id' => $id
    //     ]);

    //     return true;
    // }

    // public function updateDecrementQueue(int $id, int $num) {
    //     $result = $this->readOne($id);
    //     if($result["in_queue"] < $num){
    //         $num = $result["in_queue"];
    //     }
    //     $sql = "UPDATE rooms SET in_queue = in_queue - :num WHERE id = :id";
    //     $stmt = $this->conn->prepare($sql);
    //     $stmt->execute([
    //         'num' => $num,
    //         'id' => $id
    //     ]);

    //     return true;
    // }

    public function updateStatus(int $id) {
        $result = $this->readOne($id);
        if($result["status"] === 0) {
            $num = 0;
            if($result["in_queue"] < $result["maximum"]){
                $num = $result["in_queue"];
            }else {
                $num = $result["maximum"];
            }
            $status = $result["status"] === 1 ? 0 : 1;

            $sql = "UPDATE rooms SET status = :status, in_queue = in_queue - :num WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([
                'status' => $status,
                'id' => $id,
                'num' => $num
            ]);
            return true;
        }else {
            $status = $result["status"] === 1 ? 0 : 1;

            $sql = "UPDATE rooms SET status = :status WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([
                'status' => $status,
                'id' => $id
            ]);
            return true;
        }

    }

    // public function updateAvailable(int $id, int $num) {
    //     $sql = "UPDATE rooms SET available = :available, last_updated = :last_updated WHERE id = :id";
    //     $stmt = $this->conn->prepare($sql);
    //     $stmt->execute([
    //         'id' => $id,
    //         'available' => $num,
    //         'last_updated' => date('Y-m-d H:i:s')
    //     ]);

    //     return true;
    // }
}
?>