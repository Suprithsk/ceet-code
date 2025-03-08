interface CompaniesModalProps {
    show: boolean;
    onClose: () => void;
    companies: string[];
}

const CompaniesModal = ({ show, onClose, companies }: CompaniesModalProps) => {
    if (!show) return null;
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 backdrop-blur-md transition-all duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-xl shadow-xl relative max-w-lg w-11/12 max-h-[80vh] overflow-y-auto transform transition-all duration-300 border border-gray-100"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Companies</h2>
                <p className="text-gray-500 text-sm mb-4">This question has been asked by the following companies</p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {companies.map((company) => (
                        <div
                            key={company}
                            className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                        >
                            <h3 className="text-gray-700 font-medium">{company}</h3>
                        </div>
                    ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompaniesModal;