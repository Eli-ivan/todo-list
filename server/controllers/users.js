const _ = require('lodash');
const users = require('../database/user-queries.js');

function createUser(req, data) {
  return {
    name: data.name,
    email: data.email
  };
}

async function getAllUsers(req, res) {
  const allEntries = await users.all();
  return res.send(allEntries.map( _.curry(createUser)(req) ));
}

async function getUser(req, res) {
  const user = await users.get(req.params.id);
  return res.send(user);
}

async function postUser(req, res) {
  const created = await users.create(req.body.title, req.body.order);
  return res.send(createUser(req, created));
}

async function patchUser(req, res) {
  const patched = await users.update(req.params.id, req.body);
  return res.send(createUser(req, patched));
}

async function deleteUser(req, res) {
  const deleted = await users.delete(req.params.id);
  return res.send(createUser(req, deleted));
}

function addErrorReporting(func, message) {
    return async function(req, res) {
        try {
            return await func(req, res);
        } catch(err) {
            console.log(`${message} caused by: ${err}`);

            // Not always 500, but for simplicity's sake.
            res.status(500).send(`Opps! ${message}.`);
        } 
    }
}

const toExport = {
    getAllUsers: { method: getAllUsers, errorMessage: "Could not fetch all users" },
    getUser: { method: getUser, errorMessage: "Could not fetch user" },
    postUser: { method: postUser, errorMessage: "Could not post user" },
    patchUser: { method: patchUser, errorMessage: "Could not patch user" },
    deleteUser: { method: deleteUser, errorMessage: "Could not delete user" }
}

for (let route in toExport) {
    toExport[route] = addErrorReporting(toExport[route].method, toExport[route].errorMessage);
}

module.exports = toExport;
