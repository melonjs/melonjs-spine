game.PlayScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
    me.levelDirector.loadLevel('level');
    this.setupInputBindings();
    game.player = new game.SpineBoy();
    me.game.world.addChild(game.player);
  },


  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
    me.input.unbindTouch();
    me.input.unbindKey(me.input.KEY.LEFT);
    me.input.unbindKey(me.input.KEY.RIGHT);
    me.input.unbindKey(me.input.KEY.P, 'move');
  },

  setupInputBindings : function() {
    me.input.bindKey(me.input.KEY.LEFT, 'left');
    me.input.bindKey(me.input.KEY.RIGHT, 'right');
    me.input.bindKey(me.input.KEY.P, 'move');
    me.input.bindTouch(me.input.KEY.P);
  }
});
