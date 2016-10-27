function UniverseService() {
    var url = 'http://localhost:1685/api/galaxies?include=stars,planets,moons,creatures';
    

    this.getGalaxies = function (cb) {
        $.getJSON(url, function (data) {
            cb(data);
        })
    }

    this.getStars
}