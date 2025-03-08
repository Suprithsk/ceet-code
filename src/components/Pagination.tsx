import React, { useState } from "react";




interface PaginationProps {
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
    itemsPerPage: number;
}

const Pagination = ({
    itemsPerPage,
    setPage,
    page,
    setItemsPerPage,
    totalPages,
}: PaginationProps) => {
    const [goToPage, setGoToPage] = useState<string>('');
    const handleGoToPage = (e: string) => {
        setGoToPage(e);
        const pageNumber = Number(e);
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setPage(pageNumber);
        }
    }
    return (
        <div className="flex justify-between items-center flex-wrap mt-4">
            {/* Items Per Page */}
            <div className="flex items-center gap-2 md:mt-0 mt-2">
                <p className="text-sm">Items per page:</p>
                <select
                    className="px-2 border border-gray-300 rounded cursor-pointer"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setPage(1); // Reset to first page when items per page changes
                    }}
                >
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                </select>
            </div>

            <div className="flex flex-wrap gap-2 md:mt-0 mt-2">
                <div className="flex items-center gap-2 md:mt-0 mt-2">
                    <p className="text-sm">Go to page:</p>
                    <input
                        type="number"
                        min={1}
                        value={goToPage}
                        onChange={(e) => handleGoToPage(e.target.value)}
                        placeholder="1"
                        className="px-2 border border-gray-300 rounded w-12 text-center"
                    />
                </div>

                {/* Page Buttons */}
                <div className="flex items-center gap-2 md:mt-0 mt-2">
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded font-medium transition hover:bg-blue-700 disabled:opacity-50"
                        disabled={page === 1}
                        onClick={() => setPage(1)}
                    >
                        First
                    </button>
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded font-medium transition hover:bg-blue-700 disabled:opacity-50"
                        disabled={page === 1}
                        onClick={() => setPage((page) => page - 1)}
                    >
                        Previous
                    </button>
                    <p className="font-medium text-sm">
                        {page} / {totalPages}
                    </p>
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded font-medium transition hover:bg-blue-700 disabled:opacity-50"
                        disabled={page === totalPages}
                        onClick={() => setPage((page) => page + 1)}
                    >
                        Next
                    </button>
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded font-medium transition hover:bg-blue-700 disabled:opacity-50"
                        disabled={page === totalPages}
                        onClick={() => setPage(totalPages)}
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
