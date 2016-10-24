let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  schemator = dataAdapter.schemator,
  DS = dataAdapter.DS,
  formatQuery = dataAdapter.formatQuery;

let Moon = DS.defineResource({
  name: 'moon',
  endpoint: 'moons',
  filepath: __dirname + '/../data/moons.db',
  relations: {
    belongsTo: {
        planet: {
            localField: 'planet',
            localKey: 'planetId'
        }
    }    
  }
})

function create(name, cb) {
  // Use the Resource Model to create a new moon
  Moon.create({ id: uuid.v4(), name: name }).then(cb).catch(cb)
}

function getAll(query, cb) {
  //Use the Resource Model to get all Moons
  Moon.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
  // use the Resource Model to get a single moon by its id
  Moon.find(id, formatQuery(query)).then(cb).catch(cb)
}



module.exports = {
  create,
  getAll,
  getById
}