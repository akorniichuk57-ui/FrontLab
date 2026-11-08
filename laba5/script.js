// Завдання 1
const form = document.getElementById("userForm");

const fullname = document.getElementById("fullname");
const variant = document.getElementById("variant");
const group = document.getElementById("group");
const faculty = document.getElementById("faculty");
const birthdate = document.getElementById("birthdate");

function validateFullname(value) {
    return /^[А-ЯІЇЄҐ][а-яіїєґ'’-]+\s+[А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/u.test(value);
}

function validateVariant(value) {
    return /^\d{2}$/.test(value);
}

function validateGroup(value) {
    return /^[А-ЯІЇЄҐ]{2}-\d{2}$/u.test(value);
}

function validateFaculty(value) {
    return /^[А-ЯІЇЄҐ]{4}$/u.test(value);
}

function validateBirthdate(value) {
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;

    if (!regex.test(value)) {
        return false;
    }

    const parts = value.match(regex);

    const day = Number(parts[1]);
    const month = Number(parts[2]);
    const year = Number(parts[3]);

    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

function showError(input, message) {
    input.classList.add("invalid");
    input.classList.remove("valid");

    input.nextElementSibling.textContent = message;
}

function showSuccess(input) {
    input.classList.remove("invalid");
    input.classList.add("valid");

    input.nextElementSibling.textContent = "";
}


form.addEventListener("submit", function(event) {

    event.preventDefault();

    let isValid = true;

    const fields = [
        {
            input: fullname,
            check: validateFullname,
            message: "Введіть прізвище та ініціали, наприклад: Корнійчук А.О."
        },
        {
            input: variant,
            check: validateVariant,
            message: "Варіант повинен містити дві цифри."
        },
        {
            input: group,
            check: validateGroup,
            message: "Формат групи: ІА-44."
        },
        {
            input: faculty,
            check: validateFaculty,
            message: "Назва факультету повинна містити чотири літери."
        },
        {
            input: birthdate,
            check: validateBirthdate,
            message: "Введіть правильну дату у форматі ДД.ММ.РРРР."
        }
    ];


    fields.forEach(function(field) {

        const value = field.input.value.trim();

        if (value === "") {
            showError(field.input, "Поле обов'язкове для заповнення.");
            isValid = false;
        }
        else if (!field.check(value)) {
            showError(field.input, field.message);
            isValid = false;
        }
        else {
            showSuccess(field.input);
        }
    });


    if (isValid) {
        showResult();
    }
});


function showResult() {

    const resultWindow = window.open("", "_blank", "width=500,height=500");

    if (!resultWindow) {
        alert("Дозвольте відкриття спливаючих вікон у браузері.");
        return;
    }

    const data = [
        ["ПІБ", fullname.value.trim()],
        ["Варіант", variant.value.trim()],
        ["Група", group.value.trim()],
        ["Факультет", faculty.value.trim()],
        ["Дата народження", birthdate.value.trim()]
    ];


    function escapeHTML(value) {
        return value.replace(/[&<>"']/g, function(char) {
            const symbols = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return symbols[char];
        });
    }

    const rows = data.map(function(item) {
        return `<p><strong>${item[0]}:</strong> ${escapeHTML(item[1])}</p>`;
    }).join("");

    resultWindow.document.write(`
        <!DOCTYPE html>
        <html lang="uk">
        <head>
            <meta charset="UTF-8">
            <title>Результат перевірки</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 25px;
                    background: #f4f4f4;
                }
                .result {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                }
                h2 {
                    color: green;
                }
            </style>
        </head>
        <body>
            <div class="result">
                <h2>Дані успішно перевірені!</h2>
                ${rows}
            </div>
        </body>
        </html>
    `);

    resultWindow.document.close();
}


// Завдання 1
const table = document.getElementById("gameTable");
const colorPicker = document.getElementById("colorPicker");

for (let row = 0; row < 6; row++) {

    const tr = document.createElement("tr");

    for (let col = 0; col < 6; col++) {

        const td = document.createElement("td");

        const number = row * 6 + col + 1;

        td.textContent = number;

        if (number === 9) {

            td.addEventListener("mouseover", function() {

                const randomColor = "#" +
                    Math.floor(Math.random() * 16777215)
                    .toString(16)
                    .padStart(6, "0");

                td.style.backgroundColor = randomColor;
            });

            td.addEventListener("click", function() {

                td.style.backgroundColor = colorPicker.value;
            });


            td.addEventListener("dblclick", function() {

                const cells = table.rows;

                const selectedColumn = col;

                for (let i = row; i < 6; i += 2) {

                    cells[i].cells[selectedColumn]
                        .style.backgroundColor = colorPicker.value;
                }
            });
        }

        tr.appendChild(td);
    }

    table.appendChild(tr);
}
