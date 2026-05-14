// LOST & FOUND
// PS2 DEAD MALL VERSION

let scene, camera, renderer;

const textureLoader =
    new THREE.TextureLoader();

// =====================================
// FLOOR TEXTURE
// =====================================

const floorTexture =
    textureLoader.load(
        "https://threejs.org/examples/textures/floors/FloorsCheckerboard_S_Diffuse.jpg"
    );

floorTexture.wrapS =
    THREE.RepeatWrapping;

floorTexture.wrapT =
    THREE.RepeatWrapping;

floorTexture.repeat.set(
    40,
    40
);

floorTexture.magFilter =
    THREE.NearestFilter;

floorTexture.minFilter =
    THREE.NearestFilter;

// =====================================
// CEILING TILE TEXTURE
// =====================================

const ceilingTexture =
    textureLoader.load(
        "https://threejs.org/examples/textures/uv_grid_opengl.jpg"
    );

ceilingTexture.wrapS =
    THREE.RepeatWrapping;

ceilingTexture.wrapT =
    THREE.RepeatWrapping;

ceilingTexture.repeat.set(
    12,
    12
);

ceilingTexture.magFilter =
    THREE.NearestFilter;

ceilingTexture.minFilter =
    THREE.NearestFilter;

// =====================================
// SCENE
// =====================================

scene = new THREE.Scene();

scene.background =
    new THREE.Color(0x050505);

scene.fog =
    new THREE.Fog(
        0x050505,
        4,
        45
    );

// =====================================
// CAMERA
// =====================================

camera =
    new THREE.PerspectiveCamera(
        75,
        window.innerWidth /
        window.innerHeight,
        0.1,
        1000
    );

// =====================================
// RENDERER
// =====================================

renderer =
    new THREE.WebGLRenderer({
        antialias: false
    });

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(0.6);

document.body.appendChild(
    renderer.domElement
);

// =====================================
// PLAYER START
// =====================================

camera.position.set(
    0,
    2,
    15
);

// =====================================
// LIGHTING
// =====================================

const ambientLight =
    new THREE.AmbientLight(
        0xbbbba5,
        0.05
    );

scene.add(ambientLight);

const mallLights = [];

function createMallLight(
    x,
    y,
    z
) {

    const light =
        new THREE.PointLight(
            0xd6d1b8,
            0.45,
18            
        );

    light.position.set(
        x,
        y,
        z
    );

    scene.add(light);

    mallLights.push(light);

    // LIGHT FIXTURE

    const fixture =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                4,
                0.2,
                1
            ),

            new THREE.MeshStandardMaterial({
                color: 0x888888,
                emissive: 0x444444
            })
        );

    fixture.position.set(
        x,
        y + 0.3,
        z
    );

    scene.add(fixture);
}

// =====================================
// MAIN HALLWAY LIGHTS
// =====================================

createMallLight(0, 7, 15);
createMallLight(0, 7, 0);
createMallLight(0, 7, -15);
createMallLight(0, 7, -30);
createMallLight(0, 7, -45);
createMallLight(0, 7, -60);
createMallLight(0, 7, -75);
createMallLight(0, 7, -90);
createMallLight(0, 7, -105);
createMallLight(0, 7, -120);

// STORE LIGHTS

createMallLight(-14, 6, -10);
createMallLight(14, 6, -10);

createMallLight(-14, 6, -45);
createMallLight(14, 6, -45);

// =====================================
// RETRO PINK LIGHT
// =====================================

const pinkLight =
    new THREE.PointLight(
        0xff4477,
        0.6,
        25
    );

pinkLight.position.set(
    -14,
    5,
    -20
);

scene.add(pinkLight);

// =====================================
// FLOOR
// =====================================

const floor =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            220,
            220
        ),

        new THREE.MeshStandardMaterial({

            map: floorTexture,

            color: 0x5e5852,

            roughness: 1
        })
    );

floor.rotation.x =
    -Math.PI / 2;

scene.add(floor);

// =====================================
// CEILING
// =====================================

const hallwayCeiling =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            40,
            220
        ),

        new THREE.MeshStandardMaterial({

            map: ceilingTexture,

            color: 0x0d0d0d,

            roughness: 1,

            side:
                THREE.DoubleSide
        })
    );

hallwayCeiling.rotation.x =
    Math.PI / 2;

hallwayCeiling.position.set(
    0,
    8,
    -50
);

scene.add(hallwayCeiling);

// =====================================
// COLLIDERS
// =====================================

