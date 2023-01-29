import { Text, Sprite, Player, Cart, Button, SettingsButton, BackgroundWithOpacity, BackButton, SoundButton, QuestionButton, Anchor, Gold, Line, Diamond } from './objects.js'
import { loader } from './managers/assetLoader.js'
import { sounds } from './managers/soundManager.js'
import { game, states } from './main.js'
import { ScoreBoard } from './helpers/misc.js'

class Base {
    constructor(manager, canvas) {
        this.manager = manager;
        var objects = [];
        this.canvas = canvas;
    }
    render(ctx) {
        this.objects.forEach(element => {
            element.render(ctx);
        });
    }
    handleEvent(ev, game) {
        this.objects.forEach((object) => {
            object.handleEvent(ev, game);
        });
    }
    addObject(obj) {
        this.objects.push(obj);
    }

    getCollision(x, y) {
        var save = 0,
            tmp;
        this.objects.forEach(obj => {
            tmp = obj.getCollision(x, y);
            if (tmp > save) {
                save = tmp;
            }
        });

        return save;
    }
}
export class GameState extends Base {
    constructor(manager, canvas) {
        super(manager, canvas);
        const player = new Player(20, 140, 90, 150, loader.getImage("chSprite"));
        const anchor = new Anchor(player.getX() + 36, 260, 18, 30, loader.getImage("anchor"), 0);
        this.objects = [
            new Sprite(0, 290, this.canvas.width, this.canvas.height, loader.getImage("mapBg")),
            new Text(this.canvas.width / 2 - 115, 50, "EPIC MINER GAME", "#000000", "bold 35px Balthazar"),
            new Sprite(0, 0, this.canvas.width, 300, loader.getImage("background")),

            player,
            new Cart(player.getX() + 9, 250, 73, 50, loader.getImage("cart")),
            anchor,
            new Line(player.getX() + 45, 270, 0, 9, 2, "#000000", anchor.getAngle()),

            new Text(50, 50, "TARGET: ", "#000000", "bold 30px Balthazar"),
            new Text(200, 50, "850$", "#000000", "bold 30px Balthazar"),
            new Text(50, 100, "MONEY: ", "#000000", "bold 30px Balthazar"),
            new Button(170, 60, 100, 50, "#333333", "#FFD800", "0 $", "misc", "#4CFF00"),

            new Button(this.canvas.width - 220, 18, 130, 54, "#7F3300", "#FF6A00", "1 : 00", "misc"),
            new QuestionButton(this.canvas.width - 80, 15, 61, 58, loader.getImage("settingsBtn"), "no", manager, this.canvas),

            new Text(this.canvas.width / 2, 50, "DAY: " + states.currentDay, "#000000", "bold 25px Calibri")
        ];
    }
}