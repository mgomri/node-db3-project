const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development); 

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find () {
    return db('schemes');
};

function findById(id){
    return db('schemes').where({ id }).first();
};


function findSteps(schemeId){
    return db('steps')
    .join('schemes', 'schemes.id','scheme_id')
    .select('instructions')
    .where('schemes.id', schemeId)
    .orderBy('step_number');
}

function add(scheme){
    return db('schemes')
    .insert(scheme, 'id')
    .then(ids => ({ id: ids[0] }));
    
};

function update(changes, id){
    return db('schemes')
    .where('id', Number(id))
    .update(changes);
}

function remove (id){
    return db('schemes')
    .where('id', Number(id))
    .del();
};

