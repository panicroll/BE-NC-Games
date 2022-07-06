const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

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
        )
      });
  });
  test("status: 400, responds with bad request when passed an ID with invalid syntax", () => {
    return request(app).get("/api/reviews/one").expect(400).then(({body}) => {
      const {message} = body;
      expect(message).toBe("Bad request");
    })
  })
  test("status: 404, responds with not found when passed a valid ID that is currently unused", () => {
    return request(app)
      .get("/api/reviews/3000")
      .expect(404)
      .then(({ body }) => {
        console.log(body)
        const {message} = body;
        expect(message).toBe("Review not found");
      });
  });
});
