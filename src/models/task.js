const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (value.length < 5) {
          throw new Error('You need to write something longer than 4 words');
        } else if (value === '' || value === null) {
          throw new Error('You cannot save without type anything.');
        }
      },
    },
    completed: {
      type: Boolean,
      default: false,
      trim: true,
      lowercase: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.pre('save', async function(next) {
  console.log('test taskSchema');
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
