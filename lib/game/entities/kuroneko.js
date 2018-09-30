ig.module(
    'game.entities.kuroneko'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityKuroneko = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.ACTIVE,

        size: {x: 24, y: 28},
        offset: {x: 4, y: 4},
        gravityFactor: 4,
        maxVel: {x: 150, y: 520},
        speed: 400,
        jump_height: 800,
        friction: {x: 500, y: 0},
        health: 4,
        type: ig.Entity.TYPE.A,
        is_dead: false,
        flip: false,
        kuro: true,
        death: new ig.Sound('media/sounds/cat-dead.*'),

        animSheet: new ig.AnimationSheet('media/kuroneko.png', 32, 32),
        jumpSheet: new ig.AnimationSheet('media/kuroneko-jump.png', 46, 32),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.invincibleTimer = new ig.Timer();

            this.addAnim('idle', 1, [0]);
            this.addAnim('walk', 0.13, [2,3,4,5,4,3]);
            this.addAnim('idle_shiro', 1, [6]);
            this.addAnim('walk_shiro', 0.13, [8,9,10,11,10,9]);
            this.addAnim('nothing', 1, [20]);
            this.anims.jump = new ig.Animation(this.jumpSheet, 1, [0]);
            this.anims.jump_shiro = new ig.Animation(this.jumpSheet, 1, [1]);
        },

        update: function() {
            this.parent();

            this.currentAnim.flip.x = this.flip;

            //Handle movement
            if (ig.input.state('right')) {
                this.accel.x = this.speed;
                this.flip = false;
            } else if (ig.input.state('left')) {
                this.accel.x = -this.speed;
                this.flip = true;
            } else {
                this.accel.x = 0;
            }
            if (ig.input.pressed('up') && this.standing) {
                if (this.vel.y == 0) {
                    this.vel.y -= this.jump_height;
                }
            }

            if (this.pos.y > 640 - 32) {
                this.kill();
            }

            //Handle animations
            if (this.kuro) {
                if (this.vel.y != 0 && !this.standing) {
                    this.offset = { x: 10, y: 4 };
                    this.currentAnim = this.anims.jump;
                } else if (this.vel.x != 0 && this.standing) {
                    this.offset = { x: 4, y: 4 };
                    this.currentAnim = this.anims.walk;
                } else {
                    this.offset = { x: 4, y: 4 };
                    this.currentAnim = this.anims.idle;
                }
            } else {
                if (this.vel.y != 0 && !this.standing) {
                    this.offset = { x: 10, y: 4 };
                    this.currentAnim = this.anims.jump_shiro;
                } else if (this.vel.x != 0 && this.standing) {
                    this.offset = { x: 4, y: 4 };
                    this.currentAnim = this.anims.walk_shiro;
                } else {
                    this.offset = { x: 4, y: 4 };
                    this.currentAnim = this.anims.idle_shiro;
                }
            }

            //Change color on different BGs
            if (ig.game.currentLevel == LevelLevel1) {
                if (this.pos.x > 832 && this.pos.x < 1568) {
                    this.kuro = false;
                } else if (this.pos.x > 1568 && this.pos.x < 2368) {
                    this.kuro = true;
                } else if (this.pos.x > 2368) {
                    this.kuro = false;
                } else {
                    this.kuro = true;
                }
            } else if (ig.game.currentLevel == LevelLevel2) {
                if (this.pos.x > 1023 && this.pos.x < 2016) {
                    this.kuro = false;
                } else if (this.pos.x > 2016 && this.pos.x < 3008) {
                    this.kuro = true;
                } else if (this.pos.x > 3008 && this.pos.x < 4000) {
                    this.kuro = false;
                } else if (this.pos.x > 4000 && this.pos.x < 4992) {
                    this.kuro = true;
                } else if (this.pos.x > 4992 && this.pos.x < 5984) {
                    this.kuro = false;
                } else if (this.pos.x > 5984) {
                    this.kuro = true;
                } else {
                    this.kuro = true;
                }
            }
            
        },

        kill: function() {
            this.is_dead = true;
            this.death.play();
            ig.game.removeEntity(this);
            ig.game.score = 0;

            setTimeout(function() {ig.game.loadLevel(LevelGameover)}, 700);
        }

    })
})