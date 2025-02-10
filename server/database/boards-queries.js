const knex = require("./connection.js");

async function all() {
    return knex('boards');
}

async function get(id) {
    const results = await knex('boards').where({ id });
    return results[0];
}

async function create(req) {
    const results = await knex('boards').insert(req).returning('*');
    return results[0];
}

async function update(id, properties) {
    const results = await knex('boards').where({ id }).update({ ...properties }).returning('*');
    return results[0];
}

// delete is a reserved keyword
async function del(id) {
    const results = await knex('boards').where({ id }).del().returning('*');
    return results[0];
}

async function clear() {
    return knex('boards').del().returning('*');
}

module.exports = {
    all,
    get,
    create,
    update,
    delete: del,
    clear
}