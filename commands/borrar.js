module.exports = {
  name: 'borrar',
  async execute (message, args) {
    const channels = message.guild.channels.cache.filter(channel =>
      channel.name.startsWith('consulta')
    )
    const channelPromises = channels.map(channel => channel.delete())
    await Promise.all(channelPromises)

    const roles = message.guild.roles.cache.filter(channel =>
      channel.name.startsWith('consulta')
    )
    const rolesPromises = roles.map(role => role.delete())
    await Promise.all(rolesPromises)
  }
}
