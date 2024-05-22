const request = require("supertest");
const app = require("../src/app.js");
const { Restaurant } = require("../models");
const syncSeed = require("../seed.js");

let restQuantity;

beforeAll(async () => {
    await syncSeed();
    const restaurants = await Restaurant.findAll({});
    restQuantity = restaurants.length;
});

// Setting up the tests
test("should return 200 on get", async () => {
    const response = await request(app).get("/Restaurant");
    expect(response.statusCode).toEqual(200);
});

test("should return an array of Restaurant", async () => {
    const response = await request(app).get("/Restaurant");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("cuisine");
});

test("should return the correct number of Restaurant", async () => {
    const response = await request(app).get("/Restaurant");
    expect(response.body.length).toEqual(restQuantity);
});

test("should return the correct restaurant data", async () => {
    const response = await request(app).get("/Restaurant");
    const expectedRestaurant = {
        id: 1,
        name: "AppleBees",
        location: "Texas",
        cuisine: "FastFood",
    };
    const restaurantMatch = response.body.find((restaurant) => restaurant.id === expectedRestaurant.id);
    expect(restaurantMatch).toEqual(expectedRestaurant);
});
