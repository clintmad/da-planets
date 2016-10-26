function GalaxyController() {
    let galaxyService = new UniverseService();
    function update(arr) {
        console.log(arr)
        debugger
        var elem = $('#galaxy-template');
        var template = '';
        for (var i = 0; i < arr.length; i++) {
            
            var thisGalaxy = arr[i];
            template += `
            <div>
                <h1>${'Galaxy: ' + thisGalaxy.name}</h1>
                <h3>${'ID: ' + thisGalaxy.id}</h3>
            </div>`
        }
        elem.empty()
        elem.append(template)
    }
    galaxyService.getGalaxies(update)
}
GalaxyController();