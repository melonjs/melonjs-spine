game.PlayScreen = me.ScreenObject.extend({
  /**  
   *  action to perform on state change
   */
  onResetEvent: function() {  
    me.levelDirector.loadLevel('level');
    var p = new me.Spine.Entity(0, 0, { atlas:'spineboy_atlas', imagePath: 'spineboy_atlas', spineData: 'spineboy' });
    p.time = me.timer.getTime();
    p.stateData.setMixByName("walk", "jump", 0.2);
    p.stateData.setMixByName("jump", "walk", 0.4);
    p.state.setAnimationByName("walk", true);
  },
  
  
  /**  
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    ; // TODO
  }
});
