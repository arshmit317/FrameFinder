import type { AppProps } from "next/app";
import { useState } from "react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";

type Review = {
  id: number;
  username: string;
  movieTitle: string;
  review: string;
  rating: number;
  likes: number;
  dislikes: number;
};

type UserVotes = {
  [reviewId: number]: "like" | "dislike";
};

const placeholderReviews: Review[] = [
  {
    id: 1,
    username: "Sarah",
    movieTitle: "Inception",
    review: "Amazing movie!",
    rating: 5,
    likes: 12,
    dislikes: 2,
  },
  {
    id: 2,
    username: "Alex",
    movieTitle: "The Batman",
    review:
      "The atmosphere was great and the acting was excellent.",
    rating: 4,
    likes: 8,
    dislikes: 1,
  },
  {
    id: 3,
    username: "Jordan",
    movieTitle: "Dune",
    review:
      "Beautiful cinematography and an amazing soundtrack.",
    rating: 5,
    likes: 15,
    dislikes: 3,
  },
];

function getSavedReviews(): Review[] {
  if (typeof window === "undefined") {
    return placeholderReviews;
  }

  try {
    const savedReviews = localStorage.getItem("reviews");

    if (!savedReviews) {
      return placeholderReviews;
    }

    const storedReviews: Review[] =
      JSON.parse(savedReviews);

    return storedReviews.map((review) => {
      const placeholder = placeholderReviews.find(
        (item) => item.id === review.id
      );

      return {
        ...review,
        rating:
          review.rating ??
          placeholder?.rating ??
          0,
      };
    });
  } catch {
    return placeholderReviews;
  }
}

function getSavedVotes(): UserVotes {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const savedVotes =
      localStorage.getItem("userVotes");

    return savedVotes
      ? JSON.parse(savedVotes)
      : {};
  } catch {
    return {};
  }
}

export default function App({
  Component,
  pageProps,
}: AppProps) {
  const [reviews, setReviews] =
    useState<Review[]>(getSavedReviews);

  const [userVotes, setUserVotes] =
    useState<UserVotes>(getSavedVotes);

  const addReview = (review: Review) => {
    setReviews((current) => {
      const updatedReviews = [
        ...current,
        review,
      ];

      localStorage.setItem(
        "reviews",
        JSON.stringify(updatedReviews)
      );

      return updatedReviews;
    });
  };

  const likeReview = (id: number) => {
    const currentVote = userVotes[id];

    if (currentVote === "like") {
      setReviews((current) => {
        const updatedReviews = current.map(
          (review) =>
            review.id === id
              ? {
                  ...review,
                  likes: Math.max(
                    0,
                    review.likes - 1
                  ),
                }
              : review
        );

        localStorage.setItem(
          "reviews",
          JSON.stringify(updatedReviews)
        );

        return updatedReviews;
      });

      setUserVotes((current) => {
        const updated = { ...current };
        delete updated[id];

        localStorage.setItem(
          "userVotes",
          JSON.stringify(updated)
        );

        return updated;
      });

      return;
    }

    setReviews((current) => {
      const updatedReviews = current.map(
        (review) =>
          review.id === id
            ? {
                ...review,
                likes: review.likes + 1,
                dislikes:
                  currentVote === "dislike"
                    ? Math.max(
                        0,
                        review.dislikes - 1
                      )
                    : review.dislikes,
              }
            : review
      );

      localStorage.setItem(
        "reviews",
        JSON.stringify(updatedReviews)
      );

      return updatedReviews;
    });

    setUserVotes((current) => {
      const updated = {
        ...current,
        [id]: "like" as const,
      };

      localStorage.setItem(
        "userVotes",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const dislikeReview = (id: number) => {
    const currentVote = userVotes[id];

    if (currentVote === "dislike") {
      setReviews((current) => {
        const updatedReviews = current.map(
          (review) =>
            review.id === id
              ? {
                  ...review,
                  dislikes: Math.max(
                    0,
                    review.dislikes - 1
                  ),
                }
              : review
        );

        localStorage.setItem(
          "reviews",
          JSON.stringify(updatedReviews)
        );

        return updatedReviews;
      });

      setUserVotes((current) => {
        const updated = { ...current };
        delete updated[id];

        localStorage.setItem(
          "userVotes",
          JSON.stringify(updated)
        );

        return updated;
      });

      return;
    }

    setReviews((current) => {
      const updatedReviews = current.map(
        (review) =>
          review.id === id
            ? {
                ...review,
                dislikes: review.dislikes + 1,
                likes:
                  currentVote === "like"
                    ? Math.max(
                        0,
                        review.likes - 1
                      )
                    : review.likes,
              }
            : review
      );

      localStorage.setItem(
        "reviews",
        JSON.stringify(updatedReviews)
      );

      return updatedReviews;
    });

    setUserVotes((current) => {
      const updated = {
        ...current,
        [id]: "dislike" as const,
      };

      localStorage.setItem(
        "userVotes",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  return (
    <>
      <Header />

      <Navbar />

      <main>
        <Component
          {...pageProps}
          reviews={reviews}
          addReview={addReview}
          likeReview={likeReview}
          dislikeReview={dislikeReview}
          userVotes={userVotes}
        />
      </main>

      <Footer />
    </>
  );
}