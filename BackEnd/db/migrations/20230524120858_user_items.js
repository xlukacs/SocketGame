/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_items', function (table) {
        table.increments('id').primary();
        table.integer('item_id').notNullable();
        table.integer('user_id').notNullable();
        table.integer('amount').notNullable().defaultTo(1);
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user_items');
};
