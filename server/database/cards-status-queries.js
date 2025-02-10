const knex = require("./connection.js");

async function all() {
    return knex('cards_statuses');
}

async function get(id) {
    const results = await knex('cards_statuses').where({ id });
    return results[0];
}

async function create(req) {
    const results = await knex('cards_statuses').insert(req).returning('*');
    return results[0];
}

async function update(id, properties) {
    const results = await knex('cards_statuses').where({ id }).update({ ...properties }).returning('*');
    return results[0];
}

// delete is a reserved keyword
async function del(id) {
    const results = await knex('cards_statuses').where({ id }).del().returning('*');
    return results[0];
}

async function clear() {
    return knex('cards_statuses').del().returning('*');
}

module.exports = {
    all,
    get,
    create,
    update,
    delete: del,
    clear
}