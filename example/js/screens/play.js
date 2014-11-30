game.PlayScreen = me.ScreenObject.extend({
  onResetEvent : function() {
    me.levelDirector.loadLevel('level');
    this.setupInputBindings();
    game.player = new game.SpineBoy();
    var instructions = new Instructions();

    me.game.world.addChild(game.player);
    me.game.world.addChild(instructions);
  },


  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
    me.input.unbindPointer();
    me.input.unbindKey(me.input.KEY.LEFT);
    me.input.unbindKey(me.input.KEY.RIGHT);
    me.input.unbindKey(me.input.KEY.P);
    me.input.unbindKey(me.input.KEY.SPACE);
  },

  setupInputBindings : function() {
    me.input.bindKey(me.input.KEY.LEFT, 'left');
    me.input.bindKey(me.input.KEY.RIGHT, 'right');
    me.input.bindKey(me.input.KEY.P, 'move');
    me.input.bindKey(me.input.KEY.SPACE, 'change', true);
    me.input.bindPointer(me.input.KEY.P);
  }
});

var Instructions = me.Renderable.extend({
  init : function() {
    this._super(me.Renderable, "init", [300, 500, 24, 400]);
    this.font = new me.Font('Arial', '20px', '#fff');
    this.z = 2;
  },

  draw : function(renderer) {
    this.font.draw(renderer.getContext(), 'Arrow Keys/Touch. Space to change', this.pos.x, this.pos.y);
  },
})