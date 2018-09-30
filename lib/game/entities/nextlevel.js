ig.module(
    'game.entities.nextlevel'
)
.requires(
    'impact.entity',
    'game.entities.kuroneko',
)
.defines(function() {
    EntityNextlevel = ig.Entity.extend({
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(0, 0, 255, 0.7)',
        size: {x: 16, y: 48},
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        player: null,

        update: function(x, y, settings) {
            this.parent(x, y, settings);
        },

        check: function( other ) {
            if(other instanceof EntityKuroneko){
                this.player = ig.game.getEntitiesByType(EntityKuroneko)[0];
                this.player.currentAnim = this.player.anims.nothing;
                this.player.speed = 0;
                setTimeout(function() {ig.game.loadLevel( LevelLevel2 );}.bind(this), 1000);             
            }
        },
    })
})