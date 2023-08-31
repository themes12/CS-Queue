// อ่านค่าห้อง
async function readOne(id) {
    
    const data = {
        "readOne" : 1,
        "id": id
    }

    return $.post("api/api.php", data);
}

async function updateQueue(id, num) {
    const data = {
        "updateQueue" : 1,
        "id": id,
        "num": num
    }

    return $.post("api/api.php", data);
}

// ใช้ ajax ส่งค่าไปเพิ่มคน
// async function updateIncrementQueue(id, num) {
//     const data = {
//         "updateIncrementQueue" : 1,
//         "id": id,
//         "num": num
//     }

//     return $.post("api/api.php", data);
// }

// ใช้ ajax ส่งค่าไปลดคน
// async function updateDecrementQueue(id, num) {
//     const data = {
//         "updateDecrementQueue" : 1,
//         "id": id,
//         "num": num
//     }

//     return $.post("api/api.php", data);
// }

async function updateStatusDB(id) {
    const data = {
        "updateStatusDB" : 1,
        "id": id,
    }

    return $.post("api/api.php", data);
}

// async function updateAvailable(id, num) {
//     const data = {
//         "updateAvailable" : 1,
//         "id": id,
//         "num": num
//     }

//     return $.post("api/api.php", data);
// }

// update text คนใน queue
// function updateInQueue(data) {
//     $("#in-queue").html(`จำนวนคนในคิวขณะนี้ ${data.in_queue} ${data.status === 1 && data.available > 0 ? `<span class="tag is-success is-medium">ว่าง ${data.available} คน</span>` : `<span class="tag is-danger is-medium">ไม่ว่าง</span>`}`)
// }

function updateInQueue(data) {
    $("#in-queue").html(`จำนวนคนในคิวขณะนี้ ${data.in_queue} ${data.status === 1 ? `<span class="tag is-success is-medium">ว่าง</span>` : `<span class="tag is-danger is-medium">ไม่ว่าง</span>`}`)
}

// function updateStatus(data) {
//     $("status").val(data.status);
//     updateInQueue(data)
//     if(data.status === 1) {
//         $("#available").attr("disabled", false)
//         $("#available-btn").attr("disabled", false)
//         $("#available-status").addClass("is-selected is-success")
//         $("#not-available-status").removeClass("is-selected is-danger")
//     }else {
//         $("#available").attr("disabled", true)
//         $("#available-btn").attr("disabled", true)
//         $("#available-status").removeClass("is-selected is-success")
//         $("#not-available-status").addClass("is-selected is-danger")
//     }
// }

function updateStatus(data) {
    $("status").val(data.status);
    updateInQueue(data)
    if(data.status === 1) {
        // $("#available").attr("disabled", false)
        // $("#available-btn").attr("disabled", false)
        $("#available-status").addClass("is-selected is-success")
        $("#not-available-status").removeClass("is-selected is-danger")
    }else {
        // $("#available").attr("disabled", true)
        // $("#available-btn").attr("disabled", true)
        $("#available-status").removeClass("is-selected is-success")
        $("#not-available-status").addClass("is-selected is-danger")
    }
}

// get room id from get parameter (?room=7)
function getRoomId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const id = urlParams.get('room');

    return id
}

async function toggleStatus() {
    console.log("click")
    const id = getRoomId()
    const status = $("#status").val();
    $("#status").val(!status)
    await updateStatusDB(id)
    // await updateAvailable(id, 0)
    const response = await readOne(id);
    updateStatus(response);
}

// document ready read room's data
$(document).ready(async function() {
    const id = getRoomId()
    const response = await readOne(id);
    updateInQueue(response);
    updateStatus(response);

    setInterval(async function () {
        console.log("reload")
        const response = await readOne(id);
        updateInQueue(response);
        updateStatus(response);
    }, 3000);
});

// เพิ่มเข้าคิว
$("#add-queue-btn").on("click", async function () {
    const id = getRoomId()
    const num = $("#add-queue").val();

    if(num < 1) {
        alert("จำนวนคนต้องมากกว่า 1")
        $("#add-queue").val('')
        return
    }

    if(confirm("ยืนยันการเพิ่มคนเข้าคิว") === false) {
        $("#add-queue").val('')
        return
    }

    await updateQueue(id, num);
    const response = await readOne(id);
    updateInQueue(response);
    $("#add-queue").val('')
});

// $("#add-queue-btn").on("click", async function () {
//     const id = getRoomId()
//     const num = $("#add-queue").val();

//     if(num < 1) {
//         alert("จำนวนคนต้องมากกว่า 1")
//         $("#add-queue").val('')
//         return
//     }

//     if(confirm("ยืนยันการเพิ่มคนเข้าคิว") === false) {
//         $("#add-queue").val('')
//         return
//     }

//     // await updateIncrementQueue(id, num);
//     const response = await readOne(id);
//     updateInQueue(response);
//     $("#add-queue").val('')
// });

// เอาคนออกคิว
// $("#dequeue-btn").on("click", async function () {
//     const id = getRoomId()
//     const num = $("#dequeue").val();

//     if(num < 1) {
//         alert("จำนวนคนต้องมากกว่า 1")
//         $("#dequeue").val('')
//         return
//     }

//     if(confirm("ยืนยันการเอาคนออกจากคิว") === false) {
//         $("#dequeue").val('')
//         return
//     }

//     // await updateDecrementQueue(id, num);
//     const response = await readOne(id);
//     updateInQueue(response);
//     $("#dequeue").val('')
// });

// $("#available-btn").on("click", async function () {
//     const id = getRoomId()
//     const num = $("#available").val();
    
//     if(!$("#available-btn").prop("disabled")){
//         if(num < 1) {
//             alert("จำนวนคนต้องมากกว่า 1")
//             $("#available").val('')
//             return
//         }
    
//         if(confirm(`ยืนยันจำนวนคนในห้องว่างขณะนี้ ${num} คน`) === false) {
//             $("#available").val('')
//             return
//         }
    
//         // await updateAvailable(id, num);
//         const response = await readOne(id);
//         updateStatus(response);
//         $("#available").val('')
//     }
// });