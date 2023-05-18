import Jatekter from "../Jatekter.js";

QUnit.module("játéktér ellenorzés metódusainak tesztelése", function (hooks) {
  let jatekter;
  hooks.before(() => {
    jatekter = new Jatekter();
  });

  QUnit.test("ellenőrzés létezik-e", function (assert) {
    assert.ok((jatekter.ellenorzes, "létezik az ellenorzes metódus"));
  });
  QUnit.test("getVizszintes létezik-e", function (assert) {
    assert.ok((jatekter.getVizszintes, "létezik az ellenorzes metódus"));
  });
  QUnit.test("getFuggoleges létezik-e", function (assert) {
    assert.ok((jatekter.getFuggoleges, "létezik az ellenorzes metódus"));
  });
  QUnit.test("getAtlo létezik-e", function (assert) {
    assert.ok((jatekter.getAtlo, "létezik az ellenorzes metódus"));
  });
});

QUnit.module("játéktér getVizszintes metódus tesztelése", function (hooks) {
  let jatekter;
  hooks.before(() => {
    jatekter = new Jatekter();
  });

  QUnit.test("Üres lista", function (assert) {
    jatekter.lista = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    assert.equal(jatekter.getVizszintes(), "   @   @   @");
  });

  QUnit.test("X győzelem?", function (assert) {
    jatekter.lista = ["X", "X", "X", " ", "O", " ", " ", " ", " "];
    assert.equal(jatekter.getVizszintes(), "XXX@ O @   @");
  });

  QUnit.test("O győzelem?", function (assert) {
    jatekter.lista = ["O", "O", "O", " ", "X", " ", " ", " ", " "];
    assert.equal(jatekter.getVizszintes(), "OOO@ X @   @");
  });

  QUnit.test("Véletlen elrendezés", function (assert) {
    jatekter.lista = ["X", "O", "X", " ", "O", "X", " ", "O", " "];
    assert.equal(jatekter.getVizszintes(), "XOX@ OX@ O @");
  });

  QUnit.test("Minden kivan töltve de nincs nyerés", function (assert) {
    jatekter.lista = ["X", "O", "X", "O", "O", "X", "X", "X", " O"];
    assert.equal(jatekter.getVizszintes(), "XOX@OOX@XX O@");
  });

  QUnit.test("Minden kivan töltve és van nyerés", function (assert) {
    jatekter.lista = ["X", "O", "O", "O", "O", "X", "X", "X", " X"];
    assert.equal(jatekter.getVizszintes(), "XOO@OOX@XX X@");
  });
});

QUnit.module("játéktér getFuggoleges metódus tesztelése", function (hooks) {
  let jatekter;
  hooks.before(() => {
    jatekter = new Jatekter();
  });

  QUnit.test("Üres lista", function (assert) {
    jatekter.lista = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    assert.equal(jatekter.getFuggoleges(), "   @   @   @");
  });

  QUnit.test("X győzelem?", function (assert) {
    jatekter.lista = ["X", " ", " ", "X", "O", " ", "X", " ", " "];
    assert.equal(jatekter.getFuggoleges(), 	
    "XXX@ O @   @");
  });

  QUnit.test("O győzelem?", function (assert) {
    jatekter.lista = ["O", " ", " ", "O", "X", " ", "O", " ", " "];
    assert.equal(jatekter.getFuggoleges(), "OOO@ X @   @");
  });

  QUnit.test("Véletlen elrendezés", function (assert) {
    jatekter.lista = ["X", "O", "X", "X", "O", "X", " ", " ", " "];
    assert.equal(jatekter.getFuggoleges(), "XX @OO @XX @");
  });

  QUnit.test("Minden ki van töltve, de nincs nyerés", function (assert) {
    jatekter.lista = ["X", "O", "X", "O", "O", "X", "X", " ", "O"];
    assert.equal(jatekter.getFuggoleges(), "XOX@OO @XXO@");
  });

  QUnit.test("Minden ki van töltve, és van nyerés", function (assert) {
    jatekter.lista = ["X", "O", "O", "O", "O", "X", "X", " ", "X"];
    assert.equal(jatekter.getFuggoleges(), 	
    "XOX@OO @OXX@");
  });
});

QUnit.module("játéktér getAtlo metódus tesztelése", function (hooks) {
  let jatekter;
  hooks.before(() => {
    jatekter = new Jatekter();
  });

  QUnit.test("Üres lista", function (assert) {
    jatekter.lista = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    assert.equal(jatekter.getAtlo(), 	
    "   @   ");
  });

  QUnit.test("X győzelem?", function (assert) {
    jatekter.lista = ["X", " ", " ", " ", "O", " ", " ", " ", "X"];
    assert.equal(jatekter.getAtlo(), "XOX@ O ");
  });

  QUnit.test("O győzelem?", function (assert) {
    jatekter.lista = ["O", " ", " ", " ", "X", " ", " ", " ", "O"];
    assert.equal(jatekter.getAtlo(), "OXO@ X ");
  });

  QUnit.test("Véletlen elrendezés", function (assert) {
    jatekter.lista = ["X", "O", "X", " ", "O", "X", " ", "O", " "];
    assert.equal(jatekter.getAtlo(), "XO @XO ");
  });

  QUnit.test("Minden ki van töltve, de nincs nyerés", function (assert) {
    jatekter.lista = ["X", "O", "X", "O", "O", "X", "X", "X", "O"];
    assert.equal(jatekter.getAtlo(), "XOO@XOX");
  });

  QUnit.test("Minden ki van töltve, és van nyerés", function (assert) {
    jatekter.lista = ["X", "O", "O", "O", "O", "X", "X", "X", "X"];
    assert.equal(jatekter.getAtlo(), "  X@   ");
  });

  QUnit.test(
    "Az utolsó oszlopban és a következő sor elején van 2 elem",
    function (assert) {
      jatekter.lista = [" ", " ", " ", " ", " ", " ", " ", " ", "X"];
      assert.equal(jatekter.getAtlo(), "X  @ OX@XO X");
    }
  );
});
