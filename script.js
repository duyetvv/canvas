window.game = {
  timeperframe: 60,
  vx: 10,
  vy: 8
};

// ---------------------------------------------
(function (game) {

  function Sprite (image, start, end, width, height, spritePerRow) {
    this.image        = image;
    this.start        = start;
    this.end          = end;
    this.width        = width;
    this.height       = height;
    this.spritePerRow = spritePerRow;
    this.main();
  }

  Sprite.prototype = {

    props: {
      x   : 0,
      y   : 0,
      curr: this.start,
      isMove: false
    },

    main: function () {
      console.log(this.image);
    },

    init: function () {
      this.props.x = this.props.curr % this.spritePerRow;
      this.props.y = this.props.curr / this.spritePerRow;
    },

    update: function () {
      if (!this.props.isMove) {
        return;
      }

      this.props.curr ++;
      (this.props.curr > this.end) && (this.props.curr = this.start);

    },

    move: function () {
      this.props.isMove = true;
    },

    stop: function () {
      this.props.isMove = false;
    }
  }

  game.Sprite = Sprite;

}(window.game));

// -----------------------------------------------------

(function (game){

  function GameObject (image, spriteStart, spriteEnd, spriteWidth, spriteHeight, spritePerRow, posX, posY) {
    this.spriteStart  = spriteStart;
    this.spriteEnd    = spriteEnd,
    this.spriteWidth  = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.spritePerRow = spritePerRow;
    this.image        = image;
  }

  GameObject.prototype = {

    props: {
      x: this.posX,
      y: this.posY,
      vx: 0,
      vy: 0,
      isMove: false
    },

    init: function () {
      this.sprite = new game.Sprite(this.image, this.spriteStart, this.spriteEnd, this.spriteWidth, this.spriteHeight, this.spritePerRow);
    },

    update: function () {
      if (!this.props.isMove) { return; }

      this.props.x += this.props.vx;
      this.props.y += this.props.vy;
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

  game.GameObject = GameObject;
}(window.game));


(function () {

  function GamePlay () {

  }

  GamePlay.prototype = {

  }

}());
