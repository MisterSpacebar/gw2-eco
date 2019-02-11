let mongoose = require('mongoose');

const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'User';      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect()
  }

_connect() {
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

let userSchema = new mongoose.Schema({
  user: {
      type: String,
      required: true,
    }
   }    
})

module.exports = new Database()  
module.exports = mongoose.model('User', userSchema)


