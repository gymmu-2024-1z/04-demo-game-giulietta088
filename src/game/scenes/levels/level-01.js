import Base2DScene from "../base-2d-scene"

// Hier erweitern wir Base2DScene statt Phaser.Scene.
// Das nimmt uns bereits die ganze Arbeit ab die Welt zu erstellen.
export default class Level01 extends Base2DScene {
  constructor() {
    super({ key: "level-01" })
  }

  preload() {
    // Wie bereits im Level 00, wird hier die zugehörige Karte geladen.
    this.load.tilemapTiledJSON(
      "map-level-01",
      "./assets/maps/map-level-01.json",
    )
  }

  create() {
    // Wir rufen hier die `create`-Methode von `Base2DScene` auf, und teilen mit
    // welche Karte wir erstellen möchten. Das ist die Karte die wir in `preload`
    // geladen haben.
    super.create("map-level-01")
  }
}
