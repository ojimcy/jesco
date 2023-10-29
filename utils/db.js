import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log('Already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Use previous connection');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('New connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('Not disconnected');
    }
  }
}

function productWithSerializableId(product) {
  if (Array.isArray(product)) {
    return product.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt.toString(),
      updatedAt: p.updatedAt.toString(),
    }));
  } else {
    return {
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt.toString(),
      updatedAt: product.updatedAt.toString(),
    };
  }
}


const db = { connect, disconnect, productWithSerializableId };
export default db;
