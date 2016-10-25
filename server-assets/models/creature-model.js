let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;

let Creature = DS.defineResource({
    name: 'creature',
    endpoint: 'creatures',
    filepath: __dirname + '/../data/creatures.db',
    relations: {
        hasMany: {
            galaxy: [{
                localField: 'galaxies',
                localKeys: 'creatureIds'
            }, {
                localField: 'knownGalaxies',
                foreignKeys: 'galaxyIds'
            }],
            star: [{
                localField: 'stars',
                localKeys: 'creatureIds'
            }, {
                localField: 'knownStars',
                foreignKeys: 'starIds'
            }],
            planet: [{
                localField: 'planets',
                localKeys: 'creatureIds'
            }, {
                localField: 'knownPlanets',
                foreignKeys: 'planetIds'
            }],
            moon: [{
                localField: 'moons',
                localKeys: 'creatureIds'
            }, {
                localField: 'knownMoons',
                foreignKeys: 'moonIds'
            }]
        }
    }
})



function create(creature, cb) {
    let creatureObj = {
        id: uuid.v4(),
        name: creature.name
    }
    
    Creature.create(creatureObj).then(cb).catch(cb)
}

function inhabitLocation(creatureId, type, id, cb) {
    DS.find(type, id).then(function (habitat) {
        Creature.find(creatureId).then(function (creature) {
            creature[type + 'Ids'] = creature[type + 'Ids'] || {}
            creature[type + 'Ids'][id] = id;
            habitat.creatureIds = habitat.creatureIds || {};
            habitat.creatureIds[creatureId] = creatureId;

            Creature.update(creature.id, creature).then(function () {
                DS.update(type, id, habitat)
                    .then(cb)
                    .catch(cb)
            }).catch(cb)
        }).catch(cb)
    }).catch(cb)
}

function getAll(query, cb) {
    Creature.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
    Creature.find(id, formatQuery(query)).then(cb).catch(cb)
}

module.exports = {
    create,
    getAll,
    getById,
    inhabitLocation
}