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
      },
      creature: [{
        localField: 'knownCreatures',
        foreignKeys: 'starIds'
      }, {
        localField: 'creatures',
        localKeys: 'creatureIds'
      }]
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
  DS.find('galaxy', star.galaxyId).then(function(galaxy){ 
  function starColor(temperature) {
    if (temperature >= 25000) {
      color = 'blue';
    }
    else if (temperature >= 11000 && temperature < 25000) {
      color = 'blue';
    }
    else if (temperature >= 7500 && temperature < 11000) {
      color = 'blue';
    }
    else if (temperature >= 6000 && temperature < 7500) {
      color = 'blue to white';
    }
    else if (temperature >= 5000 && temperature < 6000) {
      color = 'white to yellow';
    }
    else if (temperature >= 3500 && temperature < 5000) {
      color = 'orange to red';
    }
    else {
      color = 'red';
    }
    return color
  }
  let starObj = {
    id: uuid.v4(),
    name: star.name,
    temperature: star.temperature + ' K',
    color: starColor(star.temperature),
    galaxyId: star.galaxyId
  }

  let error = schemator.validateSync('Star', starObj);
  if (error) {
    return cb(error);
  }
  // Use the Resource Model to create a new star
  Star.create(starObj).then(cb).catch(cb)
  }).catch(cb)
}

function getAll(query, cb) {
  //Use the Resource Model to get all Galaxies
  Star.findAll({}, formatQuery(query)).then(cb).catch(cb)
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




