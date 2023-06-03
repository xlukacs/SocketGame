/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.integer('rankpoints').notNullable().defaultTo(0);
        table.integer('credits').notNullable().defaultTo(0);
        table.integer('uridium').notNullable().defaultTo(0);
        table.integer('trubium').notNullable().defaultTo(0);
        table.integer('xp').notNullable().defaultTo(0);
        table.integer('honors').notNullable().defaultTo(0);
        table.string('server').notNullable().defaultTo('GE1');
        table.integer('level').notNullable().defaultTo(1);
        table.string('faction').notNullable();
        table.string('email').notNullable().unique();
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
