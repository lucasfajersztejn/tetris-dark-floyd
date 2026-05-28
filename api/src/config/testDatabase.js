import mongoose from 'mongoose'

export const connectTestDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
}

export const clearTestDB = async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    await collections[key].deleteMany({})
  }
}

export const disconnectTestDB = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
}