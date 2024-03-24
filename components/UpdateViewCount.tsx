'use client';

import { useEffect } from 'react';

const UpdateViewCount = (props: any) => {
	const slug = props.slug;

	useEffect(() => {
		fetch('/api/incrementViews', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({"slug": slug}),
		});
	}, [slug]);

	return null;
}

export default UpdateViewCount;