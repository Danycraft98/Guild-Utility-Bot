const { RichEmbed } = require('discord.js');

exports.run = (client, message) => {
    if (client.db.get(`${message.author.id}.ingame`) == 0) {
        message.channel.send("You are not in a game.").catch(console.error);
        return;
    }

    let id = client.db.get(`${message.author.id}.ingame`);

    if (id != message.author.id) {
        let game = client.db.get(id);
        game.players.splice(game.players.indexOf(message.author.username), 1);
        client.db.set(`${id}.players`, game.players);
        client.db.set(`${message.author.id}.ingame`, 0);
        client.db.add(`${message.author.id}.loss`, 1);
    } else {
        message.channel.send("You are the room leader.").catch(console.error);
        return;
    }

    let embed = new RichEmbed()
        .setTitle(`Game Left:`)
        .setColor([0,200,0])
        .setDescription(`Game ID: ${id}\nOne More Loss...`);
    message.channel.send(embed).catch(console.error);
};

exports.help = {
    name: 'leave'
};