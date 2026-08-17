import React, {
  useEffect,
  useState,
} from "react";

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

type ReviewPageProps = {
  reviews: Review[];
  addReview: (review: Review) => void;
  updateReview: (review: Review) => void;
  deleteReview: (id: number) => void;
  likeReview: (id: number) => void;
  dislikeReview: (id: number) => void;
  userVotes: UserVotes;
};

type PageComponent = React.ComponentType<
  ReviewPageProps
>;

type AppProps = {
  Component: PageComponent;
  pageProps: Record<string, unknown>;
};


export default function App({
  Component,
  pageProps,
}: AppProps) {
  /*
   * IMPORTANT:
   *
   * Do not read localStorage here.
   *
   * The server and the first client render must
   * start with exactly the same data.
   */

  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [userVotes, setUserVotes] =
    useState<UserVotes>({});

  /*
   * ----------------------------------------
   * LOAD SAVED REVIEWS AND VOTES
   * ----------------------------------------
   *
   * The timeout prevents the React lint rule
   * from complaining about synchronous
   * setState inside useEffect.
   */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      /*
       * Load reviews
       */

      try {
        const savedReviews =
          localStorage.getItem("reviews");

        if (savedReviews) {
          const parsedReviews =
            JSON.parse(savedReviews);

          if (Array.isArray(parsedReviews)) {
            setReviews(
              parsedReviews as Review[]
            );
          }
        }
      } catch (error) {
        console.error(
          "Failed to load reviews:",
          error
        );
      }

      /*
       * Load votes
       */

      try {
        const savedVotes =
          localStorage.getItem("userVotes");

        if (savedVotes) {
          const parsedVotes =
            JSON.parse(savedVotes);

          if (
            parsedVotes !== null &&
            typeof parsedVotes === "object" &&
            !Array.isArray(parsedVotes)
          ) {
            setUserVotes(
              parsedVotes as UserVotes
            );
          }
        }
      } catch (error) {
        console.error(
          "Failed to load user votes:",
          error
        );
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /*
   * ----------------------------------------
   * SAVE REVIEWS
   * ----------------------------------------
   */

  const saveReviews = (
    updatedReviews: Review[]
  ) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "reviews",
        JSON.stringify(updatedReviews)
      );
    }
  };

  /*
   * ----------------------------------------
   * SAVE VOTES
   * ----------------------------------------
   */

  const saveUserVotes = (
    updatedVotes: UserVotes
  ) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "userVotes",
        JSON.stringify(updatedVotes)
      );
    }
  };

  /*
   * ----------------------------------------
   * ADD REVIEW
   * ----------------------------------------
   */

  const addReview = (
    review: Review
  ) => {
    setReviews((currentReviews) => {
      const updatedReviews = [
        ...currentReviews,
        review,
      ];

      saveReviews(updatedReviews);

      return updatedReviews;
    });
  };

  /*
   * ----------------------------------------
   * UPDATE REVIEW
   * ----------------------------------------
   */

  const updateReview = (
    updatedReview: Review
  ) => {
    setReviews((currentReviews) => {
      const updatedReviews =
        currentReviews.map((review) => {
          if (
            review.id !==
            updatedReview.id
          ) {
            return review;
          }

          return {
            ...review,
            movieTitle:
              updatedReview.movieTitle,
            review:
              updatedReview.review,
            rating:
              updatedReview.rating,
          };
        });

      saveReviews(updatedReviews);

      return updatedReviews;
    });
  };

  /*
   * ----------------------------------------
   * DELETE REVIEW
   * ----------------------------------------
   */

  const deleteReview = (
    id: number
  ) => {
    setReviews((currentReviews) => {
      const updatedReviews =
        currentReviews.filter(
          (review) =>
            review.id !== id
        );

      saveReviews(updatedReviews);

      return updatedReviews;
    });

    /*
     * Also remove the user's vote
     * for the deleted review.
     */

    setUserVotes((currentVotes) => {
      const updatedVotes = {
        ...currentVotes,
      };

      delete updatedVotes[id];

      saveUserVotes(updatedVotes);

      return updatedVotes;
    });
  };

  /*
   * ----------------------------------------
   * LIKE REVIEW
   * ----------------------------------------
   */

  const likeReview = (
    id: number
  ) => {
    const currentVote =
      userVotes[id];

    setReviews((currentReviews) => {
      const updatedReviews =
        currentReviews.map((review) => {
          if (review.id !== id) {
            return review;
          }

          /*
           * Clicking an existing like
           * removes the like.
           */

          if (currentVote === "like") {
            return {
              ...review,
              likes: Math.max(
                0,
                review.likes - 1
              ),
            };
          }

          /*
           * Otherwise add a like.
           *
           * If the user previously disliked
           * the review, remove that dislike.
           */

          return {
            ...review,
            likes:
              review.likes + 1,
            dislikes:
              currentVote ===
              "dislike"
                ? Math.max(
                    0,
                    review.dislikes - 1
                  )
                : review.dislikes,
          };
        });

      saveReviews(updatedReviews);

      return updatedReviews;
    });

    setUserVotes((currentVotes) => {
      const updatedVotes = {
        ...currentVotes,
      };

      if (currentVote === "like") {
        delete updatedVotes[id];
      } else {
        updatedVotes[id] = "like";
      }

      saveUserVotes(updatedVotes);

      return updatedVotes;
    });
  };

  /*
   * ----------------------------------------
   * DISLIKE REVIEW
   * ----------------------------------------
   */

  const dislikeReview = (
    id: number
  ) => {
    const currentVote =
      userVotes[id];

    setReviews((currentReviews) => {
      const updatedReviews =
        currentReviews.map((review) => {
          if (review.id !== id) {
            return review;
          }

          /*
           * Clicking an existing dislike
           * removes the dislike.
           */

          if (
            currentVote ===
            "dislike"
          ) {
            return {
              ...review,
              dislikes: Math.max(
                0,
                review.dislikes - 1
              ),
            };
          }

          /*
           * Otherwise add a dislike.
           *
           * If the user previously liked
           * the review, remove that like.
           */

          return {
            ...review,
            dislikes:
              review.dislikes + 1,
            likes:
              currentVote === "like"
                ? Math.max(
                    0,
                    review.likes - 1
                  )
                : review.likes,
          };
        });

      saveReviews(updatedReviews);

      return updatedReviews;
    });

    setUserVotes((currentVotes) => {
      const updatedVotes = {
        ...currentVotes,
      };

      if (
        currentVote ===
        "dislike"
      ) {
        delete updatedVotes[id];
      } else {
        updatedVotes[id] = "dislike";
      }

      saveUserVotes(updatedVotes);

      return updatedVotes;
    });
  };

  /*
   * ----------------------------------------
   * PAGE PROPS
   * ----------------------------------------
   */

  const reviewPageProps: ReviewPageProps = {
    reviews,
    addReview,
    updateReview,
    deleteReview,
    likeReview,
    dislikeReview,
    userVotes,
  };

  /*
   * ----------------------------------------
   * RENDER
   * ----------------------------------------
   */

  return (
    <>
      <Header />

      <Navbar />

      <main>
        <Component
          {...reviewPageProps}
          {...pageProps}
        />
      </main>

      <Footer />
    </>
  );
}