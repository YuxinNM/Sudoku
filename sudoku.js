var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [
    "007491605",
    "200060309",
    "000007010",
    "058600004",
    "003000090",
    "006200187",
    "904070002",
    "670830000",
    "810045000"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function() {
    setGame();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id = "i" class="number">i</div>
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            //<div id = "r-c"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}