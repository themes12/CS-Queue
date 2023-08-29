<?php include_once 'include/header.php' ?>
<?php
require_once './config/db.php';
require_once './config/util.php';
$db = new Database();
$util = new Util();

if(!$util->checkId($_GET["room"])) {
    header("location: ./");
    exit(0);
}

$result = $db->readOne($_GET["room"]);
?>
<div class="container my-4 has-text-centered"> 
    <h3 class="title is-3">ห้อง <?php echo $result["name"] ?></h3>
    <h4 class="subtitle is-4">กิจกรรม <?php echo $result["activity"] ?> (สูงสุด <?php echo $result["maximum"] ?> คน)</h4>
    <h5 class="subtitle is-5" id="in-queue">จำนวนคนในคิวขณะนี้ <?php echo $result['in_queue'] ?></h5>
    <div class="content is-medium">
        <div class="columns">
            <div class="column is-6">
                <p>จำนวนคนในห้องว่าง (สำหรับ Staff ในห้อง)</p>
                <div class="field has-addons has-addons-centered">
                    <input type="hidden" id="status" value="<?php echo $result["status"] ?>">
                    <div class="buttons has-addons">
                        <button class="button" id="available-status" onclick="toggleStatus()">ว่าง</button>
                        <button class="button" id="not-available-status" onclick="toggleStatus()">ไม่ว่าง</button>
                    </div>
                </div>
                <div class="field has-addons has-addons-centered">
                    <div class="control">
                        <input class="input" type="number" id="available" min="0" placeholder="จำนวนคนในห้องว่าง" required>
                    </div>
                    <div class="control">
                        <a class="button is-info" id="available-btn">
                        Submit
                        </a>
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <p>Queue (สำหรับ Staff นอกห้อง)</p>
                <div class="field has-addons has-addons-centered">
                    <div class="control">
                        <input class="input" id="add-queue" type="number" min="0" placeholder="เพิ่มคนในคิว" required>
                    </div>
                    <div class="control">
                        <a class="button is-success" id="add-queue-btn">
                        เพิ่ม
                        </a>
                    </div>
                </div>
                <div class="field has-addons has-addons-centered">
                    <div class="control">
                        <input class="input" type="number" min="0" placeholder="ลดคนในคิว" id="dequeue" required>
                    </div>
                    <div class="control">
                        <a class="button is-danger" id="dequeue-btn">
                        ลด
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <a class="button" href="./">กลับหน้าหลัก</a>
</div>
<script src="js/manage.js"></script>
<?php include_once 'include/footer.php' ?>