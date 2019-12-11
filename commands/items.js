const { RichEmbed } = require('discord.js');


exports.run = (client, message) => {
    let prefix = client.config.prefix;

    let player = client.db.get(message.author.id);
    let embed = new RichEmbed()
        .setTitle(`Your Items:`)
        .setColor([0,200,0])
        .setDescription(`[${player.items.join(", ")}]`);
    message.channel.send(embed).catch(console.error);
};

exports.help = {
    name: 'stats'
};