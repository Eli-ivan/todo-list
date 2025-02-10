/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('password_reset', function (table) {
        table.increments('id');
        table.integer('userId');
        table.string('token');
        table.timestamps(true, true, true);
        table.foreign('userId').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('password_reset');
};