const colliders = [];

function createWall(
    x,
    y,
    z,
    w,
    h,
    d
) {

    const wall =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                w,
                h,
                d
            ),

            new THREE.MeshStandardMaterial({

                color: 0x3a312c,

                roughness: 1,

                emissive: 0x16110f
            })
        );

    wall.position.set(
        x,
        y,
        z
    );

    scene.add(wall);

    const box =
        new THREE.Box3()
        .setFromObject(wall);

    colliders.push(box);

    return wall;
}

// =====================================
// MAIN HALLWAY
// =====================================

createWall(
    0,
    4,
    -110,
    40,
    8,
    1
);

createWall(
    -20,
    4,
    -10,
    1,
    8,
    220
);

createWall(
    20,
    4,
    -10,
    1,
    8,
    220
);

// =====================================
// STORE SYSTEM
// =====================================

function createStoreArea(
    side,
    z,
    color
) {

    const x =
        side === "left"
        ? -14
        : 14;

    // BACK WALL

    createWall(
        x,
        3,
        z - 10,
        18,
        6,
        1
    );

    // SIDE WALLS

    createWall(
        x - 9,
        3,
        z,
        1,
        6,
        20
    );

    createWall(
        x + 9,
        3,
        z,
        1,
        6,
        20
    );

    // FRONT WALLS

    createWall(
        x - 6,
        3,
        z + 10,
        6,
        6,
        1
    );

    createWall(
        x + 6,
        3,
        z + 10,
        6,
        6,
        1
    );

    // STORE FLOOR

    const storeFloor =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                18,
                20
            ),

            new THREE.MeshStandardMaterial({

                map: floorTexture,

                color: color,

                roughness: 1
            })
        );

    storeFloor.rotation.x =
        -Math.PI / 2;

    storeFloor.position.set(
        x,
        0.01,
        z
    );

    scene.add(storeFloor);

    // STORE CEILING

    const ceiling =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                18,
                20
            ),

            new THREE.MeshStandardMaterial({

                map: ceilingTexture,

                color: 0x5e5a55,

                roughness: 1,

                side:
                    THREE.DoubleSide
            })
        );

    ceiling.rotation.x =
        Math.PI / 2;

    ceiling.position.set(
        x,
        6,
        z
    );

    scene.add(ceiling);
}

// =====================================
// STORES
// =====================================

createStoreArea(
    "left",
    -10,
    0x8f877d
);

createStoreArea(
    "right",
    -10,
    0x7c6f67
);

createStoreArea(
    "left",
    -45,
    0x6f7767
);

createStoreArea(
    "right",
    -45,
    0x8f8b67
);

// =====================================
// ARCADE MACHINES
// =====================================

function arcadeMachine(
    x,
    z,
    color
) {

    const machine =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                1.5,
                3,
                1.5
            ),

            new THREE.MeshStandardMaterial({
                color: 0x080808
            })
        );

    machine.position.set(
        x,
        1.5,
        z
    );

    scene.add(machine);

    const screen =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                1,
                1,
                0.1
            ),

            new THREE.MeshStandardMaterial({

                color: color,

                emissive: color,

                emissiveIntensity: 0.25
            })
        );

    screen.position.set(
        x,
        2,
        z + 0.76
    );

    scene.add(screen);
}

for (let i = 0; i < 6; i++) {

    arcadeMachine(
        -17,
        -5 - (i * 2.5),
        0x00cccc
    );

    arcadeMachine(
        -11,
        -5 - (i * 2.5),
        0xaa00aa
    );
}

// =====================================
// MANNEQUINS
// =====================================

function mannequin(
    x,
    z
) {

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                1,
                3,
                1
            ),

            new THREE.MeshStandardMaterial({
                color: 0xbcbcbc
            })
        );

    body.position.set(
        x,
        1.5,
        z
    );

    scene.add(body);

    const head =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.45,
                8,
                8
            ),

            new THREE.MeshStandardMaterial({
                color: 0xd8d8d8
            })
        );

    head.position.set(
        x,
        3.5,
        z
    );

    scene.add(head);
}

mannequin(11, -6);
mannequin(15, -10);
mannequin(12, -15);

// =====================================
// TOY STORE SHELVES
// =====================================

function toyShelf(
    x,
    z
) {

    const shelf =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                6,
                4,
                1.5
            ),

            new THREE.MeshStandardMaterial({
                color: 0x332255
            })
        );

    shelf.position.set(
        x,
        2,
        z
    );

    scene.add(shelf);
}

