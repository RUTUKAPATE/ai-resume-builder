import Skeleton from "@/components/shared/skeleton";
import React from "react";

const Loading = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 mt-20 mx-20">
			<Skeleton />
			<Skeleton />
			<Skeleton />
		</div>
	);
};

export default Loading;
