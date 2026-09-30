interface IOnaekoIcon {
    src?: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
}

const OnaekoIcon = (props: IOnaekoIcon) => {
    const { src, alt, width = 40, height = 'auto', className } = props;

    return (
        <img
            src={src || '/blocks/onaeko-icon.png'}
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

export default OnaekoIcon;
