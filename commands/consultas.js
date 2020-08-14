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

    const newRole = await createRole(server, c, roleColor)

    await createTextChannel(server, category, c, newRole)
    await createVoiceChannel(server, category, c, newRole)
  }
}

const createTextChannel = async (server, category, n, role) => {
  await server.channels.create(`consulta-${n}-chat`, {
    type: 'text',
    permissionOverwrites: [
      {
        id: role.id,
        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        deny: ['READ_MESSAGE_HISTORY']
      },
      {
        id: server.roles.everyone.id,
        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
      }
    ],
    parent: category
  })
}

const createVoiceChannel = async (server, category, n, role) => {
  await server.channels.create(`consulta-${n}-voz`, {
    type: 'voice',
    permissionOverwrites: [
      {
        id: role.id,
        allow: ['VIEW_CHANNEL', 'CONNECT']
      },
      {
        id: server.roles.everyone.id,
        deny: ['VIEW_CHANNEL', 'CONNECT']
      }
    ],
    parent: category
  })
}

const createRole = async (server, n, roleColor) => {
  const newRole = await server.roles.create({
    data: {
      name: `consulta-${n}`,
      color: roleColor
    }
  })
  return newRole
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
