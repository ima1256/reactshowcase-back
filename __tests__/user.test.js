const request = require("supertest")
const { MongoMemoryServer } = require("mongodb-memory-server")
const mongoose = require("mongoose")
const { app, connectDB } = require('../server')
const User = require('../models/User')

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()

  // console.log('This is ram server uri: ' + uri)
  await connectDB(uri)

})

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close()
  await mongoose.disconnect()
  await mongoServer.stop()
})

beforeEach(async () => {
  await User.deleteMany({})
})

test("GET /api/users should return empty array initially", async () => {
   const res = await request(app).get("/api/users")
   expect(res.statusCode).toBe(200)
   expect(res.body).toEqual([])
})

test("GET /api/users should return created users", async () => {
  await User.create({ name: "Alice", email: 'alice@gmail.com'})
  const res = await request(app).get("/api/users")
  expect(res.statusCode).toBe(200)
  expect(res.body.length).toBe(1)
  expect(res.body[0].name).toBe("Alice")
})

test("POST /api/users - creates a user", async () => {
  const newUser = { name: "Alice", email: "alice@example.com" };

  const res = await request(app).post("/api/users").send(newUser);

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("_id");
  expect(res.body.name).toBe("Alice");
});

test("GET /api/users/:id - gets a single user", async () => {
  const user = await User.create({ name: "Bob", email: "bob@example.com" });

  const res = await request(app).get(`/api/users/${user._id}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe("Bob");
});

test("should return 404 if user not found", async () => {
  const fakeId = new mongoose.Types.ObjectId();
  const res = await request(app).get(`/api/users/${fakeId}`);

  expect(res.statusCode).toBe(404);
  expect(res.body.message).toBe("User not found");
});

test("should return 400 for invalid ObjectId", async () => {
  const res = await request(app).get("/api/users/invalid-id");

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe("Invalid ID format");
});


test("PATCH /api/users/:id - updates a user", async () => {
  const user = await User.create({ name: "Charlie", email: "charlie@example.com" });

  const res = await request(app)
    .patch(`/api/users/${user._id}`)
    .send({ name: "Charles", email: "charlie@example.com" });

  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe("Charles");
});

test("DELETE /api/users/:id - deletes a user", async () => {
  const user = await User.create({ name: "Dave", email: "dave@example.com" });

  const res = await request(app).delete(`/api/users/${user._id}`);

  expect(res.statusCode).toBe(200);
  const found = await User.findById(user._id);
  expect(found).toBeNull();
});
