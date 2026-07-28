# FrameFinder

This is a movie search web application built with **Next.js** and **TypeScript**. It allows users to search for movies, save favorites, track watched movies, and write reviews.

## Features

- Search for movies
- Save favorite movies
- Keep track of watched movies
- Write and view movie reviews
- View movie details
- Responsive design for desktop and mobile

## Technologies Used

- Next.js
- React
- TypeScript
- CSS

## Project Structure

```
film-finder/
│
├── components/
│   ├── Header.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   ├── MovieCard.tsx
│   ├── ReviewForm.tsx
│   └── SavedMovieCard.tsx
│
├── pages/
│   ├── index.tsx
│   ├── search.tsx
│   ├── saved.tsx
│   ├── reviews.tsx
│   ├── watched.tsx
│   ├── about.tsx
│   └── movie/
│       └── [id].tsx
│
├── public/
├── styles/
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/film-finder.git
```

Go into the project folder:

```bash
cd film-finder
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

## Team Members

- Arshmit Grewal
- Alessandro 
- Sarah
- Chanh

## Branch Workflow

Before starting work:

```bash
git pull
```

After making changes:

```bash
git add .
git commit -m "Describe your changes"
git push
```

## Project Status

Phase 1 Completed

- Project structure
- Routing
- Components
- Basic layout

## Future Improvements

- Connect to a movie API
- User authentication
- Watchlists
- Movie recommendations
