const Gamedig = require("gamedig");
const fs = require("fs");

const server = {
  type: "samp",
  host: "104.234.180.117",
  port: 7006
};

(async () => {
  try {
    const state = await Gamedig.query(server);

    const data = {
      status: "ONLINE",
      players: state.players.length,
      maxPlayers: state.maxplayers,
      peak: state.players.length,
      gamemode: state.gamemode || "Roleplay",
      updated: new Date().toLocaleString("id-ID")
    };

    fs.writeFileSync(
      "data/server.json",
      JSON.stringify(data, null, 2)
    );

    console.log("Server status updated");
  } catch (err) {
    fs.writeFileSync(
      "data/server.json",
      JSON.stringify({
        status: "OFFLINE",
        players: 0,
        maxPlayers: 0,
        peak: 0,
        gamemode: "Roleplay",
        updated: new Date().toLocaleString("id-ID")
      }, null, 2)
    );

    console.log("Server offline or query failed");
  }
})();