toyShelf(-14, -40);
toyShelf(-14, -47);

// =====================================
// PLAYPLACE TUBES
// =====================================

function playTube(
    x,
    z,
    color
) {

    const tube =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                2,
                2,
                6,
                8,
                1,
                true
            ),

            new THREE.MeshStandardMaterial({

                color: color,

                side:
                    THREE.DoubleSide
            })
        );

    tube.rotation.z =
        Math.PI / 2;

    tube.position.set(
        x,
        2,
        z
    );

    scene.add(tube);
}

playTube(
    14,
    -40,
    0x550000
);

playTube(
    14,
    -48,
    0x003300
);

// =====================================
// BENCHES
// =====================================

function bench(
    x,
    z
) {

    const bench =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                4,
                1,
                1.5
            ),

            new THREE.MeshStandardMaterial({
                color: 0x1a1a1a
            })
        );

    bench.position.set(
        x,
        0.5,
        z
    );

    scene.add(bench);
}

bench(-5, -20);
bench(5, -35);
bench(-5, -60);

// =====================================
// PILLARS
// =====================================

function pillar(
    x,
    z
) {

    const pillar =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                1,
                1,
                8,
                12
            ),

            new THREE.MeshStandardMaterial({

                color: 0x7a746d,

                roughness: 1
            })
        );

    pillar.position.set(
        x,
        4,
        z
    );

    scene.add(pillar);
}

pillar(-10, -25);
pillar(10, -25);

pillar(-10, -70);
pillar(10, -70);

// =====================================
// SECURITY ROOM
// =====================================

const securityRoom =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            14,
            6,
            14
        ),

        new THREE.MeshStandardMaterial({

            color: 0x2d2622,

            roughness: 1
        })
    );

securityRoom.position.set(
    0,
    3,
    30
);

scene.add(securityRoom);

// =====================================
// VHS TAPES
// =====================================

const tapes = [];

function createTape(
    x,
    y,
    z,
    clue
) {

    const tape =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.7,
                0.3,
                1
            ),

            new THREE.MeshStandardMaterial({
                color: 0x000000
            })
        );

    tape.position.set(
        x,
        y,
        z
    );

    tape.userData.clue = clue;

    scene.add(tape);

    tapes.push(tape);
}

createTape(
    -14,
    1,
    -10,
    "ARCADE STORAGE CODE: 4132"
);

createTape(
    14,
    1,
    -10,
    "THE JANITOR WATCHES."
);

createTape(
    -14,
    1,
    -45,
    "HE NEVER LEFT."
);

createTape(
    14,
    1,
    -45,
    "THE EXIT IS OPEN."
);

// =====================================
// JANITOR
// =====================================

const janitor =
    new THREE.Group();

const torso =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            1.2,
            5,
            1
        ),

        new THREE.MeshStandardMaterial({
            color: 0x050505
        })
    );

janitor.add(torso);

const face =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            0.55,
            8,
            8
        ),

        new THREE.MeshStandardMaterial({
            color: 0xcfcfcf
        })
    );

face.position.y = 3;

janitor.add(face);

janitor.position.set(
    0,
    2,
    -90
);

janitor.visible = false;

scene.add(janitor);

// =====================================
// PLAYER
// =====================================

const keys = {};

let yaw = 0;

let pitch = 0;

let stamina = 100;

const inventory = [];

// =====================================
// POINTER LOCK
// =====================================

document.body.addEventListener(
    "click",
    () => {

        document.body
        .requestPointerLock();
    }
);

document.addEventListener(
    "mousemove",
    e => {

        if (
            document.pointerLockElement ===
            document.body
        ) {

            yaw -=
                e.movementX * 0.002;

            pitch -=
                e.movementY * 0.002;

            pitch = Math.max(
                -Math.PI / 2,

                Math.min(
                    Math.PI / 2,
                    pitch
                )
            );

            camera.rotation.order =
                "YXZ";

            camera.rotation.y =
                yaw;

            camera.rotation.x =
                pitch;
        }
    }
);

// =====================================
// INPUT
// =====================================

window.addEventListener(
    "keydown",
    e => {

        keys[e.code] = true;

        if (
            e.code === "KeyE"
        ) {

            interact();
        }

        if (
            e.code === "Space"
        ) {

            document
            .getElementById(
                "tapeScreen"
            )
            .style.display =
                "none";
        }
    }
);

window.addEventListener(
    "keyup",
    e => {

        keys[e.code] = false;
    }
);

