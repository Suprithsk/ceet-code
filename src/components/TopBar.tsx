import { useEffect } from "react";

interface TopBarProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    setDebouncedSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    difficulty: string;
    setDifficulty: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    resetAll: () => void;
    // setSelectedCompanies: React.Dispatch<React.SetStateAction<string[]>>;
    // selectedCompanies: string[];
}
const TopBar = ({
    searchTerm,
    setSearchTerm,
    setDebouncedSearchTerm,
    difficulty,
    setDifficulty,
    setPage,
    resetAll
}: TopBarProps) => {
    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedSearchTerm(searchTerm)
          setPage(1)
        }, 600)
    
        return () => {
          clearTimeout(handler)
        }
      }, [searchTerm, setDebouncedSearchTerm])

    return (
        <div className="my-5 flex justify-between flex-wrap">
            <div className="flex items-center w-full md:w-1/2 space-x-2">
                <input
                    type="text"
                    placeholder="Search for problems"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded"
                />
                <button onClick={resetAll} className="whitespace-nowrap px-4 cursor-pointer py-2 bg-gray-600 text-white rounded transition hover:bg-gray-700">Reset All</button>
            </div>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <label htmlFor="difficultySelect" className="font-medium">
                    Difficulty:
                </label>
                <select
                    id="difficultySelect"
                    className="p-2 border border-gray-400 rounded cursor-pointer focus:outline-none"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
        </div>
    );
};

export default TopBar;
