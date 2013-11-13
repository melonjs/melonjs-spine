var change = 'goblin';
game.SpineBoy = me.Spine.Entity.extend({
  init : function() {
    var settings = {
      atlas : 'goblins_atlas',
      imagePath : 'goblins_atlas',
      spineData : 'goblins',
      name : 'goblins'
    };
    this.parent(200, 340, settings);
    this.anchorPoint = new me.Vector2d(0.5, 1.0);
    this.updateColRectToAnchorPoint();
    this.skeleton.setSkinByName('goblingirl');
    this.skeleton.setSlotsToSetupPose();
    this.state.setAnimationByName(0, "walk", true);
    this.setVelocity(5, 10);
    this.z = 2;
    this.jumping = false;
  },

  draw : function(context) {
    this.parent(context);
    context.strokeStyle = '#f00';
    var collisionBox = this.collisionBox;
    context.strokeRect(collisionBox.left, collisionBox.top, collisionBox.width, collisionBox.height);
  },

  moveLeft : function() {
    this.skeleton.flipX = true;
    this.vel.x -= this.accel.x;
  },

  moveRight : function() {
    this.skeleton.flipX = false;
    this.vel.x += this.accel.x;
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
      this.vel.x = 0;
    }
    if(me.input.isKeyPressed('change')) {
      this.skeleton.setSkinByName(change);
      this.updateChangeSkin();
      this.skeleton.setSlotsToSetupPose();
      this.state.setAnimationByName(0, "walk", true);
    }
    this.updateMovement();
    this.parent();
    if(this.vel.x !== 0 || this.vel.y !== 0) {
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