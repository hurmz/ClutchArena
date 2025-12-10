const gameData = {
    valorant: [
        { 
            img: "newsval1.png", 
            title: "First Look at VALORANT Champions Tour 2026", 
            link: "https://www.youtube.com/watch?v=zNgr8Vbxlss"
        },
        { 
            img: "newsval2.png", 
            title: "Harbor Rework is Now Here", 
            link: "https://playvalorant.com/en-gb/news/game-updates/valorant-patch-notes-11-10/"
        },
        { 
            img: "newsval3.png", 
            title: "Tournament announced for VCT Asia", 
            link: "https://valorantesports.com/en-GB/news/valorant-champions-tour-season-awards"
        }
    ],
    mlbb: [
        { 
            img: "newsml1.png", 
            title: "Revamped Freya", 
            link: "https://www.mobilelegends.com/news/articleldetail?newsid=3209972"
        },
        { 
            img: "newsml2.png", 
            title: "AP Bren chooses Brody for M5 Skin", 
            link: "https://www.mobilelegends.com/news/articleldetail?newsid=2697597"
        },
        { 
            img: "newsml3.png", 
            title: "Revamped Alice Guide", 
            link: "https://www.mobilelegends.com/news/articleldetail?newsid=3160352"
        }
    ],
    lol: [
        { 
            img: "newsdota1.png", 
            title: "Dota x Monster Hunter", 
            link: "lolnews1.html"
        },
        { 
            img: "newsdota2.png", 
            title: "Collector's Cache Voting Open Now", 
            link: "https://www.dota2.com/newsentry/530985917539680600"
        },
        { 
            img: "newsdota3.png", 
            title: "The International 2025 Grand Champions", 
            link: "https://www.dota2.com/newsentry/509591543575741517"
        }
    ]
};


function loadCards(game) {
    const container = document.getElementById("newsCards");
    container.innerHTML = "";

    gameData[game].forEach(item => {
        const card = document.createElement("div");
        card.className = "news-card";

        const label = item.label ? `<span class="card-label">${item.label}</span>` : '';

        card.innerHTML = `
            ${label}
            <div class="news-image" style="background-image:url('${item.img}')"></div>
            <p class="news-title">${item.title}</p>
        `;

        card.addEventListener("click", () => {
            window.open(item.link, "_blank", "noopener,noreferrer");
        });

        container.appendChild(card);
    });
}


document.querySelectorAll(".game-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".game-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        loadCards(btn.dataset.game);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector(".game-btn").classList.add("active");
    loadCards("valorant");
});
