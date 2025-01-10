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
  }
}
