const roleColors = [
  'BLUE',
  'YELLOW',
  'GREEN',
  'PURPLE'
]

const createGroups = async (server, groupTotal, groupSize) => {
  for (let i = 0; i < groupTotal; i++) {
    const category = await createCategory(server, i, groupSize)
    const roleColor = roleColors[i % roleColors.length]
    await createChannels(server, category, i, groupSize, roleColor)
  }
}

const createCategory = async (server, n, groupSize) => {
  const category = await server.channels.create(`consulta-${n * groupSize + 1}-${n * groupSize + groupSize}`, {
    type: 'category'
  })
  return category
}

const createChannels = async (server, category, n, groupSize, roleColor) => {
  for (let i = 0; i < groupSize; i++) {
    const c = i + 1 + groupSize * n

    await createTextChannel(server, category, c)
    await createVoiceChannel(server, category, c)

    await createRole(server, c, roleColor)
  }
}

const createTextChannel = async (server, category, n) => {
  await server.channels.create(`consulta-${n}-chat`, {
    type: 'text',
    parent: category
  })
}

const createVoiceChannel = async (server, category, n) => {
  await server.channels.create(`consulta-${n}-voz`, {
    type: 'voice',
    parent: category
  })
}

const createRole = async (server, n, roleColor) => {
  await server.roles.create({
    data: {
      name: `consulta-${n}`,
      color: roleColor
    }
  })
}

module.exports = {
  name: 'consultas',
  execute (message, args) {
    const server = message.guild
    const groupTotal = Number(args[0])
    const groupSize = Number(args[1])
    createGroups(server, groupTotal, groupSize)
  }
}
