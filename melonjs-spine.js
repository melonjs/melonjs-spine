(function() {
  spine.Bone.yDown = true;
  me.Spine = {};
  me.Spine.Entity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
      if(isNullOrUndefined(settings['atlas']) || isNullOrUndefined(settings['imagePath']) || isNullOrUndefined(settings['spineData'])) {
        throw "Ensure atlas, imagePath and spineData are specified in the settings hash";
      }
      var image = me.loader.getImage(settings['imagePath']);
      this.settings = settings;
      this.time = null;
      this.initSpineObjects();
      this.parent(x, y, this.settings);
      this.anchorPoint.x = 0.5;
      this.anchorPoint.y = 0.5;
      
      this.vertices = Array(8);
      this.isRenderable = true;
    },

    draw: function(context, rect) {
      this.parent(context, rect);
      var drawOrder = this.skeleton.drawOrder;
      for (var i = 0, n = drawOrder.length; i < n; i++) {
        var slot = drawOrder[i];
        var attachment = slot.attachment;
        if (!(attachment instanceof spine.RegionAttachment)) continue;
        var image = attachment.rendererObject.page.rendererObject;

        context.save();
        context.globalAlpha = this.alpha;
        /* var sourceAngle = attachment.rotation;
        var xpos = ~~this.skeleton.getRootBone().x, ypos = ~~this.skeleton.getRootBone().y;

        var w = attachment.regionWidth, h = attachment.regionHeight;
        var angle = this.angle + sourceAngle;

        if ((this.scaleFlag) || (angle!==0)) {
          // translate to the defined anchor point
          context.translate(xpos, ypos);
          // scale
          if (this.scaleFlag) {
            context.scale(this.scale.x, this.scale.y);
          }
          if (angle!==0) {
            context.rotate(angle);
          }

          if (sourceAngle!==0) {
            // swap w and h for rotated source images
            w = this.height, h = this.width;
          }
        }

        context.drawImage(image,
                attachment.regionOffsetX, attachment.regionOffsetY,
                w, h,
                xpos, ypos,
                w, h); */
        
        
        attachment.computeVertices(skeleton.x, skeleton.y, slot.bone, this.vertices);
        var w = this.vertices[2]-this.vertices[0], h = this.vertices[3]-this.vertices[1];
        context.drawImage(image,
          this.vertices[0], this.vertices[1],
          w, h,
          0, 0,
          w, h
        );
        context.restore();
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