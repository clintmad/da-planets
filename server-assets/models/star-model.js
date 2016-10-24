let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  schemator = dataAdapter.schemator,
  DS = dataAdapter.DS,
  formatQuery = dataAdapter.formatQuery;

let Star = DS.defineResource({
  name: 'star',
  endpoint: 'stars',
  filepath: __dirname + '/../data/stars.db',
  relations: {
    belongsTo: {
      galaxy: {
        localField: 'galaxy',
        localKey: 'galaxyId'
      }
    },
    hasMany: {
      planet: {
        localField: 'planets',
        foreignKey: 'starId'
      },
      moon: {
        localField: 'moons',
        foreignKey: 'starId'
      }
    }
  }
})

schemator.defineSchema('Star', {
  id: {
    type: 'string',
    nullable: false
  },
  name: {
    type: 'string',
    nullable: false
  }
})

function create(star, cb) {
  let color = function starColor(temperature, cb){
  if(temperature >= 7500){
    color = 'blue';
    cb();
  }
  else if(temperature >= 6000 && temperature < 7500){
    color = 'blue to white';
    cb();
  }
  else if(temperature >= 5000 && temperature < 6000){
    color = 'white to yellow';
    cb();
  }
  else if(temperature >= 3500 && temperature < 5000){
    color = 'orange to red';
    cb();
  }
  else{
    color = 'red';
    cb();
  }
  return color
}
  let starObj = { 
    id: uuid.v4(), 
    name: star.name, 
    temperature: star.temperature + ' K',
    color: star.color,
    galaxyId: star.galaxyId
  }
  let error = schemator.validateSync('Star', starObj);
  if(error){
    error.stack
    return cb(error);
  }
  // Use the Resource Model to create a new star
  Star.create(starObj).then(cb).catch(cb)
}

function getAll(query, cb) {
  //Use the Resource Model to get all Galaxies
  Star.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
  // use the Resource Model to get a single star by its id
  Star.find(id, formatQuery(query)).then(cb).catch(cb)
}

module.exports = {
  create,
  getAll,
  getById
}



  
  