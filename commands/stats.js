const { Client, RichEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    let prefix = client.config.prefix;

    if (args.length == 0) { 
        let player = client.db.get(message.author.id);
        let embed = new RichEmbed()
            .setTitle(`Your Stats:`)
            .setColor([0,200,0])
            .setDescription(`Games Played: ${player.played}\nWin/Loss: ${player.win}/${player.loss}\nGold: ${player.gold}\nItems: Use ` + "`" + prefix + "items`");
        message.channel.send(embed).catch(console.error);
    } else if (args.length == 1) {
        let id = args[0].slice(2,-1);
        let player = client.db.get(id);
        let embed = new RichEmbed()
            .setTitle(`${client.users.get(id).username}'s Stats:`)
            .setColor([0,200,0])
            .setDescription(`Games Played: ${player.played}\nWin/Loss: ${player.win}/${player.loss}\nGold:  ${player.gold}\nItems: Use ` + "`" + prefix + "items`");
        message.channel.send(embed).catch(console.error);
    } else {
        message.channel.send("Usage: `" + prefix + "stats <@User>`").catch(console.error);
    }
};

exports.help = {
    name: 'stats'
};