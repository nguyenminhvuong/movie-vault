# Movie Vault

A comprehensive movie management system similar to IMDB, built with Node.js, Express, MongoDB, and EJS. This application features separate admin and public views for managing and browsing movies.

## Features

### Public View
- **Browse Movies**: View all movies in a responsive grid layout
- **Search Functionality**: Search movies by title, director, cast, or genre
- **Genre Filtering**: Browse movies by specific genres
- **Movie Details**: View detailed information about each movie including:
  - Title, director, year, duration
  - Cast and genre
  - Description and trailer
  - User ratings and reviews
- **User Reviews**: Add ratings and reviews (requires login)
- **Pagination**: Navigate through large movie collections

### Admin View
- **Dashboard**: Overview of total movies and recent additions
- **Movie Management**: Full CRUD operations
  - Create new movies
  - Edit existing movies
  - Delete movies
  - View all movies in a table format
- **Secure Access**: Admin-only authentication required

### Authentication
- User registration and login
- Session-based authentication
- Password encryption with bcryptjs
- Role-based access control (Admin/User)

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: EJS
- **Authentication**: express-session, bcryptjs
- **Styling**: Custom CSS with responsive design
- **Session Store**: MongoDB (connect-mongo)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or remote instance)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/nguyenminhvuong/movie-vault.git
   cd movie-vault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update the values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/movie-vault
   SESSION_SECRET=your-secret-key-here
   PORT=3000
   NODE_ENV=development
   ```

4. **Seed the database** (optional but recommended)
   
   This will create sample movies and test users:
   ```bash
   npm run seed
   ```
   
   Default accounts created:
   - **Admin**: username: `admin`, password: `admin123`
   - **User**: username: `testuser`, password: `password123`

5. **Start the application**
   ```bash
   npm start
   ```
   
   The application will be available at `http://localhost:3000`

## Usage

### For Regular Users

1. **Register** a new account or **login** with existing credentials
2. **Browse** movies on the home page
3. **Search** for specific movies using the search bar
4. **Filter** movies by genre
5. **View** detailed movie information
6. **Add reviews** and ratings to movies

### For Administrators

1. **Login** with admin credentials
2. Access the **Admin Dashboard** via the navbar
3. **Add new movies** with complete information
4. **Edit or delete** existing movies
5. **View statistics** and recent additions

## Project Structure

```
movie-vault/
├── config/
│   └── database.js          # Database configuration
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── Movie.js             # Movie model
│   └── User.js              # User model
├── routes/
│   ├── admin.js             # Admin routes
│   ├── auth.js              # Authentication routes
│   └── public.js            # Public routes
├── views/
│   ├── admin/               # Admin view templates
│   │   ├── dashboard.ejs
│   │   ├── movies.ejs
│   │   └── movie-form.ejs
│   ├── auth/                # Authentication templates
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── public/              # Public view templates
│   │   ├── index.ejs
│   │   ├── movie-detail.ejs
│   │   ├── search.ejs
│   │   ├── genre.ejs
│   │   ├── 404.ejs
│   │   └── error.ejs
│   └── layout.ejs           # Main layout template
├── public/
│   ├── css/
│   │   └── style.css        # Application styles
│   ├── images/              # Static images
│   └── js/                  # Client-side scripts
├── .env.example             # Example environment variables
├── .gitignore              # Git ignore file
├── app.js                  # Main application file
├── package.json            # Project dependencies
├── seed.js                 # Database seeding script
└── README.md               # This file
```

## API Routes

### Public Routes
- `GET /` - Home page with movie list
- `GET /search?q=query` - Search movies
- `GET /movie/:id` - Movie detail page
- `POST /movie/:id/review` - Add a review (requires login)
- `GET /genre/:genre` - Movies by genre

### Authentication Routes
- `GET /auth/login` - Login page
- `POST /auth/login` - Login handler
- `GET /auth/register` - Registration page
- `POST /auth/register` - Registration handler
- `GET /auth/logout` - Logout

### Admin Routes (requires admin authentication)
- `GET /admin` - Admin dashboard
- `GET /admin/movies` - List all movies
- `GET /admin/movies/new` - New movie form
- `POST /admin/movies` - Create movie
- `GET /admin/movies/:id/edit` - Edit movie form
- `PUT /admin/movies/:id` - Update movie
- `DELETE /admin/movies/:id` - Delete movie

## Features in Detail

### Movie Schema
Each movie includes:
- Title, director, year, duration
- Genre (array of genres)
- Description
- Cast (array of actors)
- Poster image URL
- Trailer URL
- Reviews with ratings and comments
- Calculated average rating

### User Roles
- **Regular Users**: Can browse, search, and review movies
- **Admin Users**: Full access to CRUD operations and admin dashboard

### Security Features
- Password hashing with bcryptjs
- Session-based authentication
- Protected admin routes
- CSRF protection via method-override

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

Nguyen Minh Vuong

## Support

For issues and questions, please create an issue in the GitHub repository.

