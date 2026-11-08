const loadButton = document.getElementById("loadButton");
const userCard = document.getElementById("userCard");
const status = document.getElementById("status");

loadButton.addEventListener("click", function () {

    status.textContent = "Завантаження даних...";
    loadButton.disabled = true;
    userCard.classList.add("hidden");

    fetch("https://randomuser.me/api")
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Помилка отримання даних");
            }

            return response.json();
        })
        .then(function (data) {

            const user = data.results[0];

            document.getElementById("picture").src = user.picture.large;

            document.getElementById("city").textContent =
                user.location.city;

            document.getElementById("postcode").textContent =
                user.location.postcode;

            document.getElementById("cell").textContent =
                user.cell;

            document.getElementById("name").textContent =
                user.name.first + " " + user.name.last;

            userCard.classList.remove("hidden");

            status.textContent = "Дані успішно отримано!";
        })
        .catch(function (error) {

            status.textContent = "Помилка: " + error.message;

        })
        .finally(function () {

            loadButton.disabled = false;

        });
});
