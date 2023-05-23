/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, name: 'John Doe', email: 'john@example.com', password: '123456' },
        { id: 2, name: 'madrent', email: 'email@test.com', password: 'password' },
      ]);
    });
};
