const _ = require('lodash');
const roles = require('../database/role-queries.js');

function createRole(req, data) {
  return {
    name: data.name,
    email: data.email
  };
}

async function getAllRoles(req, res) {
  const allEntries = await roles.all();
  return res.send(allEntries.map( _.curry(createRole)(req) ));
}

async function getRole(req, res) {
  const role = await roles.get(req.params.id);
  return res.send(role);
}

async function postRole(req, res) {
  const created = await roles.create(req.body.title, req.body.order);
  return res.send(createRole(req, created));
}

async function patchRole(req, res) {
  const patched = await roles.update(req.params.id, req.body);
  return res.send(createRole(req, patched));
}

async function deleteRole(req, res) {
  const deleted = await roles.delete(req.params.id);
  return res.send(createRole(req, deleted));
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
    getAllRoles: { method: getAllRoles, errorMessage: "Could not fetch all Roles" },
    getRole: { method: getRole, errorMessage: "Could not fetch role" },
    postRole: { method: postRole, errorMessage: "Could not post role" },
    patchRole: { method: patchRole, errorMessage: "Could not patch role" },
    deleteRole: { method: deleteRole, errorMessage: "Could not delete role" }
}

for (let route in toExport) {
    toExport[route] = addErrorReporting(toExport[route].method, toExport[route].errorMessage);
}

module.exports = toExport;
