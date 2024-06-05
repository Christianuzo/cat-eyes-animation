// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set background color to white
renderer.setClearColor(0xffffff, 1);

// Lighting
const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

// Create a material for the eyes
const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Black eyes

// Function to create an eye
function createEye() {
    const eyeGroup = new THREE.Group();
    const eyeGeometry = new THREE.SphereGeometry(1, 32, 32);
    const eyeball = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeball.scale.set(1.5, 1, 1); // Stretch the sphere to make it elliptical

    // Pupil
    const pupilGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Larger pupil
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White pupils
    const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupil.position.z = 0.8;

    eyeGroup.add(eyeball);
    eyeGroup.add(pupil);
    return { eyeGroup, pupil };
}

// Create two eyes
const leftEye = createEye();
const rightEye = createEye();

leftEye.eyeGroup.position.x = -2;
rightEye.eyeGroup.position.x = 2;

scene.add(leftEye.eyeGroup);
scene.add(rightEye.eyeGroup);

camera.position.z = 5;

// Function to update pupil position based on cursor
function updatePupilPosition(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    [leftEye.pupil, rightEye.pupil].forEach(pupil => {
        pupil.position.x = mouseX * 0.5;
        pupil.position.y = mouseY * 0.5;
    });
}

// Blink interval
let isBlinking = false;
function blink() {
    if (isBlinking) return;
    isBlinking = true;
    [leftEye.pupil, rightEye.pupil].forEach(pupil => pupil.visible = false);
    setTimeout(() => {
        [leftEye.pupil, rightEye.pupil].forEach(pupil => pupil.visible = true);
        isBlinking = false;
    }, 200);
}
setInterval(blink, 3000); // Blinks every 3 seconds

// Automatic side-to-side look
let lookDirection = 1;
function lookAround() {
    const lookAmount = 0.1;
    [leftEye.pupil, rightEye.pupil].forEach(pupil => {
        pupil.position.x += lookDirection * lookAmount;
    });
    if (leftEye.pupil.position.x > 0.5 || leftEye.pupil.position.x < -0.5) {
        lookDirection *= -1;
    }
}
setInterval(lookAround, 2000); // Looks around every 2 seconds

// Event listener for mouse movement
window.addEventListener('mousemove', updatePupilPosition);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
