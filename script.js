window.game = {
  tpf: 60,
  vx : 10,
  vy : 8,

  createImage: function(src) {
    var img = new Image();
    img.src = src;
    return img;
  }
};

window.game.entity = {
  coin: {
    image       : window.game.createImage('sprite.png'),
    spriteStart : 0,
    spriteEnd   : 9,
    spriteWidth : 100,
    spriteHeight: 100,
    spritePerRow: 10,
    posX        : 200,
    posY        : 200
  }
};

// ______________________________________________________
//                                                 SPRITE
// ------------------------------------------------------
(function (game) {

  function Sprite (opts) {
    this.image        = opts.image;
    this.start        = opts.start;
    this.end          = opts.end;
    this.spritePerRow = opts.spritePerRow;

  }

  Sprite.prototype = {

    props: {
      x   : 0,
      y   : 0,
      curr: this.start
    },

    init: function () {
      this.props.x = this.props.curr % this.spritePerRow;
      this.props.y = this.props.curr / this.spritePerRow;
    },

    update: function () {

      this.props.curr ++;
      (this.props.curr > this.end) && (this.props.curr = this.start);

      this.init();

      console.log('position ', this.props.x, this.props.y);
    },

    x: function() { return this.props.x; },

    y: function () { return this.props.y; }

  }

  game.Sprite = Sprite;

}(window.game));

// ___________________________________________________
//                                         Game object
  // (function (game){

  //   function GameObject (image, spriteStart, spriteEnd, spriteWidth, spriteHeight, spritePerRow, posX, posY) {
  //     this.spriteStart  = spriteStart;
  //     this.spriteEnd    = spriteEnd,
  //     this.spriteWidth  = spriteWidth;
  //     this.spriteHeight = spriteHeight;
  //     this.spritePerRow = spritePerRow;
  //     this.image        = image;
  //   }

  //   GameObject.prototype = {

  //     props: {
  //       x: this.posX,
  //       y: this.posY,
  //       vx: 0,
  //       vy: 0,
  //       isMove: false
  //     },

  //     init: function () {
  //       this.sprite = new game.Sprite(this.image, this.spriteStart, this.spriteEnd, this.spriteWidth, this.spriteHeight, this.spritePerRow);
  //     },

  //     update: function () {
  //       if (!this.props.isMove) { return; }

  //       this.props.x += this.props.vx;
  //       this.props.y += this.props.vy;
  //     },

  //     moveLeft: function () {
  //       this.props.vx = game.vx;
  //     },

  //     moveRight: function () {
  //       this.props.vx = -game.vx;
  //     },

  //     moveDown: function () {
  //       this.props.vy = game.vy;
  //     },

  //     moveUp: function () {
  //       this.props.vy = -game.vy;
  //     },

  //     move: function () {
  //       this.props.isMove = true;
  //     },

  //     stand: function () {
  //       this.props.isMove = false;
  //       this.props.vx = 0;
  //       this.props.vy = 0;
  //     }
  //   }

  //   game.GameObject = GameObject;
  // }(window.game));

// --------------------------------------------------


// ___________________________________________________
//                                         COIN OBJECT
// ---------------------------------------------------
(function (game){

  function CoinObject (opts, context) {
    this.context      = context;
    this.image        = opts.image;

    this.spriteStart  = opts.spriteStart;
    this.spriteEnd    = opts.spriteEnd,
    this.spriteWidth  = opts.spriteWidth;
    this.spriteHeight = opts.spriteHeight;
    this.spritePerRow = opts.spritePerRow;

    this.posX         = opts.posX;
    this.posY         = opts.posY;

    this.init();
  }

  CoinObject.prototype = {

    props: {
      x: this.posX,
      y: this.posY,
      vx: 0,
      vy: 0,
      isMove: false
    },

    init: function () {
      this.sprite = new game.Sprite({image: this.image, start: this.spriteStart, end: this.spriteEnd, spritePerRow: this.spritePerRow});
    },

    update: function () {
      // if (!this.props.isMove) { return; }

      this.sprite.update();
      this.props.x += this.props.vx;
      this.props.y += this.props.vy;
    },

    render: function () {
      this.context.drawImage(this.image, this.sprite.x(), this.sprite.y(), this.spriteWidth, this.spriteHeight, this.props.x, this.props.y, 100, 100);
    },

    moveLeft: function () {
      this.props.vx = game.vx;
    },

    moveRight: function () {
      this.props.vx = -game.vx;
    },

    moveDown: function () {
      this.props.vy = game.vy;
    },

    moveUp: function () {
      this.props.vy = -game.vy;
    },

    move: function () {
      this.props.isMove = true;
    },

    stand: function () {
      this.props.isMove = false;
      this.props.vx = 0;
      this.props.vy = 0;
    }
  }

  game.CoinObject = CoinObject;
}(window.game));


(function (game) {

  function GamePlay (context) {
    this.context = context;
  }

  GamePlay.prototype = {

    init: function () {
      this.coin = new game.CoinObject(game.entity.coin, this.context);
      console.log(this.coin);
    },

    update: function () {
      this.coin.update();
    },

    render: function () {
      this.coin.render();
    }
  }

  game.GamePlay = GamePlay;

}(window.game));


(function (game) {

  var timestamp = function () {
    return window.performance
          && window.performance.now
          ? window.performance.now()
          : new Date().getTime();
  };

  function Game (canvasDiv) {
    this.canvasDiv = canvasDiv;
    this.main();
  }

  Game.prototype = {

    props: {
      lastTime: 0,
      step: 1000 / game.tpf,
      frameID: null
    },

    main: function () {
      this.initWindow();
      this.init();
      this.run();
    },

    initWindow: function () {
      this.canvas = document.createElement('canvas');

      this.canvasDiv.appendChild(this.canvas);
      this.canvas.setAttribute('width', this.canvasDiv.innerWidth);
      this.canvas.setAttribute('height', this.canvasDiv.innerHeight);

      this.context = this.canvas.getContext('2d');
    },

    init: function () {
      this.gamePlay = new game.GamePlay(this.context);
      this.gamePlay.init();
    },

    update: function (dt) {
      this.gamePlay.update();
    },

    render: function (dt) {
      this.gamePlay.render();
    },

    run: function () {
      var that = this,
          now  = 0,
          dt   = 0,
          last = timestamp(),
          step = 1000 / 60;

      function frame() {
        now = timestamp();
        dt  = dt + Math.min(1000, (now - last));

        while(dt > step) {
          dt = dt - step;
          that.update(step);
        }

        that.render(dt);
        last = now;
        that.props.frameID = requestAnimationFrame(frame);
      }

      that.props.frameID = requestAnimationFrame(frame);
    },

    stop: function () {
      cancelAnimationFrame(this.props.frameID);
    }
  }


  new Game(document.getElementById('canvas-div'));

}(window.game));
