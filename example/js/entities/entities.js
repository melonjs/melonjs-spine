var change = 'goblin';
game.SpineBoy = me.Spine.Entity.extend({
  init : function() {
    var settings = {
      atlas : 'goblins_atlas',
      imagePath : 'goblins_atlas',
      spineData : 'goblins',
      name : 'goblins'
    };
    this._super(me.Spine.Entity, "init", [200, 340, settings]);
    this.anchorPoint = new me.Vector2d(0.5, 1.0);
    this.updateColRectToAnchorPoint();
    this.skeleton.setSkinByName('goblingirl');
    this.skeleton.setSlotsToSetupPose();
    this.state.setAnimationByName(0, "walk", true);
    this.body.setVelocity(5, 10);
    this.z = 2;
    this.jumping = false;
  },

  moveLeft : function() {
    this.skeleton.flipX = true;
    this.body.vel.x -= this.body.accel.x;
  },

  moveRight : function() {
    this.skeleton.flipX = false;
    this.body.vel.x += this.body.accel.x;
  },

  onCollision: function (response, other) {
    return true;
  },

  update : function() {
    if(me.input.isKeyPressed('left')) {
      this.moveLeft();
    }
    else if(me.input.isKeyPressed('right')) {
      this.moveRight();
    }
    else if(me.input.isKeyPressed('move')) {
      if(me.input.mouse.pos.x > me.game.viewport.width / 2) {
        this.moveRight();
      }
      else {
        this.moveLeft();
      }
    }
    else {
      this.body.vel.x = 0;
    }
    if(me.input.isKeyPressed('change')) {
      this.skeleton.setSkinByName(change);
      this.updateChangeSkin();
      this.skeleton.setSlotsToSetupPose();
      this.state.setAnimationByName(0, "walk", true);
    }
    this.body.update();

    me.collision.check(this);

    this._super(me.Spine.Entity, "update");
    if(this.body.vel.x !== 0 || this.body.vel.y !== 0) {
      return true;
    }
    else {
      return false;
    }
  },

  updateChangeSkin : function() {
    if(change == 'goblin') {
      change = 'goblingirl';
    }
    else {
      change = 'goblin';
    }
  }
});