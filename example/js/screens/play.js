game.PlayScreen = me.ScreenObject.extend({
  onResetEvent : function() {
    me.levelDirector.loadLevel('level');
    this.setupInputBindings();
    game.player = new game.SpineBoy();
    me.game.world.addChild(game.player);
    var instructions = new Instructions();
    me.game.world.addChild(instructions);
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

var Instructions = me.Renderable.extend({
  init : function() {
    this.parent(new me.Vector2d(400, 500), 24, 400);
    this.font = new me.Font('Arial', '20px', '#fff');
    this.z = 2;
  },

  draw : function(context) {
    this.font.draw(context, 'Arrow Keys/Touch', this.pos.x, this.pos.y);
  },
})