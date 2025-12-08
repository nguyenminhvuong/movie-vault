const mongoose = require('mongoose');
const User = require('./models/User');
const Movie = require('./models/Movie');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/movie-vault';

const sampleMovies = [
  {
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: 1994,
    genre: ["Drama"],
    duration: 142,
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    poster: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/watch?v=6hB3S9bIaco"
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972,
    genre: ["Crime", "Drama"],
    duration: 175,
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    poster: "https://m.media-amazon.com/images/M/MV5BYTJkNGQyZDgtZDQ0NC00MDM0LWEzZWQtYzUzZDEwMDljZWNjXkEyXkFqcGc@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/watch?v=sY1S34973zA"
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    duration: 152,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY"
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: 1994,
    genre: ["Crime", "Drama"],
    duration: 154,
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    poster: "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/watch?v=s7EdQ4FqbhY"
  },
  {
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    duration: 148,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0"
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    year: 1994,
    genre: ["Drama", "Romance"],
    duration: 142,
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    poster: "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_SX300.jpg",
    trailer: "https://www.youtube.com/watch?v=bLvqoHBptjg"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Movie.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = new User({
      username: 'admin',
      email: 'admin@movievault.com',
      password: 'admin123',
      isAdmin: true
    });
    await admin.save();
    console.log('Admin user created (username: admin, password: admin123)');

    // Create regular user
    const user = new User({
      username: 'testuser',
      email: 'user@example.com',
      password: 'password123',
      isAdmin: false
    });
    await user.save();
    console.log('Test user created (username: testuser, password: password123)');

    // Insert sample movies
    await Movie.insertMany(sampleMovies);
    console.log(`${sampleMovies.length} movies added to database`);

    console.log('\nDatabase seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin - username: admin, password: admin123');
    console.log('User - username: testuser, password: password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
