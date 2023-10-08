const doParticles = true;


function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

if (doParticles) {
	$.firefly({minPixel: 3,maxPixel: 6,total: 80});
}

function updateServerPlayers() {
    fetch("https://discord.com/api/v9/invites/trilobitetavern?with_counts=true&with_expiration=true")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch data from Discord API");
            }
        })
        .then(data => {
            if (data.hasOwnProperty("approximate_member_count")) {
                const memberCount = data.approximate_member_count;
                const serverPlayersElement = document.getElementById("server-players");
                if (serverPlayersElement) {
                    serverPlayersElement.textContent = memberCount;
                }
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

updateServerPlayers();
