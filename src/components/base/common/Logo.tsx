interface IOnaekoLogo {
    src?: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
}

const OnaekoLogo = (props: IOnaekoLogo) => {
    const { src, alt, width = 190, height = 40, className } = props;

    return (
        <img
            src={src || '/blocks/onaeko.png'}
            alt={alt || 'Onaeko'}
            width={width}
            height={height}
            className={`object-contain ${className ?? ''}`}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
            }}
        />
    );
};

export default OnaekoLogo;
