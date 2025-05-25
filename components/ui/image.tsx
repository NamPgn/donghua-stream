'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

type Props = Omit<ImageProps, 'src' | 'alt'> & {
	src: string;
	fallbackSrc?: string;
	alt: string;
};

const MVImage = ({
	src,
	fallbackSrc,
	alt,
	className,
	onError,
	...rest
}: Props) => {
	const [hasError, setHasError] = useState(false);

	const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		setHasError(true);
		onError?.(e);
	};

	return (
		<Image
			src={hasError ? (fallbackSrc || src) : src}
			alt={alt}
			className={className}
			onError={handleError}
			{...rest}
		/>
	);
};

export default MVImage;