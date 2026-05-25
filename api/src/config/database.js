import mongoose from 'mongoose'

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((x) =>
      console.log(`MongoDB conectado: "${x.connection.name}"`)
    )
    .catch((error) =>
      console.error('Error conectando a MongoDB:', error)
    )
}

export default connectDB