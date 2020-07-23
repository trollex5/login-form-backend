const { Schema, model } = require('mongoose');
const encryption = require('../utils/encryption');

const UserSchema = new Schema({
  email: {
    type:Schema.Types.String, 
    required:true, 
    unique: true,
    lowercase: true
  },
  hashedPassword: {
    type:Schema.Types.String, 
    required:true
  },
  username: {
    type:Schema.Types.String,
    unique: true,
    required:true
  },
  salt: {
    type: Schema.Types.String,
    required: true
  },
  vc: {
    type:Schema.Types.String, 
    required:true
  },
  validation: {
    type:Boolean, 
    required:true
  },
  tokens: [
    {
      _id: {
        type:Schema.Types.String, 
        required: true
      }
    }
  ],
  posts: [
    {type: Schema.Types.ObjectId, ref:'Post'}
  ]
});

UserSchema.method({
  authenticate: function(password) {
    const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

    return currentHashedPass === this.hashedPassword;
  }
})

const User = model('user', UserSchema);

module.exports = User;
