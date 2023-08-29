<?php
require_once 'config.php';
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

    public function updateIncrementQueue(int $id, int $num) {
        $sql = "UPDATE rooms SET in_queue = in_queue + :num WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            'num' => $num,
            'id' => $id
        ]);

        return true;
    }

    public function updateDecrementQueue(int $id, int $num) {
        $result = $this->readOne($id);
        if($result["in_queue"] < $num){
            $num = $result["in_queue"];
        }
        $sql = "UPDATE rooms SET in_queue = in_queue - :num WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            'num' => $num,
            'id' => $id
        ]);

        return true;
    }

    public function updateStatus(int $id) {
        $result = $this->readOne($id);
        $status = $result["status"] === 1 ? 0 : 1;

        $sql = "UPDATE rooms SET status = :status WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            'status' => $status,
            'id' => $id,
        ]);

        return true;
    }

    public function updateAvailable(int $id, int $num) {
        $sql = "UPDATE rooms SET available = :available WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            'id' => $id,
            'available' => $num
        ]);

        return true;
    }
}
?>