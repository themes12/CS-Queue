async function readAll() {
    const data = {
        "readAll" : 1
    }

    return $.post("api/api.php", data);
}

async function readOne(id) {
    
    const data = {
        "readOne" : 1,
        "id": id
    }

    return $.post("api/api.php", data);
}

// ใช้ ajax ส่งค่าไปเพิ่มคน
async function updateIncrementQueue(id, num) {
    const data = {
        "updateIncrementQueue" : 1,
        "id": id,
        "num": num
    }

    return $.post("api/api.php", data);
}

// ใช้ ajax ส่งค่าไปลดคน
async function updateDecrementQueue(id, num) {
    const data = {
        "updateDecrementQueue" : 1,
        "id": id,
        "num": num
    }

    return $.post("api/api.php", data);
}

function updateInQueue(data) {
    $("#in-queue").html(`จำนวนคนในคิวขณะนี้ ${data.in_queue}`)
}

function createElement(response) {
    let container = '';
    Object.entries(response).forEach(([index, item]) => {
        let column = '';
        item.forEach(room => {
            const roomTemplate = createRoom(room);
            column += roomTemplate;
        });

        const columnFloor = createContainer(index, column)
        container += columnFloor;
    });

    $("#activity-container").html(container)
}

$(document).ready(async function() {
    const response = await readAll();
    createElement(response)

    setInterval(async function () {
        console.log("reload")
        const response = await readAll();
        createElement(response)
    }, 7500);
});

// เพิ่มเข้าคิว
$(document).on ("click", "#add-queue-btn", function () {
    console.log($(this))
    const id = $(this).siblings("input")
    console.log(id)
    const num = $("#add-queue").val();

    // if(num < 1) {
    //     alert("จำนวนคนต้องมากกว่า 1")
    //     $("#add-queue").val('')
    //     return
    // }

    // if(confirm("ยืนยันการเพิ่มคนเข้าคิว") === false) {
    //     $("#add-queue").val('')
    //     return
    // }

    // await updateIncrementQueue(id, num);
    // const response = await readOne(id);
    // updateInQueue(response);
    // $("#add-queue").val('')
});

// // เอาคนออกคิว
$(document).on ("click", "#dequeue-btn", function () {
    console.log($(this))
    const id = $(this).siblings("input")
    const num = $("#dequeue").val();

    console.log(id)
    // if(num < 1) {
    //     alert("จำนวนคนต้องมากกว่า 1")
    //     $("#dequeue").val('')
    //     return
    // }

    // if(confirm("ยืนยันการเอาคนออกจากคิว") === false) {
    //     $("#dequeue").val('')
    //     return
    // }

    // await updateDecrementQueue(id, num);
    // const response = await readOne(id);
    // updateInQueue(response);
    // $("#dequeue").val('')
});

function createContainer(floor, column) {
    const template = `
    <div class="container mx-4">
        <p class="subtitle is-4">ชั้นที่ ${floor}</p>
            <div class="columns is-multiline">
                ${column}
            </div>
        <hr class="has-background-light">
    </div>
    `

    return template
}

// function createRoom(data) {
//     const template = `
//     <div class="column is-4">
//         <div class="box room-box">
//             <div class="content">
//                 <h3 class="title is-3">${data.name}</h3>
//                 <h4 class="subtitle is-4">${data.activity}</h4>
//                 <div class="columns content is-medium">
//                     <div class="column is-8">
//                         อยู่ในคิว ${data.in_queue} คน ${data.status === 1 && data.available > 0 ? `<span class="tag is-success is-medium">ว่าง ${data.available} คน</span>` : `<span class="tag is-danger is-medium">ไม่ว่าง</span>`}
//                     </div>
//                 </div>
//             </div>
//             <div class="field has-addons has-addons-centered">
//                 <div class="control">
//                     <input class="input" id="add-queue" type="number" min="0" placeholder="เพิ่มคนในคิว" required>
//                     <input type="hidden" id="room-id" name="room-id" value="${data.id}">
//                 </div>
//                 <div class="control">
//                     <a class="button is-success" id="add-queue-btn">
//                     เพิ่ม
//                     </a>
//                 </div>
//             </div>
//             <div class="field has-addons has-addons-centered">
//                 <div class="control">
//                     <input class="input" type="number" min="0" placeholder="ลดคนในคิว" id="dequeue" required>
//                     <input type="hidden" id="room-id" name="room-id" value="${data.id}">
//                 </div>
//                 <div class="control">
//                     <a class="button is-danger" id="dequeue-btn">
//                     ลด
//                     </a>
//                 </div>
//             </div>
//         </div>
//     </div>
//     `
//     return template
// }

// function createRoom(data) {
//     const template = `
//     <div class="column is-4">
//         <a href="manage.php?room=${data.id}">
//             <div class="box room-box">
//                 <div class="content">
//                     <h3 class="title is-3">${data.name}</h3>
//                     <h4 class="subtitle is-4">${data.activity}</h4>
//                     <div class="columns content is-medium">
//                         <div class="column is-full">
//                             อยู่ในคิว ${data.in_queue} คน ${data.status === 1 && data.available > 0 ? `<span class="tag is-success is-medium">ว่าง ${data.available} คน</span>` : `<span class="tag is-danger is-medium">ไม่ว่าง</span>`}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </a>
//     </div>
//     `
//     return template
// }

function createRoom(data) {
    const template = `
    <div class="column is-4">
        <a href="manage.php?room=${data.id}">
            <div class="box room-box">
                <div class="content">
                    <h3 class="title is-3">${data.name}</h3>
                    <h4 class="subtitle is-4">${data.activity}</h4>
                    <div class="columns content is-medium">
                        <div class="column is-full">
                            อยู่ในคิว ${data.in_queue} คน ${data.status === 1 ? `<span class="tag is-success is-medium">ว่าง</span>` : `<span class="tag is-danger is-medium">ไม่ว่าง</span>`}
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `
    return template
}