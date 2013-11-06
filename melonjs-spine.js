(function() {
  spine.Bone.yDown = true;
  me.Spine = {};
  me.Spine.Entity = me.ObjectEntity.extend({
    init : function(x, y, settings) {
      this.debugged = false;
      if(isNullOrUndefined(settings) || isNullOrUndefined(settings['atlas']) || isNullOrUndefined(settings['imagePath']) || isNullOrUndefined(settings['spineData'])) {
        throw "Ensure atlas, imagePath and spineData are specified in the settings hash";
      }
      this.settings = settings;
      this.time = me.timer.getTime();
      this.initSpineObjects(x, y);
      this.parent(x, y, this.settings);
      this.anchorPoint.x = 0.5;
      this.anchorPoint.y = 0.5;

      this.vertices = Array(8);
      this.isRenderable = true;
    },

    draw : function(context, rect) {
      this.parent(context, rect);
      var drawOrder = this.skeleton.drawOrder;
      for (var i = 0, n = drawOrder.length; i < n; i++) {
        var slot = drawOrder[i];
        var attachment = slot.attachment;
        if (!(attachment instanceof spine.RegionAttachment)) continue;
        attachment.computeVertices(this.skeleton.x, this.skeleton.y, slot.bone, this.vertices);

        var x = this.vertices[2];
        var y = this.vertices[3];

        var w = attachment.rendererObject.width;
        var h = attachment.rendererObject.height;
        var px = attachment.rendererObject.x;
        var py = attachment.rendererObject.y;

        var scaleX = attachment.scaleX;
        var scaleY = attachment.scaleY;
        var angle = -(slot.bone.worldRotation + attachment.rotation) * Math.PI/180;
        if(this.skeleton.flipX) {
          scaleX *= -1;
          angle *= -1;
        }
        if(this.skeleton.flipY) {
          scaleY *= -1;
          angle *= -1;
        }
        context.save();
        context.translate(x, y);
        context.rotate(angle);
        context.scale(scaleX, scaleY);

        context.drawImage(attachment.rendererObject.page.image, px, py, w, h, 0, 0, w, h);
        context.restore();
      }
    },

    initSpineObjects : function(x, y) {
      var atlasText = me.loader.getBinary(this.settings['atlas']);
      var atlas;
      var imagePath = this.settings.imagePath;
      atlas = new spine.Atlas(atlasText, {
        load: function (page, path) {
          (function() {
            var texture = me.loader.getImage(imagePath);
            page.image = texture;
            page.width = texture.width;
            page.height = texture.height;
            atlas.updateUVs(page);
          }).defer();
        }
      });
      var skeletonJson = new spine.SkeletonJson(new spine.AtlasAttachmentLoader(atlas));
      var skeletonData = skeletonJson.readSkeletonData(me.loader.getJSON(this.settings['spineData']));
      this.skeleton = new spine.Skeleton(skeletonData);

      this.skeleton.getRootBone().x = x;
      this.skeleton.getRootBone().y = y;
      this.skeleton.updateWorldTransform();

      this.stateData = new spine.AnimationStateData(skeletonData);
      this.state = new spine.AnimationState(this.stateData);
      for(var i = 0; i < atlas.regions.length; i++) {
        var region = atlas.regions[i];
        if(region.name == this.settings['name']) {
          this.width = region.width;
          this.height = region.height;
          this.settings['spritewidth'] = this.width;
          this.settings['spriteheight'] = this.height;
        }
      }

    },

    update : function() {
      this.parent();
      this.state.update((me.timer.getTime() - this.time) / 1000);
      this.state.apply(this.skeleton);
      this.skeleton.updateWorldTransform();

      if(this.skeleton.getRootBone().x !== this.pos.x) {
        this.skeleton.getRootBone().x = this.pos.x
      }
      if(this.skeleton.getRootBone().y !== this.pos.y) {
        this.skeleton.getRootBone().y = this.pos.y
      }

      this.time = me.timer.getTime();

      return true;
    }
  });

  var isNullOrUndefined = function(object) {
    return object === null || typeof object === 'undefined';
  }
}).call(this);
