const { RichEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    if (client.db.get(`${message.author.id}.ingame`) == 0) {
        message.channel.send("You are not in a game.").catch(console.error);
        return;
    }

    if (args.length != 1) { 
        message.channel.send("Usage: `" + client.config.prefix + "invite [@User]`").catch(console.error);
        return;
    }

    let id = args[0].slice(2,-1);    
    if (client.db.get(id)) {
        let found = client.db.get(id);
        
        if (found.ingame != 0) {
            message.channel.send("Already in game.").catch(console.error);
            return;
        } else {
            client.db.set(`${message.author.id}.players`, found.players);
            let embed = new RichEmbed()
                .setTitle(`Game invite:`)
                .setColor([0,200,0])
                .setDescription(`By: ${message.author.username}\nGame ID: ${message.author.id}`);
            message.author.send(embed).catch(console.error); //Fix
            message.channel.send(embed).catch(console.error);
            return;
        }   
    }
};

exports.help = {
    name: 'join'
};