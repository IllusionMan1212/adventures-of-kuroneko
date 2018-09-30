ig.module(
    'game.entities.finalboss'
)
.requires(
    'impact.entity',
    'game.entities.kuroneko',
)
.defines(function() {
    EntityFinalboss = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.PASSIVE,

        size: {x: 78, y: 27},
        gravityFactor: 4,
        speed: 400,
        health: 10,
        maxVel: {x: 300, y: 100},
        flip: false,
        player: null,
        is_dead: false,

        animSheet: new ig.AnimationSheet('media/finalboss.png', 78, 27),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('normal', 1, [0]);
            this.addAnim('dead', 1, [1]);
        },

        update: function() {
            this.parent();

            if (!this.is_dead) {
                this.currentAnim = this.anims.normal;
            } else {
                this.currentAnim = this.anims.dead;
                this.currentAnim.flip.y = true;
            }

            this.currentAnim.flip.x = this.flip;
            this.vel.x = this.speed * this.turnAround();
        },
        
        handleMovementTrace: function(res) {
            this.parent(res);

            if (res.collision.x) {
                this.flip = !this.flip;
            }
        },

        collideWith: function(other, axis) {
            this.player = ig.game.getEntitiesByType(EntityKuroneko)[0];
            if (other instanceof EntityKuroneko) {
                if (axis === 'y') {
                    this.receiveDamage(1, this.player);
                    this.player.vel.y = -400;
                } else if (axis === 'x') {
                    this.player.receiveDamage(2, this);
                    if (this.player.pos.x < this.pos.x) {
                        this.player.vel.x = -500;
                    } else {
                        this.player.vel.x = 500;
                    }
                }
            }
        },

        turnAround: function() {
            var x = this.pos.x + (this.flip ? + 5 : this.size.x - 5);	 	 
            var y = this.pos.y + this.size.y + 5;	 	 
            if(!ig.game.collisionMap.getTile(x, y)){	 	 
            this.flip = !this.flip;	 	 
            }	 	 
            return this.flip ? -1 : 1;
        },

        kill: function() {
            this.is_dead = true;
            this.speed = 0;
            ig.game.score += 1000;
            this.collides = ig.Entity.COLLIDES.NEVER;
            setTimeout(function(){ig.game.removeEntity(this);}.bind(this), 500);
        }
    })
})