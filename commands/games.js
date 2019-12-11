const { RichEmbed } = require('discord.js');


exports.run = (client, message) => {
    let embedRaw = "";
    let allUsers = client.users.array();
    for (let i = 0; i < allUsers.length; i++) {
        if (client.db.get(allUsers[i].id).words.length > 0) {
            embedRaw += "Username: " + allUsers[i].username + "\nGame ID:" + allUsers[i].id + "\n\n"
        }
    }

    let embed = new RichEmbed()
        .setTitle(`Game List:`)
        .setColor([0,200,0])
        .setDescription(embedRaw);
    message.channel.send(embed).catch(console.error);
};

exports.help = {
    name: 'games'
};