import Phaser from "phaser"

// Damit erstellen wir die Player-Klasse, die ein Sprite erweitert.
export default class Player extends Phaser.Physics.Arcade.Sprite {
  // Wenn wir das an dieser Stelle definieren, dann kann `speed` in allen
  // Methoden der Klasse verwendet werden. Das ist praktisch um die Geschwindigkeit
  // für den Spieler einheitlich zu steuern.
  speed = 100

  // Das müssen wir nicht im Detail verstehen, Phaser braucht hier einfach die Szene
  // zu welcher das Spielobjekt hinzugefügt wird. Mit `x` und `y` geben wir die Position
  // an, wo das Objekt gezeichnet werden soll.
  constructor(scene, x, y) {
    // Das wird auch von Phaser so verlangt. Hier reichen wir eigentlich alles einfach
    // weiter, wir müssen aber noch sagen welches `Spritesheet` wir verwenden möchten.
    super(scene, x, y, "player")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this, false)

    // Damit sagen wir das ein Spieler das Spielfeld nicht verlassen kann.
    this.body.collideWorldBounds = true

    // Setzt den Ankerpunkt wo der Spieler gezeichnet wird auf dessen Mitte.
    this.setOrigin(0.5, 0.5)

    // Das setzt die Grösse der Hitbox des Spielers. So können wir eine leichte
    // Überschneidung der Grafiken haben, wir können so zu sagen näher an die anderen
    // Objekte laufen, und es ist auch einfacher Lücken von nur einem `Tile` zu treffen
    // wenn wir nicht die ganze Breite beanspruchen.
    this.setSize(24, 24, false)

    // Damit steuern wir wie fest die Hitbox verschoben wird.
    this.setOffset(4, 8)

    // In dieser Methode werden die Steuerungen geladen.
    this.setControls()
  }

  // Lädt die Steuerung für den Spieler damit wir die Pfeiltasten verwenden können.
  setControls() {
    this.cursor = this.scene.input.keyboard.createCursorKeys()
  }

  update() {
    // Wir holen uns aus dem Cursor die Dinge auf die wir reagieren möchten, also nur
    // die Pfeile.
    const { left, right, up, down } = this.cursor

    // Hier setzen wir einen Schalter. Wenn der war ist, hat der Spieler keine
    // Bewegung gehabt in diesem Frame, sobald wir aber Bewegung haben, legen wir
    // den Schalter auf `false`
    let isIdle = true

    // Wir setzen immer am Anfang eines Frame die Geschwindigkeit auf 0, damit ist dann
    // auch diagonales laufen möglich.
    this.body.setVelocityX(0)
    this.body.setVelocityY(0)

    // Wenn links gedrückt wird
    if (left.isDown) {
      // Links wirde gedrückt, wir setzen die Geschwindigkeit des Spielers, dann
      // kümmert sich die Physik-Engine von Phaser um die Verschiebung und Kollisionen.
      this.body.setVelocityX(-this.speed)

      // Wenn der Spieler ruhig war, dann lasse die Animation "player_left" starten
      if (isIdle) this.anims.play("player_left", true)

      // Da wir uns bewegen, ist der Spieler nicht mehr ruhig.
      isIdle = false
    }

    // Gleich wie Links-Laufen
    if (right.isDown) {
      this.body.setVelocityX(this.speed)
      if (isIdle) this.anims.play("player_right", true)
      isIdle = false
    }

    // Falls der Spieler nach all den Checks noch ruhig ist, spiele die "player_idle" Animation ab.
    if (isIdle) {
      this.anims.play("player_idle", true)
    }
  }
}
