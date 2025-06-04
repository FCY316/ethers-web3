// components/Icon.tsx
import { ReactSVG } from 'react-svg';

interface IconProps {
    src: string;
    className?: string;
    onClick?: Function
    modifySvgElement?: (svg: SVGSVGElement) => void;
}

export default function Icon({ src, className, modifySvgElement, onClick }: IconProps) {
    return (
        <ReactSVG
            onClick={onClick && onClick()}
            src={src}
            className={className}
            beforeInjection={(svg) => {
                svg.removeAttribute('width');
                svg.removeAttribute('height');

                // 如果用户传了 modifySvgElement，就让用户自己处理 svg
                if (modifySvgElement) {
                    modifySvgElement(svg);
                } else {
                    // 默认行为：把所有 path 和 rect 改成 currentColor
                    svg.querySelectorAll('path, rect').forEach((el) => {
                        el.removeAttribute('fill');
                        el.setAttribute('fill', 'currentColor');
                    });
                }
            }}
        />
    );
}