var change = 'goblin';
game.SpineBoy = me.Spine.Entity.extend({
  init : function() {
    var settings = { atlas : 'goblins_atlas', imagePath : 'goblins_atlas', spineData : 'goblins', name : 'goblins' };
    this.parent(200, 340, settings);
    this.skeleton.setSkinByName('goblingirl');
    this.skeleton.setSlotsToSetupPose();
    this.state.setAnimationByName(0, "walk", true);
    this.setVelocity(5, 0);
    this.z = 2;
    this.jumping = false;
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
    this.parent();
    var moved = false;
    if(me.input.isKeyPressed('left')) {
      this.moveLeft();
      moved = true;
    }
    else if(me.input.isKeyPressed('right')) {
      this.moveRight();
      moved = true;
    }
    else if(me.input.isKeyPressed('move')) {
      if(me.input.mouse.pos.x > me.game.viewport.width / 2) {
        this.moveRight();
      }
      else {
        this.moveLeft();
      }
      moved = true;
    }
    if(me.input.isKeyPressed('change')) {
      this.skeleton.setSkinByName(change);
      this.updateChangeSkin();
      this.skeleton.setSlotsToSetupPose();
      this.state.setAnimationByName(0, "walk", true);
    }
    if(moved) {
      this.updateMovement();
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