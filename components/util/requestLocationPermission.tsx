import Swal from "sweetalert2";

const requestLocationPermission = () => {
  if (navigator.permissions) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "prompt") {
          Swal.fire({
            text: "위치 공유를 허용하시겠습니까?",
            icon: "question",
            toast: true,
            position: "top",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "허용",
            cancelButtonText: "거부",
            timerProgressBar: false,
          }).then((permissionResult) => {
            if (permissionResult.isConfirmed) {
              navigator.geolocation.getCurrentPosition(
                () => {
                  console.log("Location permission granted");
                },
                () => {
                  // Error occurred while requesting location permission
                  console.error("Error requesting location permission");
                }
              );
            } else {
              // User denied location permission
              console.log("User denied location permission");
            }
          });
        }
      })
      .catch((error: any) => {
        // Error occurred while requesting location permission
        console.error("Error requesting location permission:", error);
      });
  } else {
    // User denied location permission
    console.log("User denied location permission");
  }
};

export default requestLocationPermission;
