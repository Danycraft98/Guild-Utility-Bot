const { RichEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    if (client.db.get(`${message.author.id}.ingame`) != 0) {
        message.channel.send("You are in a game.").catch(console.error);
        return;
    }

    if (args.length != 1) { 
        message.channel.send("Usage: `" + client.config.prefix + "start [word]`").catch(console.error);
        return;
    }

    client.db.add(`${message.author.id}.played`, 1);
    client.db.set(`${message.author.id}.word`, args[0]);
    client.db.set(`${message.author.id}.players`, [message.author.username]);
    client.db.set(`${message.author.id}.words`, [args[0]]);
    client.db.set(`${message.author.id}.turn`, 1);
    client.db.set(`${message.author.id}.ingame`, message.author.id);

    let embed = new RichEmbed()
        .setTitle(`Game created:`)
        .setColor([0,200,0])
        .setDescription(`Game ID: ${message.author.id}\nPlayers:\n${client.db.get(message.author.id).players.join(", ")}`);
    message.channel.send(embed).catch(console.error);
};

exports.help = {
    name: 'start'
};