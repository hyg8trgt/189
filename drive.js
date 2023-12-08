AFRAME.registerComponent("drive", {
  init: function () {
    var gameStateValue = this.el.getAttribute("game");
    if (gameStateValue == "play") {
      this.driveCar();
    }
  },
  isVelocityActive: function () {
    console.log("hi");
    return Math.random() < 0.25;
  },

  driveCar: function () {
    var multiply = 10;
    var controlwheelrotation = 0;

    //Key Down Events
    window.addEventListener("keydown", function (e) {
      //Camera Movement Control: Rotation & Direction on Right & Left Arrow Keyup
      var controlwheel = document.getElementById("control-wheel");
      if (e.code === "ArrowRight" && controlwheelrotation > -40) {
        controlwheelrotation -= 5;
        controlwheel.setAttribute("rotation", {
          x: 0,
          y: 0,
          z: controlwheelrotation,
        });
      }
      if (e.code === "ArrowLeft" && controlwheelrotation < +40) {
        controlwheelrotation += 5;
        controlwheel.setAttribute("rotation", {
          x: 0,
          y: 0,
          z: controlwheelrotation,
        });
      }
      var camera = document.getElementById("camera");
      var cameraRotation = camera.getAttribute("rotation");
      var cameraPosition = camera.getAttribute("position");
      var cameraMovement = camera.getAttribute("movement-controls");
      camera.setAttribute("movement-controls", {
        speed: cameraMovement.speed + 0.5,
      });
      var cameraDirection = new THREE.Vector3();
      camera.object3D.getWorldDirection(cameraDirection);
      console.log(cameraDirection);
      console.log(cameraMovement.speed);
      if (e.code === "ArrowRight") {
        cameraRotation -= 5;
        camera.setAttribute("rotation", { x: 0, y: cameraRotation, z: 0 });
        camera.setAttribute("movement-controls", {
          speed: cameraMovement.speed + 0.5,
        });
      }
      //Speed Up/Accelerate on Up Arrow Keyup
      if (e.code === "ArrowLeft") {
        cameraRotation += 5;
        camera.setAttribute("rotation", { x: 0, y: cameraRotation, z: 0 });
        camera.setAttribute("movement-controls", {
          speed: cameraMovement.speed + 0.5,
        });
      }
      //Stop/break on Space Keydown
    });

    //Key Up Events
    window.addEventListener("keyup", function (e) {});
  },
});
