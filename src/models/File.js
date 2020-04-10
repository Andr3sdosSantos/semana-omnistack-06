import mongoose from 'mongoose'

const File = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  path: {
    // Guarda o caminho do upload feito pelo frontend
    type: String,
    required: true
  },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})

File.virtual('url').get(function() {
  const url = process.env.URL || 'http://localhost:3333'

  return `${url}/files/${encodeURIComponent(this.path)}`
})

export default mongoose.model("File", File)
