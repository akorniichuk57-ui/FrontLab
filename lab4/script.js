var firstElement = document.getElementById("firstElement");

var secondElement = document.querySelector(".secondElement");

firstElement.addEventListener("click", function() {

    firstElement.classList.toggle("changed");

});

secondElement.addEventListener("click", function() {

    secondElement.classList.toggle("changed");

});


var imageContainer = document.getElementById("imageContainer");

var addButton = document.getElementById("addImage");
var increaseButton = document.getElementById("increaseImage");
var decreaseButton = document.getElementById("decreaseImage");
var deleteButton = document.getElementById("deleteImage");


var imageWidth = 600;


function updateButtons() {

    var image = document.getElementById("cityImage");

    addButton.disabled = image !== null;
    increaseButton.disabled = image === null;
    decreaseButton.disabled = image === null;
    deleteButton.disabled = image === null;

}


addButton.addEventListener("click", function() {

    if (document.getElementById("cityImage") === null) {

        var link = document.createElement("a");

        link.href = "https://kyivcity.gov.ua/";
        link.target = "_blank";

        var image = document.createElement("img");

        image.id = "cityImage";
        image.src = "Kyiv.jpg";
        image.alt = "Київ";

        imageWidth = 600;
        image.style.width = imageWidth + "px";

        link.appendChild(image);

        imageContainer.appendChild(link);

    }

    updateButtons();

});


increaseButton.addEventListener("click", function() {

    var image = document.getElementById("cityImage");

    if (image !== null) {

        imageWidth = imageWidth + 100;

        image.style.width = imageWidth + "px";

    }

});


decreaseButton.addEventListener("click", function() {

    var image = document.getElementById("cityImage");

    if (image !== null && imageWidth > 100) {

        imageWidth = imageWidth - 100;

        image.style.width = imageWidth + "px";

    }

});


deleteButton.addEventListener("click", function() {

    var image = document.getElementById("cityImage");

    if (image !== null) {

        image.parentElement.remove();

    }

    updateButtons();

});


updateButtons();