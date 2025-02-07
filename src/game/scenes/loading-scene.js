// Damit importieren wir die Game-Engine phaser
import Phaser from "phaser"
import Player from "../gameObjects/player/player"

// Damit erstellen wir die Klasse für die Lade-Szene und übernehmen die Eigenschaften von `Phaser.Szene`.
// Das müssen Sie noch nicht genau verstehen.
export default class LoadingScene extends Phaser.Scene {
  /**
   * Das ist eine spezielle Methode die bei der Instanziierung der Klasse
   * aufgerufen wird. Wir brauchen diese Methode hier, damit wir `Phaser`
   * den Namen/Schlüssel für unsere Szene übergeben können, damit wir die
   * Szene später selber aufrufen können.
   */
  constructor() {
    // Damit wir der Konstuktor von `Phaser.Scene` aufgerufen, und wir übergeben
    // den Schlüssel/Namen.
    super({ key: "loading" })
  }

  /**
   * Mit der `preload`-Methode werden alle Ressourcen wie Grafiken und Musik
   * ins Spiel geladen. Das passiert noch vor der Erstellung der Szene, damit
   * die Ressourcen dann im Game-Loop verwendet werden können.
   */
  preload() {
    // lade das Spritesheet für den Spieler.
    this.load.spritesheet("player", "./assets/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    })
    // Lade das Tileset für die Karten und die Objekte.
    this.load.image("tileset", "./assets/tileset.png")

    // Lade einen Atlas von einem Tileset. Damit können einzelne Kacheln aus
    // einem Tileset definiert werden.
    this.load.atlas(
      "pickups",
      "./assets/tileset.png",
      "./assets/atlas/atlas-pickups.json",
    )
    this.load.atlas(
      "doors",
      "./assets/tileset.png",
      "./assets/atlas/atlas-doors.json",
    )
    // Wir möchten auf das Drücken der Leertaste reagieren können, daher müssen
    // wir das hier registrieren.
    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    )
  }

  /**
   * Auch diese Methode wird von `Phaser` automatisch aufgerufen. In dieser
   * Methode erstellen wir alle Spielobjekte, die in der Szene verwendet werden.
   * Auch diese Methode wird noch vor dem Game-Loop aufgerufen.
   *
   * Meistens wird in dieser Methode die Spielkarte oder ähnliches erstellt. Für
   * die Lade-Szene brauchen wir aber nur einen Text.
   */
  create() {
    // Damit erstellen wir ein Spielobjekt Text. Wir geben die Position in x und y
    // an, und geben den Text der angezeigt werden soll an.
    const text = this.add.text(320, 240, "Press SPACE to start the Game.")

    // Damit setzen wir den Ankerpunkt von dem Textelement auf die Mitte des Elements.
    // Würden wir das nicht machen, ist die obere lenke Ecke der Ankerpunkt, und es wird
    // schwierig den Text zu zentrieren.
    text.setOrigin(0.5, 0.5)

    this.createAnimations()
  }

  /**
   * Diese Methode gehört zum Game-Loop und sollte 60 mal pro Sekunde aufgerufen werden.
   * In dieser Methode berechnen wir die Positionen von den Spielobjekten neu und reagieren
   * auf Eingaben.
   */
  update() {
    // Wenn die Leertaste gedrückt wird, möchten wir darauf reagieren.
    if (this.SPACE.isDown) {
      // Die Leertaste wurde gedrückt, jetzt möchten wir eine neue Szene laden.
      // Das was wir hier übergeben, ist der Schlüssel/Name der Szene, so wie
      // es im Konstruktor angegeben wurde.
      this.scene.start("level-01")
    }
  }
  createAnimations() {
    // Das erstellt uns eine Animation. Hier können wir mehrere Parameter übergeben
    // um die Animation zu definieren.
    this.anims.create({
      key: "player_idle", // Das ist der Name der Animation, den brauchen wir um die Animation abzuspielen
      frames: this.anims.generateFrameNumbers("player", {
        // Das übernimmt das eigentlich erstellen der Animationsframes. Hier geben wir an von welchem Spritesheet die Animation erstellt wird. Das Spritesheet muss natürlich auch in der `preload`-Methode geladen werden.
        start: 1, // Bei welcher Kachel die Animation beginnt.
        end: 1, // Bei welcher Kachel die Animation fertig ist.
      }),
      frameRate: 10, // Mit welcher Geschwindigkeit die Animation abläuft. Spielt hier keine Rolle, denn wir haben nur 1 Frame
      repeat: -1, // Wie oft die Animation wiederholt wird. Mit -1 läuft sie in einer Dauerschleife.
    })

    // Hier wird die Animation für das Rechtslaufen erstellt.
    this.anims.create({
      key: "player_right",
      frames: this.anims.generateFrameNumbers("player", {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    })

    // TODO: Erstellen Sie die restlichen Animationen

    // Hier wird die Animation für das Rechtslaufen erstellt.
    this.anims.create({
      key: "player_left",
      frames: this.anims.generateFrameNumbers("player", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    })
    // Hier wird die Animation für das Rechtslaufen erstellt.
    this.anims.create({
      key: "player_down",
      frames: this.anims.generateFrameNumbers("player", {
        start: 8,
        end: 10,
      }),
      frameRate: 10,
      repeat: -1,
    })
    // Hier wird die Animation für das Rechtslaufen erstellt.
    this.anims.create({
      key: "player_up",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    })
  }
}
