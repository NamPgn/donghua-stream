'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

type Props = Omit<ImageProps, 'src' | 'alt'> & {
	src: string;
	alt: string;
};

const MVImage = ({
	src,
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

	return hasError ? (
		<img
			src={src}
			alt={alt}
			className={className}
			{...rest}
		/>
	) : (
		<Image
			src={src}
			alt={alt}
			className={className}
			onError={handleError}
			{...rest}
		/>
	);

};

export default MVImage;