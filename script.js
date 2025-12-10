const dateBtn = document.getElementById("dateBtn");
const gameBtn = document.getElementById("gameBtn");
const settingsBtn = document.getElementById("settingsBtn");

const dateDropdown = document.getElementById("dateDropdown");
const gameDropdown = document.getElementById("gameDropdown");
const settingsPanel = document.getElementById("settingsPanel");

const spoilerToggle = document.getElementById("spoilerToggle");
const matchContainer = document.querySelector(".match-container");
const matches = {
    today: {
        valorant: [
            { team: "DSY vs EP", desc: "Challengers Ascension EMEA · Groups · International", score: "3 / 0" },
            { team: "TSM vs STE", desc: "Challengers Ascension Americas · Swiss · International", score: "2 / 1" },
            { team: "6K vs WU", desc: "Challengers Ascension Americas · Swiss · International", score: "0 / 2" }
        ],
        mlbb: [
            { team: "BREN vs ONI", desc: "MPL Philippines · Local", score: "2 / 1" },
            { team: "ONIC vs Bigetron Alpha", desc: "MPL Indonesia · Sea", score: "3 / 2" },
            { team: "EVOS vs Dewa United", desc: "MPL Indonesia · Sea", score: "3 / 0" }
        ],
        dota: [
            { team: "LGD vs Nouns", desc: "DreamLeague · International", score: "1 / 2" },
            { team: "Kukuys vs Execration", desc: "Predator League Philippines · Local", score: "3 / 2" },
            { team: "Team Nemesis vs Execration", desc: "Predator League Philippines · Local", score: "0 / 2" }
        ]
    },
    yesterday: {
        valorant: [
            { team: "RRQ vs PRX", desc: "VCT Pacific · Sea", score: "2 / 0" },
            { team: "Heretics vs FNATIC", desc: "2025 Esports World Cup · International", score: "1 / 2" },
            { team: "Liquid vs GIANTX", desc: "2025 Esports World Cup · International", score: "2 / 0" }
        ],
        mlbb: [
            { team: "Team Liquid PH vs Twisted Minds", desc: "MPL Philippines · Local", score: "3 / 1" },
            { team: "AP Bren vs Smart Omega", desc: "MPL Philippines · Local", score: "2 / 3" },
            { team: "Aurora vs ONIC PH", desc: "MPL Philippines · Local", score: "3 / 2" }
        ],
        dota: [
            { team: "Team Yandex vs Team Falcons", desc: "ESL One Southeast Asia 2025 · International", score: "2 / 0" },
            { team: "InterActive Philippines vs The Mongolz", desc: "ESL One Southeast Asia 2025 · International", score: "2 / 1" },
            { team: "Kukuys vs InterActive Philippines ", desc: "Predator League 2025 Philippines · Local", score: "2 / 1" }
        ]
    },
    past: {
        valorant: [
            { team: "FNC vs NAVI", desc: "Champions 2023 · International", score: "3 / 0" },
            { team: "NRG vs G2 Esports", desc: "VCT Masters: Toronto 2025 · International", score: "2 / 1" },
            { team: "RRQ PH vs Team Secret", desc: "Champions 2023 · Local", score: "0 / 2" }
        ],
        mlbb: [
            { team: "Team Liquid PH vs ONIC ID", desc: "EWC x MSC 2025 · International", score: "4 / 1" },
            { team: "ONIC ID vs ONIC PH", desc: "EWC x MSC 2025 · International", score: "3 / 2" },
            { team: "Team Liquid vs SRG", desc: "EWC x MSC 2025 · International", score: "3 / 2" }
        ],
        dota: [
            { team: "Team Liquid vs Newbee", desc: "DPC SEA Regional League · International", score: "3 / 0" },
            { team: "TNC Predator vs OG", desc: "DPC SEA Regional League · International", score: "2 / 0" },
            { team: "Gaimin Gladiators vs Team Spirit", desc: "DPC EU/NA Qualifier · International", score: "0 / 3" }
        ]
    }
};

let currentDate = "today";
let currentGame = "valorant";


