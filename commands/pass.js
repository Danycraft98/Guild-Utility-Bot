const { RichEmbed } = require('discord.js');

exports.run = (client, message) => {
    if (client.db.get(`${message.author.id}.ingame`) == 0) {
        message.channel.send("You are not in a game.").catch(console.error);
        return;
    }

    let prefix = client.config.prefix;
    let id = client.db.get(`${message.author.id}.ingame`);
    let game = client.db.get(id);
    console.log(game.players);
    if (game.players.length > 1) {
        if (game.players.length > game.turn && game.players[game.turn] == message.author.username) {
            if (game.players.length <= game.turn + 1) {
                client.db.set(`${id}.turn`, 0);
            } else {
                client.db.add(`${id}.turn`, 1);
            }
        } else {
            let embed = new RichEmbed()
                .setTitle(`${message.author.username} try to play when it's:`)
                .setColor([0,200,0])
                .setDescription(`Game ID: ${id}\nTurn: ${client.db.get(`${id}.turn`)}`);
            message.channel.send(embed).catch(console.error);
        }

    } else {
        message.channel.send("Game does not have enough players").catch(console.error);
    }
};

exports.help = {
    name: 'pass'
};