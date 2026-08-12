import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
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

export default function App({
  Component,
  pageProps,
}: AppProps) {
  const [reviews, setReviews] =
    useState<Review[]>(placeholderReviews);

  const [userVotes, setUserVotes] =
    useState<UserVotes>({});

  const [loaded, setLoaded] = useState(false);

  // Load saved data once
  useEffect(() => {
    const savedReviews = localStorage.getItem("reviews");
    const savedVotes = localStorage.getItem("userVotes");

    if (savedReviews) {
      try {
        const storedReviews: Review[] =
          JSON.parse(savedReviews);

        // Add missing ratings to old reviews
        const updatedReviews = storedReviews.map(
          (review) => {
            const placeholder =
              placeholderReviews.find(
                (item) => item.id === review.id
              );

            return {
              ...review,
              rating:
                review.rating ??
                placeholder?.rating ??
                0,
            };
          }
        );

        setReviews(updatedReviews);
      } catch {
        setReviews(placeholderReviews);
      }
    }

    if (savedVotes) {
      try {
        setUserVotes(JSON.parse(savedVotes));
      } catch {
        setUserVotes({});
      }
    }

    setLoaded(true);
  }, []);

  // Save reviews after they have loaded
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "reviews",
      JSON.stringify(reviews)
    );
  }, [reviews, loaded]);

  // Save votes after they have loaded
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "userVotes",
      JSON.stringify(userVotes)
    );
  }, [userVotes, loaded]);

  const addReview = (review: Review) => {
    setReviews((current) => [
      ...current,
      review,
    ]);
  };

  const likeReview = (id: number) => {
    const currentVote = userVotes[id];

    // Remove like
    if (currentVote === "like") {
      setReviews((current) =>
        current.map((review) =>
          review.id === id
            ? {
                ...review,
                likes: Math.max(
                  0,
                  review.likes - 1
                ),
              }
            : review
        )
      );

      setUserVotes((current) => {
        const updated = { ...current };
        delete updated[id];
        return updated;
      });

      return;
    }

    // Add like / switch from dislike
    setReviews((current) =>
      current.map((review) =>
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
      )
    );

    setUserVotes((current) => ({
      ...current,
      [id]: "like",
    }));
  };

  const dislikeReview = (id: number) => {
    const currentVote = userVotes[id];

    // Remove dislike
    if (currentVote === "dislike") {
      setReviews((current) =>
        current.map((review) =>
          review.id === id
            ? {
                ...review,
                dislikes: Math.max(
                  0,
                  review.dislikes - 1
                ),
              }
            : review
        )
      );

      setUserVotes((current) => {
        const updated = { ...current };
        delete updated[id];
        return updated;
      });

      return;
    }

    // Add dislike / switch from like
    setReviews((current) =>
      current.map((review) =>
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
      )
    );

    setUserVotes((current) => ({
      ...current,
      [id]: "dislike",
    }));
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