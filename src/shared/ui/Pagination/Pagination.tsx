import {memo, useCallback} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IProps {
		page: number;
		totalPages: number;
		onChangePage: (page: number) => void;
}

/**
 * отчет пейдж видется с 1, так что если что кидаем page + 1 (на бэке с 0)
 * не забываем потом из onChangePage "-1" сделать
*/
export const Pagination = memo((props: IProps) => {
		const { page, totalPages, onChangePage } = props;

		const getPagesToShow = useCallback(() => {
				const pages: number[] = [];

				if (page <= 2) {
						for (let i = 1; i <= Math.min(3, totalPages); i++) {
								pages.push(i);
						}
				} else if (page >= totalPages - 1) {
						for (let i = Math.max(1, totalPages - 2); i <= totalPages; i++) {
								pages.push(i);
						}
				} else {
						pages.push(page - 1, page, page + 1);
				}

				return pages;
		}, [page, totalPages]);

		const pages = getPagesToShow();

		return (
				<div className="flex items-center gap-x-2 select-none">
						<button
								onClick={() => onChangePage(page - 1)}
								disabled={page === 1}
								className="p-2 rounded text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/10 transition"
						>
								<ChevronLeft className="w-5 h-5" />
						</button>

						{/* Page numbers */}
						{pages.map((p) => (
								<button
										key={p}
										onClick={() => onChangePage(p)}
										className={`px-3 py-1 rounded border transition font-medium ${
												p === page
														? "bg-primary text-white border-primary"
														: "border-gray-300 text-gray-700 hover:bg-gray-100"
										}`}
								>
										{p}
								</button>
						))}

						<button
								onClick={() => onChangePage(page + 1)}
								disabled={page === totalPages}
								className="p-2 rounded text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/10 transition"
						>
								<ChevronRight className="w-5 h-5" />
						</button>
				</div>
		);
});

Pagination.displayName = "Pagination";