function normalizeDateKey(text) {
    const v = text.trim().toLowerCase();
    if (v.includes("today")) return "today";
    if (v.includes("yesterday")) return "yesterday";
    return "past";
}
function normalizeGameKey(text) {
    const v = text.trim().toLowerCase();
    if (v.includes("valorant")) return "valorant";
    if (v.includes("mlbb") || v.includes("mobile")) return "mlbb";
    if (v.includes("dota")) return "dota";
    return "valorant";
}

function renderMatches() {
    matchContainer.innerHTML = "";

    const data = (matches[currentDate] && matches[currentDate][currentGame]) ? matches[currentDate][currentGame] : [];

    data.forEach((m, idx) => {
        const card = document.createElement("div");
        card.className = "match-card";

        const scoreWrapper = document.createElement("div");
        scoreWrapper.className = "score-wrapper";

        const scoreEl = document.createElement("div");
        scoreEl.className = "score";
        scoreEl.textContent = m.score ? m.score : "";

        const coverEl = document.createElement("div");
        coverEl.className = "cover";

        const img = document.createElement("img");
        img.src = "spoiler.png";
        img.alt = "spoiler";
        coverEl.appendChild(img);

        
        if (!spoilerToggle.checked) {
            coverEl.classList.add("hidden");
        } else {
            
        }

        scoreWrapper.appendChild(scoreEl);
        scoreWrapper.appendChild(coverEl);

        const info = document.createElement("div");
        info.className = "match-info";
        const title = document.createElement("h3");
        title.textContent = m.team;
        const desc = document.createElement("p");
        desc.textContent = m.desc;
        info.appendChild(title);
        info.appendChild(desc);

        card.appendChild(scoreWrapper);
        card.appendChild(info);
        matchContainer.appendChild(card);

        coverEl.addEventListener("click", (e) => {
            coverEl.classList.add("hidden");
            coverEl.classList.add("fade-out");
        });
    });
}

dateBtn.addEventListener("click", (e) => {
    dateDropdown.classList.toggle("hidden");
    gameDropdown.classList.add("hidden");
    settingsPanel.classList.add("hidden");
});

gameBtn.addEventListener("click", (e) => {
    gameDropdown.classList.toggle("hidden");
    dateDropdown.classList.add("hidden");
    settingsPanel.classList.add("hidden");
});

settingsBtn.addEventListener("click", (e) => {
    settingsPanel.classList.toggle("hidden");
    dateDropdown.classList.add("hidden");
    gameDropdown.classList.add("hidden");
});

function wireDropdowns() {
    dateDropdown.querySelectorAll("p").forEach(p => {
        p.addEventListener("click", () => {
            const key = normalizeDateKey(p.textContent);
            currentDate = key;
            dateBtn.textContent = p.textContent.trim() + " ";
            const caret = document.createElement("i");
            caret.className = "fa fa-caret-down";
            dateBtn.appendChild(caret);

            dateDropdown.classList.add("hidden");
            renderMatches();
        });
    });

    gameDropdown.querySelectorAll("p").forEach(p => {
        p.addEventListener("click", () => {
            const key = normalizeGameKey(p.textContent);
            currentGame = key;
            gameBtn.textContent = p.textContent.trim() + " ";
            const caret = document.createElement("i");
            caret.className = "fa fa-caret-down";
            gameBtn.appendChild(caret);

            gameDropdown.classList.add("hidden");
            renderMatches();
        });
    });
}

spoilerToggle.addEventListener("change", () => {
    const covers = document.querySelectorAll(".match-card .cover");
    if (!spoilerToggle.checked) {
        covers.forEach(c => {
            c.classList.add("hidden");
        });
    } else {
        covers.forEach(c => {
            c.classList.remove("hidden");
            c.classList.remove("fade-out");
        });
    }
});

document.addEventListener("click", (e) => {
    const target = e.target;
    if (dateBtn.contains(target) || dateDropdown.contains(target) ||
        gameBtn.contains(target) || gameDropdown.contains(target) ||
        settingsBtn.contains(target) || settingsPanel.contains(target)) {
        return;
    }
    dateDropdown.classList.add("hidden");
    gameDropdown.classList.add("hidden");
    settingsPanel.classList.add("hidden");
});

wireDropdowns();
renderMatches();
