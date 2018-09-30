ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'game.entities.kuroneko',
	'game.entities.cheese',
	'game.entities.mouse',
	'game.entities.nextlevel',
	'game.entities.endgame',
	'game.entities.easteregg',

	'game.levels.title',
	'game.levels.level1',
	'game.levels.level2',
	'game.levels.gameover',
	'game.levels.goodend',
	'game.levels.badend',

	'impact.debug.debug',
)
.defines(function(){

MyGame = ig.Game.extend({
	
	gravity: 200,
	player: null,
	boss: null,
	score: 0,
	checkpoint: null,
	
	
	init: function() {
		this.loadLevel( LevelTitle );
		
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.SPACE, 'space');

		this.timer = new ig.Timer(5);
		this.cheesetimer = new ig.Timer(15);
		
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();

		this.player = this.getEntitiesByType(EntityKuroneko)[0];
		this.boss = this.getEntitiesByType(EntityFinalboss)[0];
		if (this.player) {
			this.scrollScreen();
		}	
		
		if (this.currentLevel == LevelTitle) {
			//play title music
			if (ig.input.pressed('space')) {
				this.loadLevel( LevelLevel1 );
			}
		}

		if (this.currentLevel == LevelLevel1) {
			//play game music
			this.checkpoint = LevelLevel1;
		}

		if (this.currentLevel == LevelLevel2) {
			//play game music
			this.checkpoint = LevelLevel2;
		}

		if (this.currentLevel == LevelGameover) {
			//play some sad music
			if (ig.input.pressed('space')) {
				this.loadLevel( this.checkpoint );
			}
		}

		if (this.currentLevel == LevelBadend || this.currentLevel == LevelGoodend) {
			//play ending music
			if (ig.input.pressed('space')) {
				this.loadLevel( LevelTitle );
			}
		}

		var randomX = Math.floor(Math.random() * (5824 - 5184 + 1) ) + 5184;

		if (this.timer.delta() > 5 && this.boss && this.player.pos.x > 5056) {
			this.spawnEntity(EntityMouse, randomX, 448);
			this.timer.reset();
		}

		if (this.cheesetimer.delta() > 15 && this.boss && this.player.pos.x > 5056) {
			this.spawnEntity(EntityCheese, randomX, 586);
			console.log(this.cheesetimer.delta());
			this.cheesetimer.reset();
		}
	},

	loadLevel: function(data) {
		this.parent(data);

		this.currentLevel = data;
	},

	scrollScreen: function() {
		//Camera code
		if(this.player.pos.x > (ig.game.collisionMap.width*ig.game.collisionMap.tilesize-ig.system.width/2))
		{
		  this.screen.x = ig.game.collisionMap.width*ig.game.collisionMap.tilesize-ig.system.width;
		}
		else if (this.player.pos.x < ig.system.width/2) 
		{
		  this.screen.x = 0;
		}
		else 
		{
		  this.screen.x = this.player.pos.x - ig.system.width/2;
		}
	  
		if(this.player.pos.y > (ig.game.collisionMap.height*ig.game.collisionMap.tilesize-ig.system.height/2))
		{
		  this.screen.y = ig.game.collisionMap.height*ig.game.collisionMap.tilesize-ig.system.height;
		}
		else if (this.player.pos.y < ig.system.height/2) 
		{
		  this.screen.y = 0;
		}
		else 
		{
		  this.screen.y = this.player.pos.y - ig.system.height/2;
		}
	  },
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();

		this.player = this.getEntitiesByType(EntityKuroneko)[0];
		this.boss = this.getEntitiesByType(EntityFinalboss)[0];

		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		ctx.font = '30px Ariel'
		

		if (this.currentLevel == LevelLevel1 || this.currentLevel == LevelLevel2) {
			if (this.player) {
				if (this.player.health == 4) {
					ctx.beginPath();
					ctx.lineWidth = "6";
					ctx.strokeStyle = "#808080";
					ctx.rect(60, 30, 96, 16);
					ctx.stroke();
					ctx.fillStyle = '#ac3232';
					ctx.fillRect(63, 33, 90, 10);
				}
				else if (this.player.health == 3) {
					ctx.beginPath();
					ctx.lineWidth = "6";
					ctx.strokeStyle = "#808080";
					ctx.rect(60, 30, 96, 16);
					ctx.stroke();
					ctx.fillStyle = '#ac3232';
					ctx.fillRect(63, 33, 67.5, 10);
				}
				else if (this.player.health == 2) {
					ctx.beginPath();
					ctx.lineWidth = "6";
					ctx.strokeStyle = "#808080";
					ctx.rect(60, 30, 96, 16);
					ctx.stroke();
					ctx.fillStyle = '#ac3232';
					ctx.fillRect(63, 33, 45, 10);
				}
				else if (this.player.health == 1) {
					ctx.beginPath();
					ctx.lineWidth = "6";
					ctx.strokeStyle = "#808080";
					ctx.rect(60, 30, 96, 16);
					ctx.stroke();
					ctx.fillStyle = '#ac3232';
					ctx.fillRect(63, 33, 22.5, 10);
				}

				ctx.fillText(`Score: ${this.score}`, 750, 45);
			}
			ctx.beginPath();
			ctx.lineWidth = "6";
			ctx.strokeStyle = "#808080";
			ctx.rect(60, 30, 96, 16);
			ctx.stroke();
			ctx.fillStyle = '#ac3232';
			ctx.fillRect(63, 33, 0, 10);

			if (this.player.pos.x > 5056 && this.boss) {
				if (this.boss.health == 10) {
					ctx.beginPath();
					ctx.lineWidth = '10';
					ctx.strokeStyle = '#808080';
					ctx.rect(230, 100, 500, 30);
					ctx.stroke();
					ctx.fillStyle = "#3c813f";
					ctx.fillRect(235, 105, 490, 20);
				}
				if (this.boss.health == 9) {
					ctx.beginPath();
					ctx.lineWidth = '10';
					ctx.strokeStyle = '#808080';
					ctx.rect(230, 100, 500, 30);
					ctx.stroke();
					ctx.fillStyle = "#3c813f";
					ctx.fillRect(235, 105, 441, 20);
				}
				if (this.boss.health == 8) {
					ctx.beginPath();
					ctx.lineWidth = '10';
					ctx.strokeStyle = '#808080';
					ctx.rect(230, 100, 500, 30);
					ctx.stroke();
					ctx.fillStyle = "#3c813f";
					ctx.fillRect(235, 105, 392, 20);
				}
				if (this.boss.health == 7) {
					ctx.beginPath();
					ctx.lineWidth = '10';
					ctx.strokeStyle = '#808080';
					ctx.rect(230, 100, 500, 30);
					ctx.stroke();
					ctx.fillStyle = "#3c813f";
					ctx.fillRect(235, 105, 343, 20);
				}
				if (this.boss.health == 6) {
					ctx.beginPath();
					ctx.lineWidth = '10';
					ctx.strokeStyle = '#808080';
					ctx.rect(230, 100, 500, 30);
					ctx.stroke();
					ctx.fillStyle = "#3c813f";
					ctx.fillRect(235, 105, 294, 20);
				}
				if (this.boss.health == 5) {
					ctx.beginPath();
					ctx.lineWidth = '10';
					ctx.strokeStyle = '#808080';
					ctx.rect(230, 100, 500, 30);
					ctx.stroke();
					ctx.fillStyle = "#3c813f";
					ctx.fillRect(235, 105, 245, 20);
				}
				if (this.boss.health == 4) {
					ctx.beginPath();
					ctx.lineWidth = '10';
					ctx.strokeStyle = '#808080';
					ctx.rect(230, 100, 500, 30);
					ctx.stroke();
					ctx.fillStyle = "#3c813f";
					ctx.fillRect(235, 105, 196, 20);
				}
				if (this.boss.health == 3) {
					ctx.beginPath();
					ctx.lineWidth = '10';
					ctx.strokeStyle = '#808080';
					ctx.rect(230, 100, 500, 30);
					ctx.stroke();
					ctx.fillStyle = "#3c813f";
					ctx.fillRect(235, 105, 147, 20);
				}
				if (this.boss.health == 2) {
					ctx.beginPath();
					ctx.lineWidth = '10';
					ctx.strokeStyle = '#808080';
					ctx.rect(230, 100, 500, 30);
					ctx.stroke();
					ctx.fillStyle = "#3c813f";
					ctx.fillRect(235, 105, 98, 20);
				}
				if (this.boss.health == 1) {
					ctx.beginPath();
					ctx.lineWidth = '10';
					ctx.strokeStyle = '#808080';
					ctx.rect(230, 100, 500, 30);
					ctx.stroke();
					ctx.fillStyle = "#3c813f";
					ctx.fillRect(235, 105, 49, 20);
				}
				if (this.boss.health == 0) {
					ctx.beginPath();
					ctx.lineWidth = '10';
					ctx.strokeStyle = '#808080';
					ctx.rect(230, 100, 500, 30);
					ctx.stroke();
				}
			}
		}
	}
});


// Start the Game with 60fps, a resolution of 640x480, scaled
// up by a factor of 1.5
ig.main( '#canvas', MyGame, 60, 640, 480, 1.5 );

});
