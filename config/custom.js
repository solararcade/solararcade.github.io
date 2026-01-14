(() => {
    const layers = [
        { id: "stars1", count: 100, size: 1, speed: 60, opacity: 0.8 },
        { id: "stars2", count: 70, size: 2, speed: 100, opacity: 0.7 },
        { id: "stars3", count: 50, size: 3, speed: 140, opacity: 0.5 }
    ];

    // Add CSS
    const style = document.createElement("style");
    style.innerHTML = `
        [id^="stars"] {
            position:fixed;
            top:0; left:0;
            width:100%;
            height:100%;
            pointer-events:none;
            z-index:-9999; /* behind everything */
        }
        .star { position:absolute; background:#eee; border-radius:50%; }
        @keyframes scrollUp { from { transform:translateY(0); } to { transform:translateY(-200%); } }
    `;
    document.head.appendChild(style);

    // Create layers & stars
    layers.forEach(layer => {
        const div = document.createElement("div");
        div.id = layer.id;
        document.body.appendChild(div);

        for (let i = 0; i < layer.count; i++) {
            const star = document.createElement("div");
            star.className = "star";
            star.style.width = star.style.height = layer.size + "px";
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 200 - 100 + "%"; // spread above viewport
            star.style.opacity = layer.opacity;
            div.appendChild(star);
        }

        div.style.animation = `scrollUp ${layer.speed}s linear infinite`;
    });
})();
