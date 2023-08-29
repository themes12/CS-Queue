async function readAll() {
    const data = {
        "readAll" : 1
    }

    return $.post("api/api.php", data);
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
    }, 10000);
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

function createRoom(data) {
    const template = `
    <div class="column is-4">
        <a href="manage.php?room=${data.id}">
            <div class="box">
                <div class="content">
                    <h3 class="title is-3">${data.name}</h3>
                    <h4 class="subtitle is-4">${data.activity} (จำนวนสูงสุด ${data.maximum} คน)</h4>
                    <div class="columns content is-medium">
                        <div class="column is-full">
                           อยู่ในคิว ${data.in_queue} คน ${data.status === 1 && data.available > 0 ? `<span class="tag is-success is-medium">ว่าง ${data.available} คน</span>` : `<span class="tag is-danger is-medium">ไม่ว่าง</span>`}
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `
    return template
}