module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setActivity("Coding", {type: "PLAYING"});

    let allUsers = client.users.array();
    for (let i = 0; i < allUsers.length; i++) {
        if (!client.db.get(allUsers[i].id)) {
            client.db.set(allUsers[i].id, {gold: 0, items: [], played: 0, win: 0, loss: 0, word: "", players: [], words: [], turn: 0, ingame: 0});
        }
    }
};