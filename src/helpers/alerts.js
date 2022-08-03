import Swal from "sweetalert2";

export function fireAlert(message) {
    Swal.fire({
        title: message,
        icon: "info",
        toast: true,
        position: "top",
    });
}
