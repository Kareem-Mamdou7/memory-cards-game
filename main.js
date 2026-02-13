const cards = document.querySelectorAll(".card");
const scoreDisplay = document.getElementById("score-display");
const reshuffleButton = document.getElementById("reshuffle");
let score = 0;
let firstSelection;
let secondSelection;
const solvedCards = [];
const pairs = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",

	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
];

reshuffleButton.addEventListener("click", reshuffle);

cards.forEach((card) => {
	randomIndex = Math.floor(Math.random() * pairs.length);
	randomPairSelection = pairs[randomIndex];
	card.innerText = randomPairSelection;

	if (randomIndex > -1) pairs.splice(randomIndex, 1);

	card.addEventListener("click", () => {
		if (!solvedCards.includes(card) && !card.classList.contains("flipped")) {
			if (!firstSelection) {
				card.classList.add("flipped");
				firstSelection = card;
			} else {
				secondSelection = card;

				if (secondSelection.innerText === firstSelection.innerText) {
					solvedCards.push(firstSelection);
					solvedCards.push(secondSelection);

					score++;
					renderScore();
					secondSelection.classList.add("flipped");
					resetSelections();
				} else {
					firstSelection.classList.remove("flipped");
					secondSelection.classList.remove("flipped");
					resetSelections();
				}
			}
		}
	});
});

function resetSelections() {
	firstSelection = null;
	secondSelection = null;
}

function renderScore() {
	scoreDisplay.innerText = `Score = ${score}`;
}
