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
        { id: 1, username: 'John Doe', email: 'john@example.com', password: '123456', faction: 'VRU' },
        { id: 2, username: 'madrent', email: 'email@test.com', password: 'password', faction: 'EIC', uridium: 10000, credits: 100000 },
      ]);
    });
};
