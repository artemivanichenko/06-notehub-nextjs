import { fetchNotesById } from "@/lib/api";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import React from "react";
import NotesDetailsClient from "./NotesDetails.client";

interface NotesDetailsProps {
	params: Promise<{ id: string }>;
}

const NotesDetails = async ({ params }: NotesDetailsProps) => {
	const { id } = await params;
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["note", id],
		queryFn: () => fetchNotesById(id),
	});
	return (
		<div>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<NotesDetailsClient />
			</HydrationBoundary>
		</div>
	);
};

export default NotesDetails;
