'use strict'

const axios = require('axios')
const sharp = require('sharp')

async function download (url) {
  const { data } = await axios.get(url, {
    responseType: 'arraybuffer'
  })

  return data
}

async function makeWebp (buffer) {
  return sharp(buffer)
    .webp({ lossless: true })
    .toBuffer()
}

async function upload (buffer, options, telegram) {
  const { sticker: { file_id: id } } = await telegram.sendSticker(options.chatId, { source: buffer })
  return id
}

async function uploadFromUrl (url, config, bot) {
  return download(url)
  .then(makeWebp)
  .then(webp => upload(webp, config.telegram, bot.telegram))
}

function using (config, bot) {
  return {
    uploadFromUrl: (url) => uploadFromUrl(url, config, bot)
  }
}

module.exports = { using }
