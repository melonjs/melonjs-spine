game.SpineBoy = me.Spine.Entity.extend({
  init : function() {
    var settings = { atlas : 'spineboy_atlas', imagePath : 'spineboy_atlas', spineData : 'spineboy', name : 'spineboy' };
    this.parent(200, 340, settings);
    this.stateData.setMixByName("walk", "jump", 0.2);
    this.stateData.setMixByName("jump", "walk", 0.4);
    this.state.setAnimationByName(0, "walk", true);
    this.setVelocity(5, 0);
    this.z = 2;
  },

  update : function() {
    this.parent();
    var moved = false;
    if(me.input.isKeyPressed('left')) {
      this.skeleton.flipX = true;
      this.vel.x -= this.accel.x;
      moved = true;
    }
    else if(me.input.isKeyPressed('right')) {
      this.skeleton.flipX = false;
      this.vel.x += this.accel.x;
      moved = true;
    }
    if(moved) {
      this.updateMovement();
      return true;
    }
    else {
      return false;
    }
  }
});