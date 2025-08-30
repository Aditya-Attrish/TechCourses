// models/User.js
import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Never return password in queries
  },
  name: {
    type: String,
    maxlength: 30
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  instructorProfile: {
    skills: [{
      type: String,
      trim: true,
      maxlength: [50, 'Each skill cannot exceed 50 characters']
    }],
    headline: {
      type: String,
      maxlength: [200, 'Headline cannot exceed 200 characters']
    },
    socialLinks: {
      twitter: String,
      linkedin: String,
      github: String,
      youtube: String
    }
  },
  studentProfile: {
    interests: [{
      type: String,
      trim: true,
      maxlength: [50, 'Each interest cannot exceed 50 characters']
    }],
    learningGoals: [{
      type: String,
      trim: true,
      maxlength: [200, 'Each learning goal cannot exceed 200 characters']
    }]
  },
  buyHistory:[
    {
      type: Schema.Types.ObjectId,
      ref: "Courses"
    }
  ],
  wishLIst:[
    {
      type: Schema.Types.ObjectId,
      ref: "Courses"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await compare(candidatePassword, this.password);
};

export default User = model('User', userSchema);