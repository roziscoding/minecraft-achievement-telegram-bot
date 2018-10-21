'use strict'

const icons = require('./icons')
const config = require('./config')
const { format } = require('util')
const sticker = require('./sticker')
const ObjectId = require('bson-objectid')
const botify = require('@rjmunhoz/botify')

const getUrl = (icon, header, text) => {
  return format(
    'https://www.minecraftskinstealer.com/achievement/a.php?i=%s&h=%s&t=%s',
    icons[icon],
    encodeURIComponent(header),
    encodeURIComponent(text.replace(/#/ig, ''))
  )
}

const exampleText = [
  'cookie',
  'Congrats',
  'You\'re a good boy! Here\'s a cookie!'
].join('\n')

const botFactory = botify((bot, config) => {
  bot.command(['start', 'help'], ({ reply }) => {
    const lines = [
      'Hi there!',
      'Use me inline to create minecraft achievement images!',
      'Follow this format:',
      '```',
      `@${config.telegram.username} icon`,
      'header',
      'text#',
      '```',
      'Your input **must** end with `#`, otherwise it won\'t be processed',
      'If you want to see a list of the icons, send /icons',
      'That\'s it! Click the button below to go inline!'
    ]

    const text = lines.join('\n')

    reply(text, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Go inline',
              switch_inline_query: exampleText
            }
          ]
        ]
      }
    })
  })

  bot.command('icons', ({ reply }) => {
    const lines = [
      'Here are the currently available icons:',
      ...icons.names.map(name => `- ${name}`)
    ]

    reply(lines.join('\n'), {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Got it! Go inline',
              switch_inline_query: exampleText
            }
          ]
        ]
      }
    })
  })

  bot.on('inline_query', async ({ inlineQuery: query, answerInlineQuery }) => {
    const options = query.query.split('\n')

    const replyOptions = {
      switch_pm_text: 'Any doubts? Talk to me in private!',
      switch_pm_parameter: 'help'
    }

    if (options.length !== 3 || !options[2].includes('#')) {
      try {
        return answerInlineQuery([], replyOptions)
      } catch (err) {
        return
      }
    }

    const url = getUrl(...options)

    const stickerId = await sticker.using(config, bot)
      .uploadFromUrl(url)

    answerInlineQuery([{
      type: 'sticker',
      id: new ObjectId().toString(),
      sticker_file_id: stickerId
    }], replyOptions)
  })

  bot.on('chosen_inline_result', console.log)
})

const bot = botFactory(config, process.env.NODE_ENV)

bot.startPolling()
  .telegram.getMe()
  .then((me) => {
    console.log(`Listening on @${me.username}`)
  })
