const { RichEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    if (client.db.get(`${message.author.id}.ingame`) == 0) {
        message.channel.send("You are not in a game.").catch(console.error);
        return;
    }

    let prefix = client.config.prefix;
    if (args.length != 1) { 
        message.channel.send("Usage: `" + prefix + "play [word]`").catch(console.error);
        return;
    }

    let id = client.db.get(`${message.author.id}.ingame`);
    let game = client.db.get(id);
    console.log(game.players);
    if (game.players.length > 1) {

        if (game.players.length > game.turn && game.players[game.turn] == message.author.username) {

            if (game.word.slice(-1)[0] == args[0][0]) {

                if (!game.words.includes(args[0])) {

                    if (game.players.length <= game.turn + 1) {
                        client.db.set(`${id}.turn`, 0);
                    } else {
                        client.db.add(`${id}.turn`, 1);
                    }
                    client.db.set(`${id}.word`, args[0]);
                    game.words.push(args[0]);
                    client.db.set(`${id}.words`, game.words);
                    let embed = new RichEmbed()
                        .setTitle(`${message.author.username} has played:`)
                        .setColor([0,200,0])
                        .setDescription(`Game ID: ${id}\nWord: ${client.db.get(`${id}.word`)}`);
                    message.channel.send(embed).catch(console.error);
                
                } else {
                    message.channel.send("The word was already played. Use `"+ prefix +"usedwords` to get list of used words.").catch(console.error);
                }

            } else {
                message.channel.send(`remember the current word is: ${game.word}`).catch(console.error);
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
    name: 'play'
};