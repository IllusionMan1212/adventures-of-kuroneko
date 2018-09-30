ig.module(
    'game.entities.easteregg'
)
.requires(
    'impact.entity',
    'game.entities.kuroneko',
    'game.entities.cheese',
)
.defines(function() {
    EntityEasteregg = EntityCheese.extend({

        animSheet: new ig.AnimationSheet('media/easteregg.png', 32, 32),

        collideWith: function(other, axis) {
            this.player = ig.game.getEntitiesByType(EntityKuroneko)[0];
            if (other instanceof EntityKuroneko) {
                this.kill();
                ig.game.score += 10000;
                if (this.player.health < 4) {
                    this.player.health += 4;
                }
            }
        },
    })
})