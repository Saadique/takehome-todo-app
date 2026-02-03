const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [120, 'Title must be at most 120 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description must be at most 2000 characters'],
      default: '',
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

TodoSchema.set('toJSON', {
  transform: (_doc, todoJson) => {
    todoJson.id = todoJson._id.toString();
    return todoJson;
  },
});

module.exports = mongoose.model('Todo', TodoSchema);
