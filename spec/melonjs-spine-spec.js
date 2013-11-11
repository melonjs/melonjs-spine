var resources = [
  {name: 'goblins', type:'json', src:'example/data/spine/goblins.json'},
  {name: 'goblins_atlas', type:'binary', src:'example/data/spine/goblins.atlas'},
  {name: 'goblins_atlas', type:'image', src:'example/data/spine/goblins.png'}
];
me.loader.onload = function() {
  describe("me.Spine.Entity", function() {
    var entity;
    var fixturedSettings = {
      atlas : 'goblins_atlas',
      imagePath : 'goblins_atlas',
      spineData : 'goblins',
      name : 'goblins'
    };

    describe("#init", function() {
      it("should throw an error when missing the required settings", function() {
        expect(function() { new me.Spine.Entity() }).toThrow("Ensure atlas, imagePath and spineData are specified in the settings hash");
      });
      describe('object properties', function() {
        beforeEach(function() {
          entity = new me.Spine.Entity(0, 0, fixturedSettings);
        });

        it('has settings defined', function() {
          expect(entity.settings).toBeDefined();
        });

        it('vertices should be an array', function() {
          expect(entity.vertices).toEqual(jasmine.any(Array));
        });
      });
    });
  });

  window.htmlReporter.initialize();
  window.jasmineEnv.execute();
}
me.loader.preload(resources);
