const fileInput = document.getElementById("csv"),

    readFile = function () {
        const reader = new FileReader();
        reader.onload = function () {
            document.getElementById('out').innerHTML = reader.result.toString().split(",").join(" ");
        };
        reader.readAsText(fileInput.files[0]);
    };

fileInput.addEventListener('change', readFile);