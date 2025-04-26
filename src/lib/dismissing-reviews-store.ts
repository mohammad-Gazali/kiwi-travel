const DISMISSING_REVIEWS_KEY = "kiwi-travel-dismissed";

export const dismissingReviewStore = {
  isDismissed: (bookingId: number) => {
    const array: number[] = JSON.parse(
      localStorage.getItem(DISMISSING_REVIEWS_KEY) ?? "[]",
    );
    return array.includes(bookingId);
  },
  add: (bookingId: number) => {
    const array: number[] = JSON.parse(
      localStorage.getItem(DISMISSING_REVIEWS_KEY) ?? "[]",
    );

    localStorage.setItem(
      DISMISSING_REVIEWS_KEY,
      JSON.stringify([...array, bookingId]),
    );
  },
};