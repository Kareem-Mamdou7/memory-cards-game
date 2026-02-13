const cardContents = document.querySelectorAll(".card-content");
const scoreDisplay = document.getElementById("score-display");
const reshuffleButton = document.getElementById("reshuffle");
const cards = document.querySelectorAll(".card");
let score = 0;
let firstSelection;
let secondSelection;
let solvedCards = [];
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

shuffle();

reshuffleButton.addEventListener("click", reshuffle);

function shuffle() {
	let pairsCopy = structuredClone(pairs);

	cardContents.forEach((card) => {
		randomIndex = Math.floor(Math.random() * pairsCopy.length);
		randomPairSelection = pairsCopy[randomIndex];
		card.innerText = randomPairSelection;

		if (randomIndex > -1) pairsCopy.splice(randomIndex, 1);
		card.classList.add("hidden");
	});
}

function reshuffle() {
	score = 0;
	scoreDisplay.innerText = ``;
	shuffle();
	resetSelections();
	unflipAllCards();

	solvedCards = [];
}

cards.forEach((card) => {
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

function unflipAllCards() {
	cardContents.forEach((card) => {
		card.classList.remove("flipped");
	});
}

function renderScore() {
	scoreDisplay.innerText = `Score = ${score}`;
}
