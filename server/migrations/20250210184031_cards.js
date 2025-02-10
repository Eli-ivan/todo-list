/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cards', function (table) {
        table.increments('id');
        table.string('title').notNullable();
        table.text('description');
        table.integer('boardId');
        table.integer('statusId');
        table.foreign('boardId').references('boards.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('statusId').references('cards_statuses.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('cards');
};
