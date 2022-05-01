const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Información sobre el bot",
  usage: "[comando]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
      .setAuthor(
        `Comandos de ${client.user.username}`,
        client.botconfig.IconURL
      )
      .setColor(client.botconfig.EmbedColor)
      .setFooter(
        `Para obtener información de cada tipo de comando ${
          GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
        }help [Comando] | Que tenga un lindo dia!`
      ).setDescription(`${Commands.join("\n")}
  
  Cleo Version: v${require("../package.json").version}
  [✨ Servidor de Soporte](${
    client.botconfig.SupportServer
  }) | [GitHub](https://github.com/PaloGang/CleoMusicBot) | [Dashboard](${client.botconfig.Website}) | By [Developer](https://github.com/PaloGang)`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(
          message.channel,
          `❌ | No se puede encontrar ese comando.`
        );

      let embed = new MessageEmbed()
        .setAuthor(`Comando: ${cmd.name}`, client.botconfig.IconURL)
        .setDescription(cmd.description)
        .setColor("GREEN")
        //.addField("Name", cmd.name, true)
        .addField("Alias", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Uso",
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        .addField(
          "Permisos",
          "Miembros: " +
            cmd.permissions.member.join(", ") +
            "\nBot: " +
            cmd.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Prefix - ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

  SlashCommand: {
    options: [
      {
        name: "command",
        description: "Obtener información sobre un comando específico",
        value: "command",
        type: 3,
        required: false,
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */

    run: async (client, interaction, args, { GuildDB }) => {
      let Commands = client.commands.map(
        (cmd) =>
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
      );

      let Embed = new MessageEmbed()
        .setAuthor(
          `Comandos de ${client.user.username}`,
          client.botconfig.IconURL
        )
        .setColor(client.botconfig.EmbedColor)
        .setFooter(
          `Para obtener información de cada tipo de comando ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }help [Comando] | Que tenga un lindo dia!`
        ).setDescription(`${Commands.join("\n")}
  
  Cleo Version: v${require("../package.json").version}
  [✨ Servidor de Soporte](${
    client.botconfig.SupportServer
  }) | [GitHub](https://github.com/PaloGang/CleoMusicBot) | [Dashboard](${client.botconfig.Website}) | By [Developer](https://github.com/PaloGang)`);
      if (!args) return interaction.send(Embed);
      else {
        let cmd =
          client.commands.get(args[0].value) ||
          client.commands.find(
            (x) => x.aliases && x.aliases.includes(args[0].value)
          );
        if (!cmd)
          return client.sendTime(
            interaction,
            `❌ | No se puede encontrar ese comando.`
          );

        let embed = new MessageEmbed()
          .setAuthor(`Comando: ${cmd.name}`, client.botconfig.IconURL)
          .setDescription(cmd.description)
          .setColor("GREEN")
          //.addField("Name", cmd.name, true)
          .addField("Alias", cmd.aliases.join(", "), true)
          .addField(
            "Uso",
            `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
              cmd.name
            }\`${cmd.usage ? " " + cmd.usage : ""}`,
            true
          )
          .addField(
            "Permisos",
            "Miembros: " +
              cmd.permissions.member.join(", ") +
              "\nBot: " +
              cmd.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Prefix - ${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }`
          );

        interaction.send(embed);
      }
    },
  },
};
