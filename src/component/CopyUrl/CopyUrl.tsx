import React, {useState} from 'react';
import './CopyUrl.css';

type CopyUrlPropsType = {
    url: string;
};

const CopyUrl: React.FC<CopyUrlPropsType> = ({url}) => {
    const [isCopied, setCopied] = useState(false);

    const copyText = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000)
    };

    return (
        <div className="text-center copy-url-wrapper">
            <button className="room-url-copy-btn" onClick={copyText}>
                {isCopied ? 'Kopyalandı!' : 'Kopyalamak için tıklayın!'}
            </button>
            <div className="url-input" onClick={copyText}>
                {url}
            </div>
            <p>
                Bağlanmak için bu bağlantıyı rakibinize gönderin.
            </p>
        </div>
    );
};

export default CopyUrl;