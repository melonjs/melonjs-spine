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

        it('time is set', function() {
          expect(entity.time).toEqual(jasmine.any(Number));
        });
      });
    });

    describe('#initSpineObjects', function() {
      beforeEach(function() {
        entity = new me.Spine.Entity(10, 0, fixturedSettings);
      });

      it('skeleton should be defined', function() {
        expect(entity.skeleton).toBeDefined();
      });

      it('the rootbone x is equal to the object position', function() {
        expect(entity.skeleton.getRootBone().x).toEqual(10);
      });

      it('stateData should be defined', function() {
        expect(entity.stateData).toBeDefined();
      });

      it('state should be defined', function() {
        expect(entity.state).toBeDefined();
      });

      it('spritewidth should be set to a number', function() {
        expect(entity.settings.spritewidth).toEqual(jasmine.any(Number));
      });

      it('spriteheight should be set to a number', function() {
        expect(entity.settings.spriteheight).toEqual(jasmine.any(Number));
      });
    });

    describe('#update', function() {
      beforeEach(function() {
        entity = new me.Spine.Entity(100, 100, fixturedSettings);
      });

      it('entity skeleton should update', function() {
        spyOn(entity.skeleton, 'updateWorldTransform');
        entity.update();
        expect(entity.skeleton.updateWorldTransform).toHaveBeenCalled();
      });
    });
  });

  window.htmlReporter.initialize();
  window.jasmineEnv.execute();
}
me.loader.preload(resources);
