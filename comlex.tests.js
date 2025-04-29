// test("mytest", () => {
  
// })

// const notifyUser = (userId) => {

//     console.log(`Hey ${userId} has been notified`);

// }


// test("calls with correct messages", () => {

//     const spy = jest.spyOn(console, "log").mockImplementation(() => {});

//     notifyUser(43)

//     expect(spy).toHaveBeenCalledWith("Hey 43 has been notified")

//     spy.mockRestore();

// })

// test("returns correct value", async () => {

//     const mockFetch = jest.fn().mockImplementation(async () => {
//         return { name: 'Imanol', email: 'imanolcondeimanol@gmail.com'}
//     })

//     const result = await mockFetch();

//     expect(result.name).toBe('Imanol')
//     expect(result.email).toBe('imanolcondeimanol@gmail.com')

// })

// const User = {
//     findById: (id) => {
//         fetch('http://api.open-notify.org/astros.json')
//     },
//     anotherFunction: () => {
        
//     }
// }

// test("Test find a user by id", async () => {

//     const fakeUser = {name: 'Kevin', email: 'kevin@gmail.com'}    

//     User.findById = jest.fn().mockImplementation(() => {
//         return fakeUser
//     })

//     const result = await User.findById('dsfadf');

//     expect(result.name).toBe('Kevin')
//     expect(result.email).toBe('kevin@gmail.com')

//     // console.log(typeof User.findById)

//     User.findById.mockRestore()

// })


// test("Test find a user by id", async () => {

//     // const fakeUser = {name: 'Kevin', email: 'kevin@gmail.com'}    

//     User.findById = jest.fn().mockImplementation(() => {
//         throw new Error("This is an erroneous function")
//     })

//     expect(() => User.findById()).toThrow("This is an erroneous function")

// })


// const request = require('supertest')
// const { getUserById } = require('../math')

// const divide = (a, b) => {
//   if (b == 0) throw new Error("Cannot divide by zero");
//   return a / b;
// };

// const sum = (a, b) => {
//   return a + b;
// };

// test("adds 1 + 2 = 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });

// describe("Get user by id", () => {

//   it("Get correct user", async () => {

//     const user = await getUserById(1);
//     expect(user).toEqual({id: 1, name: 'Bob'})

//   })

//   it("Get an incorrect user", async () => {

//     await expect(getUserById(99)).rejects.toThrow("User not found");

//   })

// })

// describe("divide()", () => {
//   test.each([
//     [6, 2, 3],
//     [9, 3, 3],
//     [10, 2, 5],
//   ])("returns %i / %i = %i", (a, b, expected) => {
//     expect(divide(a, b)).toBe(expected);
//   });

//   test("throws if dividing by zero", () => {
//     expect(() => divide(5, 0)).toThrow("Cannot divide by zero");
//   });
// });
