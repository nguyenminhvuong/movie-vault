const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  director: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: [{
    type: String,
    trim: true
  }],
  duration: {
    type: Number, // in minutes
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  description: {
    type: String,
    required: true
  },
  cast: [{
    type: String,
    trim: true
  }],
  poster: {
    type: String,
    default: '/images/default-poster.svg'
  },
  trailer: {
    type: String
  },
  reviews: [{
    user: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
movieSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

// Calculate average rating from reviews
movieSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    return 0;
  }
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  this.rating = Math.round((sum / this.reviews.length) * 10) / 10;
  return this.rating;
};

module.exports = mongoose.model('Movie', movieSchema);
