const knex = require("./connection.js");

async function all() {
    return knex('cards');
}

async function get(id) {
    const results = await knex('cards').where({ id });
    return results[0];
}

async function create(req) {
    const results = await knex('cards').insert(req).returning('*');
    return results[0];
}

async function update(id, properties) {
    const results = await knex('cards').where({ id }).update({ ...properties }).returning('*');
    return results[0];
}

// delete is a reserved keyword
async function del(id) {
    const results = await knex('cards').where({ id }).del().returning('*');
    return results[0];
}

async function clear() {
    return knex('cards').del().returning('*');
}

module.exports = {
    all,
    get,
    create,
    update,
    delete: del,
    clear
}