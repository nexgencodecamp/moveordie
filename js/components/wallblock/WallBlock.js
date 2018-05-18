// Create WallBlock Component
Crafty.c("WallBlock", {
  required: "2D, Canvas, Color, Solid, Collision, SPRITE_WALLBLOCK",
  /* This function will be called when the component is added to an entity */
  init: function() {
    this.bindEvents(this);
    this.attr({w: 32, h: 32, z: 10});
  },

  afterInit: function (props) {
    this.x = props.x;
    this.y = props.y;
  },

  bindEvents: function(that) {
    // No events
  },

  talk: function() {
    console.log("WallBlock ready!");
  }
});
