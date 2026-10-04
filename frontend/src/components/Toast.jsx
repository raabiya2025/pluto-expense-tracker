import { useEffect } from "react";

function Toast({ message, onClose }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast">

            <div className="toast-content">
                <span className="toast-icon">✓</span>
                <span>{message}</span>
            </div>

            <div className="toast-progress"></div>

        </div>
    );
}

export default Toast;