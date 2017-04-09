

    var c = document.getElementById("ex");
    var ctx = c.getContext("2d");
    // billentyuzet esemeny figyelese az ablakra merten
    window.addEventListener('keydown', wormMove, false);
    // eger esemeny figyelese a vasznon
    c.addEventListener('mousemove', wormMouseMove, false);

    // valtozo a kukac kepenek
    var wormImg;
    // valtozo a repulo kepenek
    var planeImg;
    // a repulo kezdo x koordinataja
    var planeX = c.width;
    // a repulo kezdo y koordinataja
    var planeY = 50;
    // a kukac konstans y koordinataja
    var wormY = 460;
    // a kukac kezdo x koordinataja
    var wormX = 300;

    // kukacos kep peldanyositasa
    wormImg = new Image();
    wormImg.src = "worm.png";

    // repulos kep peldanyositasa
    planeImg = new Image();
    planeImg.src = "plane.png";
    // a repulo mereteinek valtozoba mentese
    var planeW = planeImg.width;
    var planeH = planeImg.height;

    // tomb definicio a bombaknak
    var bombList = [];

    // animacio keszitesehez
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    // az animacioert felelos fuggveny meghivasa
    animate();

    function animate() {
        requestAnimationFrame(animate);
        // minden frameben meghivom a draw fuggvenyt
        draw();
    }

    // az egyes kirajzolasokert felelos fuggveny
    function draw() {
        drawPlane();
        drawWorm();
        dropBomb();
        drawBombs();
        removeBombs();
    }

    // repulogep kirajzolasa
    function drawPlane() {
        // a hatter mindenkori ujrarajzolasa
        drawBackground();
        ctx.drawImage(planeImg, planeX, planeY, planeW / 4, planeH / 4);
        // a repulogep mozgasa
        planeX -= 5;
        // amennyiben a repulo elhagyja a vasznat, akkor tegyuk vissza a kezdopoziciojara,
        // igy folyamatosan mozogni fog
        if (planeX < 0 - planeW / 4) {
            planeX = 600;
        }

    }

    // hatter megrajzolasa
    function drawBackground() {
        ctx.fillStyle = "#95e9ff";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = "green";
        ctx.fillRect(0, 500, c.width, 100);
    }

    // kukac kirajzolasa
    function drawWorm() {
        ctx.drawImage(wormImg, wormX, wormY, 40, 40);
    }

    // kukac kirajzolasa
    function wormMove(e) {
        // megnezem, hogy mi az aktualisan lenoymott gomb
        var key = e.which;
        // ha a jobbra nyil vagy balra nyil, akkor a kukacot a leptetem,
        // de ek arra, hogy ne menjen le a vaszonrol
        if (key == 39) {
            if (wormX < c.width - 40) {
                wormX += 20;
            }
        } else if (key == 37) {
            if (wormX > 0) {
                wormX -= 20;
            }
        }
    }

    // eger esemeny lekezelese
    function wormMouseMove(ev) {
        // ugyelni kell arra, hogy az adott HTML elemnek (CANVAS) figyelembe vegyunk a pozicioit is,
        // amikor meghatarozzuk az egerpoziciot, mielott azt atadjuk a kukact x poziciojanak es vizsgaljuk, hogy vasznon belul vagyunk-e
        var rect = c.getBoundingClientRect();
        var mouseX = ev.clientX - rect.left - 20;
        if (mouseX > 0 && mouseX < c.width - 40) {
            wormX = mouseX;
            // uj poziciot adunk meg, tehat szukseges a kukac ujrarajzolasa
            drawWorm();
        }
    }

    // random idokozonkent dobjunk le egy bombat. ehhez figyelembe kell venni a repulo aktualis x  es y poziciojat,
    // hisz innen inditjuk a bombat. ezt a poziciot taruljuk az erre letrahozott tombben
    function dropBomb() {
        if (Math.random() > 0.99) {
            bombList.push({
                x: planeX + 30,
                y: planeY + planeImg.height / 4
            })
        }
    }

    // ha leert a bomba vagy a listankban van mar kovetkezo, akkor vegyuk ki a listarol
    function removeBombs() {
        if (bombList.length > 0 && bombList[0].y > 500) {
            bombList.shift();
        }
    }

    // a listaba gyujtott bombak kirajzolasa
    function drawBombs() {
        for (var i in bombList) {
            var bomb = bombList[i];

            ctx.fillStyle = "#5f5e65";
            ctx.beginPath();
            ctx.arc(bomb.x, bomb.y, 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillRect(bomb.x - 10, bomb.y - 20, 20, 20);
            bomb.y += 6;
        }

    }


