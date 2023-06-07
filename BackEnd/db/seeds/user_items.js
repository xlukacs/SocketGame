/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('user_items')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('user_items').insert([
        { item_id: 3, user_id: 2 },
        { item_id: 3, user_id: 1 },
        { item_id: 1, user_id: 1, amount: 10 },
      ]);
    });
};
