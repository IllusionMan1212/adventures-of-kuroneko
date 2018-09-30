ig.module(
    'game.entities.cheese'
)
.requires(
    'impact.entity',
    'game.entities.kuroneko',
)
.defines(function() {
    EntityCheese = ig.Entity.extend({
        
        collides: ig.Entity.COLLIDES.LITE,

        size: {x: 32, y: 20},
        offset: {x: 0, y: 12},
        gravityFactor: 0,

        animSheet: new ig.AnimationSheet('media/cheese.png', 32, 32),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('normal', 1, [0]);
        },

        update: function() {
            this.parent();

            this.currentAnim = this.anims.normal;
        },

        collideWith: function(other, axis) {
            this.player = ig.game.getEntitiesByType(EntityKuroneko)[0];
            if (other instanceof EntityKuroneko) {
                this.kill();
                if (this.player.health < 4) {
                    this.player.health += 1;
                }
            }
        },

        kill: function() {
            ig.game.removeEntity(this);
        }
    })
})