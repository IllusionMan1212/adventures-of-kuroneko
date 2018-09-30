ig.module(
    'game.entities.endgame'
)
.requires(
    'impact.entity',
    'game.entities.kuroneko',
    'game.entities.nextlevel',
)
.defines(function() {
    EntityEndgame = EntityNextlevel.extend({
        check: function( other ) {
            if(other instanceof EntityKuroneko){
                this.player = ig.game.getEntitiesByType(EntityKuroneko)[0];
                this.player.currentAnim = this.player.anims.nothing;
                this.player.speed = 0;
                if (ig.game.score == 0 || ig.game.score == 10000) {
                    setTimeout(function() {ig.game.loadLevel( LevelGoodend );}.bind(this), 1000);
                } else {
                    setTimeout(function() {ig.game.loadLevel( LevelBadend );}.bind(this), 1000);
                }
            }
        },
    })
})