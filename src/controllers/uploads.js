const supabase = require('../services/supabase');
require('dotenv').config();
const enviarImages = async (req, res) => {
  const { nome, imagem } = req.body

  const buffer = Buffer.from(imagem, 'base64')
  try {
    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(nome, buffer)

    if (error) {
      return res.status(400).json(error.message)
    }

    const { publicURL, error: errorPublicUrl } = supabase
      .storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(nome)

    if (errorPublicUrl) {
      return res.status(400).json(errorPublicUrl.message)
    }

    return res.status(200).json({ publicURL })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
}

const deletarImages = async (req, res) => {
  const { nome } = req.body
  const { data, error } = await supabase
    .storage
    .from(process.env.SUPABASE_BUCKET)
    .remove([nome])
  if (error) {
    return res.status(400).json({ error: error })
  }

  return res.status(200).json({ data })
}

module.exports = {
  enviarImages,
  deletarImages
}