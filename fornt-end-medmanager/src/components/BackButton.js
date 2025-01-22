import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="back-button"
        >
            <ArrowLeft size={20} />
            <span>Wróć</span>
        </button>
    );
};

export default BackButton;