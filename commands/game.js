const { RichEmbed } = require('discord.js');


exports.run = (client, message) => {
    if (client.db.get(`${message.author.id}.ingame`) == 0) {
        message.channel.send("You are not in a game.").catch(console.error);
        return;
    }
    
    let prefix = client.config.prefix;
    let game = client.db.get(client.db.get(`${message.author.id}.ingame`));
    let embed = new RichEmbed()
        .setTitle(`Game created:`)
        .setColor([0,200,0])
        .setDescription(`Game ID: ${message.author.id}\nWord: ${game.word}\nTurn: ${game.players[game.turn]}\nPlayers:\n${game.players.join(", ")}\nUsed Words: Use ` + "`" + prefix + "usedwords`");
    message.channel.send(embed).catch(console.error);
};

exports.help = {
    name: 'game'
};
