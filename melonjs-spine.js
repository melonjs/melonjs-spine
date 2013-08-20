(function() {
  spine.Bone.yDown = true;
  me.Spine = {};
  me.Spine.Entity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
      if(isNullOrUndefined(settings['atlas']) || isNullOrUndefined(settings['imagePath']) || isNullOrUndefined(settings['spineData'])) {
        throw "Ensure atlas, imagePath and spineData are specified in the settings hash";
      }
      this.settings = settings;
      this.time = null;
      this.parent(x, y, settings);
      this.anchorPoint.x = 0.5;
      this.anchorPoint.y = 0.5;
      this.initSpineObjects();
      this.vertices = [];
    },

    draw: function(ctx, rect) {
      this.parent(ctx, rect);

      var drawOrder = this.skeleton.drawOrder;
      for (var i = 0, n = drawOrder.length; i < n; i++) {
        var slot = drawOrder[i];
        var attachment = slot.attachment;
        if (!(attachment instanceof spine.RegionAttachment)) continue;
        attachment.computeVertices(this.skeleton.x, this.skeleton.y, slot.bone, this.vertices);
        var image = attachment.rendererObject.page.rendererObject;
        ctx.save();
        
        ctx.restore();
        
        batch.add(
          attachment.rendererObject.page.rendererObject,
          this.vertices[0], this.vertices[1],
          this.vertices[6], this.vertices[7],
          this.vertices[2], this.vertices[3],
          this.vertices[4], this.vertices[5],
          this.skeleton.r * slot.r,
          this.skeleton.g * slot.g,
          this.skeleton.b * slot.b,
          this.skeleton.a * slot.a,
          attachment.uvs[0], attachment.uvs[1],
          attachment.uvs[4], attachment.uvs[5]
        );
      }
    },

    initSpineObjects: function() {
      var atlasText = me.loader.getTextFile(this.settings['atlas']);
      var loader = new me.Spine.TextureLoader();
      loader.imagePath = this.settings.imagePath;
      var atlas = new spine.Atlas(atlasText, loader);
      var skeletonJson = new spine.SkeletonJson(new spine.AtlasAttachmentLoader(atlas));
      var skeletonData = skeletonJson.readSkeletonData(me.loader.getJSON(this.settings['spineData']));
      this.skeleton = new spine.Skeleton(skeletonData);
      this.stateData = new spine.AnimationStateData(skeletonData); 
      this.state = new spine.AnimationState(this.stateData);
    },

    update: function() {
      this.parent(this);
      this.state.update(me.timer.getTime() - this.time);
      this.state.apply(this.skeleton);
      this.skeleton.updateWorldTransform();
      this.pos.x = this.skeleton.getRootBone().x;
      this.pos.y = this.skeleton.getRootBone().y;

      return true;
    }
  });

  me.Spine.TextureLoader = Object.extend({
    imagePath: null,
    load: function (page, path, a) {
      var texture = me.loader.getImage(this.imagePath);
      page.rendererObject = texture;
      page.width = texture.width;
      page.height = texture.height;
      a.updateUVs(page);
    },
    unload: function (texture) {
      delete texture;
    }
  });

  var isNullOrUndefined = function(object) {
    return object === null || typeof object === 'undefined';
  }
}).call(this);