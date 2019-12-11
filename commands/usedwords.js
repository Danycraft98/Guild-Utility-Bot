const { RichEmbed } = require('discord.js');


exports.run = (client, message) => {
    if (client.db.get(`${message.author.id}.ingame`) == 0) {
        message.channel.send("You are not in a game.").catch(console.error);
        return;
    }
    

    let embed = new RichEmbed()
        .setTitle(`Used Words:`)
        .setColor([0,200,0])
        .setDescription(`Game ID: ${message.author.id}\nUsed Words:\n${client.db.get(`${message.author.id}.words`).join(", ")}`);
    message.channel.send(embed).catch(console.error);
};

exports.help = {
    name: 'usedwords'
};