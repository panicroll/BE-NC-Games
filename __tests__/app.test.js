const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const sorted = require("jest-sorted");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  db.end();
});

// GET /API/CATEGORIES

describe("GET /api/categories", () => {
  test("status: 200, responds with an array of category objects containing slug and description properties", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        expect(categories).toBeInstanceOf(Array);
        expect(categories).toHaveLength(4);

        categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });

  test("status: 404, responds with not found when passed a non-existent path", () => {
    return request(app)
      .get("/api/categ")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Not found");
      });
  });
});

// GET /API/REVIEWS/:REVIEW_ID

describe("GET /api/reviews/:review_id", () => {
  test("status: 200, responds with a review object containing all the appropriate properties", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;

        expect(review).toBeInstanceOf(Object);
        expect(review).toEqual(
          expect.objectContaining({
            review_id: 1,
            title: expect.any(String),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            votes: expect.any(Number),
            category: expect.any(String),
            owner: expect.any(String),
            created_at: expect.any(String),
          })
        );
      });
  });

  test("status: 400, responds with bad request when passed an ID with invalid syntax", () => {
    return request(app)
      .get("/api/reviews/one")
      .expect(400)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("Bad request");
      });
  });

  test("status: 404, responds with review not found when passed a valid ID that is currently unused", () => {
    return request(app)
      .get("/api/reviews/3000")
      .expect(404)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("Review not found");
      });
  });
});

// PATCH /api/reviews/:review_id

describe("PATCH /api/reviews/:review_id", () => {
  test("status: 200, accepts an object to add votes to a review and responds with the updated review", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual(
          expect.objectContaining({
            review_id: 1,
            title: expect.any(String),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            votes: 2,
            category: expect.any(String),
            owner: expect.any(String),
            created_at: expect.any(String),
          })
        );
        expect(body.review.votes).toBe(2);
      });
  });

  test("status: 200, accepts an object to decrease votes on a review and responds with the updated review", () => {
    return request(app)
      .patch("/api/reviews/2")
      .send({ inc_votes: -2 })
      .expect(200)
      .then(({ body }) => {
        expect(body.review.votes).toBe(3);
      });
  });

  test("status: 400, responds with bad request when passed a non-numeric vote increment", () => {
    return request(app)
      .patch("/api/reviews/2")
      .send({ inc_votes: "one" })
      .expect(400)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("Bad request");
      });
  });

  test("status: 400, responds with bad request when passed an invalid review ID", () => {
    return request(app)
      .patch("/api/reviews/banana")
      .send({ inc_votes: 5 })
      .expect(400)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("Bad request");
      });
  });

  test("status: 404, responds with review not found when trying to update a review that doesn't exist", () => {
    return request(app)
      .patch("/api/reviews/3000")
      .send({ inc_votes: 10 })
      .expect(404)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("Review not found");
      });
  });

  test("status: 404, responds with review not found when trying to update a review with a valid but non-existent ID", () => {
    return request(app)
      .patch("/api/reviews/303430943")
      .send({ inc_votes: 25 })
      .expect(404)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("Review not found");
      });
  });
});

// GET /api/users

describe("GET /api/users", () => {
  test("status: 200, responds with an array of user objects each containing the appropriate properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toBeInstanceOf(Array);
        expect(users).toHaveLength(4);

        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });

  test("status: 404, responds with not found when passed an incorrect path", () => {
    return request(app)
      .get("/api/user")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Not found");
      });
  });
});

// GET /api/reviews/:review_id with comment_count

describe("GET /api/reviews/:review_id with comment_count", () => {
  test("status: 200, responds with a review object now containing a comment count property", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;

        expect(review).toBeInstanceOf(Object);
        expect(review).toEqual(
          expect.objectContaining({
            review_id: 2,
            title: expect.any(String),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            votes: expect.any(Number),
            category: expect.any(String),
            owner: expect.any(String),
            created_at: expect.any(String),
            comment_count: 3,
          })
        );
      });
  });
});

// GET /API/REVIEWS

describe("GET /api/reviews", () => {
  test("status: 200, responds with an array of review objects", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeInstanceOf(Array);
        expect(reviews).toHaveLength(13);

        reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              category: expect.any(String),
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              designer: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });

  test("status:200, responds with array of review objects sorted by date in descending order", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("status: 404, responds with not found when passed a non-existent path", () => {
    return request(app)
      .get("/api/rev")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Not found");
      });
  });
});

// GET /api/reviews/:review_id/comments

describe("GET /api/reviews/:review_id/comments", () => {
  test("status: 200, responds with an array of comments for the given review", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeInstanceOf(Array);
        expect(comments).toHaveLength(3);

        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              review_id: expect.any(Number),
            })
          );
        });
      });
  });

  test("status: 400, responds with bad request when passed an ID with invalid syntax", () => {
    return request(app)
      .get("/api/reviews/one/comments")
      .expect(400)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("Bad request");
      });
  });

  test("status: 404, responds with review not found when passed a valid ID that is currently unused", () => {
    return request(app)
      .get("/api/reviews/9000/comments")
      .expect(404)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("Review not found");
      });
  });

  test("status: 404, responds with no comments found when a valid review has no available comments", () => {
    return request(app)
      .get("/api/reviews/4/comments")
      .expect(404)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("No comments found");
      });
  });
});
