type AboutUsTextProps = {
    header: string;
    details: string;
    imageSrc?: string;
};

const AboutUsText: React.FC<AboutUsTextProps> = ({ header, details, imageSrc }) => {
    return (
        <div>
            <div className="bg-sky-500 p-4">
                <div className="font-bold text-white text-2xl">{header}</div>
                <div className="text-white my-1">{details}</div>
                
                {imageSrc ? (
                    <img src={imageSrc} alt="About Us" className="w-full h-auto mt-4" />
                ) : null}  
            </div>
        </div>
    );
};

export default AboutUsText;
