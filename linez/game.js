class Game extends World{
    constructor() {
        super();
        this.stage = new createjs.Stage('main');
    }
    
    refresh() {
        super.refresh();
        this.stage.update();
    }
    
    drawRectangle(x, y, length, width, color) {
        var rect = new createjs.Shape();
        rect.graphics.beginFill(color).drawRect(x, y, width, length);
        this.stage.addChild(rect);
    }
}