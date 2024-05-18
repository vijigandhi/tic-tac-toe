document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const restartBtn = document.getElementById("restart-btn");
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    const closeModal = document.getElementById("close-modal");
    let audio = document.getElementById('myAudio');
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartBtn.addEventListener("click", restartGame);
    closeModal.addEventListener("click", () => modal.style.display = "none");

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = +clickedCell.dataset.index;

        if (board[clickedCellIndex] || !gameActive) return;

        board[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = `<span>${currentPlayer}</span>`;
        clickedCell.classList.add("clicked");

        audio.play();

        if (checkWinner()) {
            gameActive = false;
            showModal(`Player ${currentPlayer === "X" ? "1" : "2"} Wins!`);
        } else if (!board.includes("")) {
            gameActive = false;
            showModal("It's a Draw!");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function checkWinner() {
        for (let i = 0; i < winningConditions.length; i++) {
            const condition = winningConditions[i];
            const a = board[condition[0]];
            const b = board[condition[1]];
            const c = board[condition[2]];

            if (a && a === b && a === c) {
                return true;
            }
        }
        return false;
    }

    function addSprinkles() {
        let colors = ["#ffcc00", "#ff6699", "#66ccff", "#99ff99"];
        let shapes = ["circle", "square", "triangle"];

        let numSprinkles = 50;
        for (let i = 0; i < numSprinkles; i++) {
            let color = colors[Math.floor(Math.random() * colors.length)];
            let shape = shapes[Math.floor(Math.random() * shapes.length)];
            let sprinkles = document.createElement("div");
            sprinkles.classList.add("sprinkles");
            sprinkles.style.backgroundColor = color;
            sprinkles.style.borderRadius = shape === "circle" ? "50%" : shape === "triangle" ? "100% 100% 0 0" : "0";
            sprinkles.style.left = Math.random() * 100 + "%";
            sprinkles.style.top = Math.random() * 100 + "%";
            document.body.appendChild(sprinkles); 
            setTimeout(() => {
                sprinkles.remove();
            }, Math.random() * 1000);
        }
    }

    function showModal(message) {
        modalText.textContent = message;
        modal.style.display = "block";
        addSprinkles(); 
    }

    function restartGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        cells.forEach(cell => {
            cell.innerHTML = "<span></span>";
            cell.classList.remove("clicked");
        });
        modal.style.display = "none";
    }
});
