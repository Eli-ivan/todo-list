/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('password_reset', function (table) {
        table.increments('id');
        table.string('title').notNullable();
        table.text('description');
        table.integer('organizationId');
        table.foreign('organizationId').references('organizations.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamps(true, true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('boards');
};
