import Link from 'next/link';
import { ReactNode, AnchorHTMLAttributes } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: ReactNode;
}

const MVLink = ({
    href,
    children,
    ...rest
}: LinkProps) => {
    return (
        <Link
            prefetch={false}
            href={href}
            {...rest}
        >
            {children}
        </Link>
    );
};

export default MVLink; 