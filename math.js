
const users = [
    {id: 1, name: 'Bob'},
    {id: 2, name: 'Alice'}
]

const getUserById = async (id) => {

    const user = users.find(u => u.id == id)
    if (!user) throw new Error ("User not found");

    return user

}

module.exports = { getUserById }