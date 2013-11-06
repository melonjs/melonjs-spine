game.SpineBoy = me.Spine.Entity.extend({
  init : function() {
    var settings = { atlas : 'spineboy_atlas', imagePath : 'spineboy_atlas', spineData : 'spineboy', name : 'spineboy' };
    this.parent(200, 340, settings);
    this.stateData.setMixByName("walk", "jump", 0.2);
    this.stateData.setMixByName("jump", "walk", 0.4);
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
    if(me.input.isKeyPressed('jump')) {
      this.state.setAnimationByName(0, "jump", false);
      this.state.addAnimationByName(0, "walk", true, 0);
      this.jumping = true;
    }
    if(moved) {
      this.updateMovement();
      return true;
    }
    else if(this.jumping) {
      return true;
    }
    else {
      return false;
    }
  }
});