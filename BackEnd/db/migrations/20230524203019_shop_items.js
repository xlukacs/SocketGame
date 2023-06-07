/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('shop_items', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('price').notNullable();
        table.string('currency').notNullable().defaultTo('credits');
        table.string('desc').notNullable();
        table.string('pic').notNullable();
        table.string('item_id').notNullable();
        table.string('category').notNullable();
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('shop_items');
};
