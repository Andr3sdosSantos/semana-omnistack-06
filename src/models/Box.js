import mongoose from 'mongoose'

const Box = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  // Salva os 'ID' dos arquivos salvos em 'File'
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
}, {
  timestamps: true
})

export default mongoose.model("Box", Box)


