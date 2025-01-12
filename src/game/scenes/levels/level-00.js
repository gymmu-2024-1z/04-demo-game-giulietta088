import Phaser from "phaser"

/**
 * Erstelle die Szene für das Level00.
 */
export default class Level00 extends Phaser.Scene {
  /**
   * Erstellt eine Instanz einer Phaser.Szene.
   */
  constructor() {
    super({ key: "level-00" })
  }

  preload() {
    // Lade die Karte für das aktuelle Level. Der erste Parameter ist der Name
    // unter dem die Karte gespeichert wird. Der zweite Parameter ist die
    // Kartendatei mit allen Daten drin.
    this.load.tilemapTiledJSON(
      "map-level-00",
      "./assets/maps/map-level-00.json",
    )
  }

  create() {
    // Erstelle die Karte so wie sie in der geladenen Datei angegeben wird.
    const map = this.make.tilemap({ key: "map-level-00" })

    // Bestimme das "Tileset" das für diese Karte verwendet werden soll. Wir
    // haben nur eines, bei uns heisst es immer "tileset". Wir könnten aber
    // mehrere verwenden, um Jahreszeiten zu simulieren, ohne eine neue Karte
    // zeichnen zu müssen.
    const tiles = map.addTilesetImage("tileset")

    // Erstellt den "Background" Layer
    map.createLayer("Background", tiles, 0, 0)

    // Erstellt den "Obstacles" Layer. Hier kann der Spieler nicht durchlaufen.
    map.createLayer("Obstacles", tiles, 0, 0)

    // Erstelle einen Cursor um auf die Eingaben des Spielers zu reagieren.
    this.cursor = this.input.keyboard.createCursorKeys()

    // Erstelle das Spielerobjekt als rotes Rechteck.
    this.player = this.add.rectangle(3 * 32, 3 * 32, 32, 32, 0xff0000)

    // Stelle die Kamera so ein, dass sie dem Spieler folgt.
    this.cameras.main.startFollow(this.player)
  }
  update() {
    // Hole die teile left, right, up und down aus dem Cursor-Objekt
    const { left, right, up, down } = this.cursor

    // Wenn links gedrückt wird...
    if (left.isDown) {
      // Links wurde gedrückt, verschiebe den Spieler einen Pixel nach rechts.
      this.player.x -= 1
    }
    if (right.isDown) {
      this.player.x += 1
    }
    if (up.isDown) {
      this.player.y -= 1
    }
    if (down.isDown) {
      this.player.y += 1
    }
  }
}
