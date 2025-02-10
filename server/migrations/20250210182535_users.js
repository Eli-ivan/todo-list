/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id');
        table.string('email').notNullable().unique({ indexName: 'user_email_unq_index' });
        table.string('password');
        table.string('name');
        table.boolean('isAtive').defaultTo(true);
        table.integer('roleId');
        table.foreign('roleId').references('roles.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
