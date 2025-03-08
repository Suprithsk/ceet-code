import { Question } from "../types/types";
import { useState, useEffect } from "react";
import CompaniesModal from "./CompaniesModal";
interface QuestionsTableProps {
    paginatedData: Question[]; 
    refreshSolved: () => void;
}
const QuestionsTable = ({paginatedData, refreshSolved}: QuestionsTableProps ) => {
    const [modalQuestionId, setModalQuestionId] = useState<number | null>(null);
    const [solvedQuestions, setSolvedQuestions] = useState<number[]>([]);
    const handleOpenModal = (questionId: number) => {
        setModalQuestionId(questionId);
    };

    const handleCloseModal = () => {
        setModalQuestionId(null);
    };
    useEffect(() => {
        const savedSolvedQuestions = JSON.parse(localStorage.getItem("solvedQuestions") || "[]");
        setSolvedQuestions(savedSolvedQuestions);
    }, []);
    
    const isSolved = (id: number) => {
        return solvedQuestions.includes(id);
    }
    
    const handleSolvedToggle = (id: number) => {
        const updatedSolvedQuestions = isSolved(id)
            ? solvedQuestions.filter(questionId => questionId !== id)
            : [...solvedQuestions, id];
        
        localStorage.setItem("solvedQuestions", JSON.stringify(updatedSolvedQuestions));
        setSolvedQuestions(updatedSolvedQuestions);
        refreshSolved();
    };
    const onQuestionClick = (link: string) => {
        const newWindow = window.open(link, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
    }
    return (
        <div className="rounded-lg mt-4">
            <h1 className="text-xl font-bold mb-4">Questions</h1>
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 border-b border-gray-200">
                            <th className="p-4 w-12"></th>
                            <th className="p-4 text-left font-semibold text-gray-700">
                                Question
                            </th>
                            <th className="p-4 text-left font-semibold text-gray-700">
                                Asked By
                            </th>
                            <th className="p-4 text-left font-semibold text-gray-700">
                                Difficulty
                            </th>
                            <th className="p-4 text-left font-semibold text-gray-700">
                                Acceptance Rate
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((question) => (
                            <>
                            <tr key={question.ID} className="border-b hover:bg-gray-50 transition-colors duration-150">
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        checked={isSolved(question.ID)}
                                        onChange={() => handleSolvedToggle(question.ID)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </td>
                                <td className="p-4">
                                    <a
                                        onClick={()=>onQuestionClick(question["Leetcode Question Link"])}
                                        className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline font-medium transition-colors duration-150"
                                    >
                                        {question.Title}
                                    </a>
                                </td>
                                <td className="p-4 flex gap-2 flex-wrap">
                                    {question.asked_by.slice(0,2).map((company) => (
                                        <span key={company} className="px-2 py-1 bg-gray-200 text-gray-800 text-xs font-semibold rounded-full">
                                            {company}
                                        </span>
                                    ))}
                                    {question.asked_by.length>2 && <span onClick={()=>{
                                        handleOpenModal(question.ID)
                                    }} className="px-2 py-1 cursor-pointer bg-gray-200 text-gray-800 text-xs font-semibold rounded-full">
                                        +{question.asked_by.length - 2}
                                    </span>}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 ${question.Difficulty === 'Easy' ? 'bg-green-100 text-green-800' : question.Difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'} text-xs font-semibold rounded-full`}>
                                        {question.Difficulty}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-600 text-sm font-semibold">
                                    {question.Acceptance}
                                </td>
                            </tr>
                            
                            </>
                        ))}
                        {modalQuestionId !== null && (
                            <CompaniesModal 
                                show={true} 
                                onClose={handleCloseModal} 
                                companies={paginatedData.find(q => q.ID === modalQuestionId)?.asked_by || []}
                            />
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default QuestionsTable;
