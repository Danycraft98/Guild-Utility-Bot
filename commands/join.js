const { RichEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    if (client.db.get(`${message.author.id}.ingame`) != 0) {
        message.channel.send("You are in a game.").catch(console.error);
        return;
    }

    if (args.length != 1) { 
        message.channel.send("Usage: `" + client.config.prefix + "join [id]`").catch(console.error);
        return;
    }

    
    if (client.db.get(args[0])) {
        let found = client.db.get(args[0]);
        if (found.words.length > 1) {
            message.channel.send("Game already started").catch(console.error);
            return;
        } else {
        	client.db.add(`${message.author.id}.played`, 1);
            client.db.set(`${message.author.id}.ingame`, args[0]);
            found.players.push(message.author.username);
            console.log(found.players);
            client.db.set(`${message.author.id}.players`, found.players);
            let embed = new RichEmbed()
                .setTitle(`Game joined:`)
                .setColor([0,200,0])
                .setDescription(`Game ID: ${args[0]}\nPlayers:\n${found.players.join(", ")}`);
            message.channel.send(embed).catch(console.error);
            return;
        }   
    }
    message.channel.send("Game not found!").catch(console.error);
};

exports.help = {
    name: 'join'
};