// =====================================
// INVENTORY
// =====================================

function updateInventory() {

    document.getElementById(
        "slot1"
    ).innerHTML =
        inventory[0] ||
        "EMPTY";

    document.getElementById(
        "slot2"
    ).innerHTML =
        inventory[1] ||
        "EMPTY";
}

// =====================================
// MOVEMENT
// =====================================

function movement() {

    let speed = 0.12;

    if (
        keys["ShiftLeft"] &&
        stamina > 0
    ) {

        speed = 0.22;

        stamina -= 0.7;
    }

    else {

        stamina += 0.4;
    }

    stamina = Math.max(
        0,
        Math.min(
            100,
            stamina
        )
    );

    document
    .getElementById(
        "staminaBar"
    )
    .style.width =
        stamina + "%";

    const oldPosition =
        camera.position.clone();

    const direction =
        new THREE.Vector3();

    camera.getWorldDirection(
        direction
    );

    direction.y = 0;

    direction.normalize();

    const right =
        new THREE.Vector3();

    right.crossVectors(
        camera.up,
        direction
    ).normalize();

    if (keys["KeyW"]) {

        camera.position.add(
            direction.clone()
            .multiplyScalar(speed)
        );
    }

    if (keys["KeyS"]) {

        camera.position.add(
            direction.clone()
            .multiplyScalar(-speed)
        );
    }

    if (keys["KeyA"]) {

        camera.position.add(
            right.clone()
            .multiplyScalar(speed)
        );
    }

    if (keys["KeyD"]) {

        camera.position.add(
            right.clone()
            .multiplyScalar(-speed)
        );
    }

    const playerBox =
        new THREE.Box3()
        .setFromCenterAndSize(

            camera.position,

            new THREE.Vector3(
                1,
                3,
                1
            )
        );

    for (
        const collider
        of colliders
    ) {

        if (
            playerBox
            .intersectsBox(
                collider
            )
        ) {

            camera.position.copy(
                oldPosition
            );
        }
    }

    camera.position.y = 2;
}

// =====================================
// INTERACTION
// =====================================

function interact() {

    const raycaster =
        new THREE.Raycaster();

    raycaster.setFromCamera(
        new THREE.Vector2(
            0,
            0
        ),
        camera
    );

    const hits =
        raycaster
        .intersectObjects(
            tapes
        );

    if (
        hits.length > 0
    ) {

        const tape =
            hits[0].object;

        if (
            camera.position
            .distanceTo(
                tape.position
            ) < 3
        ) {

            inventory.push(
                "TAPE"
            );

            updateInventory();

            showTape(
                tape.userData
                .clue
            );

            scene.remove(
                tape
            );

            tapes.splice(
                tapes.indexOf(
                    tape
                ),
                1
            );

            flashScreen();
        }
    }
}

// =====================================
// VHS SCREEN
// =====================================

function showTape(text) {

    document
    .getElementById(
        "tapeScreen"
    )
    .style.display =
        "flex";

    document
    .getElementById(
        "tapeText"
    )
    .innerHTML = text;
}

// =====================================
// FLASH
// =====================================

function flashScreen() {

    const flash =
        document
        .getElementById(
            "flash"
        );

    flash.style.opacity =
        "0.8";

    setTimeout(() => {

        flash.style.opacity =
            "0";

    }, 50);
}

// =====================================
// LIGHT FLICKER
// =====================================

function flickerLights() {

    mallLights.forEach(
        light => {

        if (
            Math.random()
            < 0.02
        ) {

            light.intensity =
                0.2 +
                Math.random();
        }

        else {

            light.intensity =
                0.7 +
                Math.random()
                * 0.2;
        }
    });
}

// =====================================
// JANITOR EVENT
// =====================================

let firstSightingTriggered =
    false;

function firstJanitorSighting() {

    if (

        camera.position.z
        < -18 &&

        !firstSightingTriggered
    ) {

        firstSightingTriggered =
            true;

        janitor.visible =
            true;

        janitor.position.set(
            0,
            2,
            -40
        );

        setTimeout(() => {

            janitor.visible =
                false;

        }, 1800);
    }
}

// =====================================
// GAME LOOP
// =====================================

function animate() {

    requestAnimationFrame(
        animate
    );

    movement();

    flickerLights();

    firstJanitorSighting();

    renderer.render(
        scene,
        camera
    );
}

animate();

// =====================================
// RESIZE
// =====================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera
        .updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);