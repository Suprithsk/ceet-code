import questions from "../assets/questions.json";
import { Question } from "../types/types";
interface TotalSolvedProps {
    solvedQuestions: number[];
}
const TotalSolved = ({solvedQuestions}:TotalSolvedProps) => {
    const totalSolved = solvedQuestions.length;
    const easyActual = questions.filter((question: Question) => question.Difficulty === "Easy").length;
    const mediumActual = questions.filter((question: Question) => question.Difficulty === "Medium").length;
    const hardActual = questions.filter((question: Question) => question.Difficulty === "Hard").length;
    const questionFiltered= questions.filter((question: Question) => {
        return solvedQuestions.includes(question.ID)
    })
    console.log('questionFiltered', questionFiltered)
    const easyQuestions = questionFiltered.filter((question: Question) => question.Difficulty === "Easy").length;
    const mediumQuestions = questionFiltered.filter((question: Question) => question.Difficulty === "Medium").length;
    const hardQuestions = questionFiltered.filter((question: Question) => question.Difficulty === "Hard").length;
    return (
        <div className="bg-gray-500 mt-4 p-5 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 border-2 rounded-xl border-gray-400 m-2 flex flex-col gap-3 bg-gray-100">
                <div className="flex justify-between items-center">
                    <p className="text-gray-800 font-semibold text-3xl">{totalSolved}</p>
                    <p className="text-gray-800">/{questions.length}</p>
                </div>
                <p className="text-gray-600">Total Solved</p>
                <div className="w-full bg-blue-600/20 rounded-full h-2.5">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${(100*totalSolved)/questions.length}%`}}
                    ></div>
                </div>
            </div>
            <div className="p-3 border-2 rounded-xl border-gray-400 m-2 flex flex-col gap-3 bg-gray-100">
                <div className="flex justify-between items-center">
                    <p className="text-gray-800 font-semibold text-3xl">{easyQuestions}</p>
                    <p className="text-gray-800">/{easyActual}</p>
                </div>
                <p className="text-gray-600">Easy</p>
                <div className="w-full bg-green-600/20 rounded-full h-2.5">
                    <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${(100*easyQuestions)/easyActual}%`}} 
                    ></div>
                </div>
            </div>
            <div className="p-3 border-2 rounded-xl border-gray-400 m-2 flex flex-col gap-3 bg-gray-100">
                <div className="flex justify-between items-center">
                    <p className="text-gray-800 font-semibold text-3xl">{mediumQuestions}</p>
                    <p className="text-gray-800">/{mediumActual}</p>
                </div>
                <p className="text-gray-600">Medium</p>
                <div className="w-full bg-amber-600/20 rounded-full h-2.5">
                    <div
                        className="bg-amber-600 h-2.5 rounded-full"
                        style={{ width: `${(100*mediumQuestions)/mediumActual}%`}}
                    ></div>
                </div>
            </div>
            <div className="p-3 border-2 rounded-xl border-gray-400 m-2 flex flex-col gap-3 bg-gray-100">
                <div className="flex justify-between items-center">
                    <p className="text-gray-800 font-semibold text-3xl">{hardQuestions}</p>
                    <p className="text-gray-800">/{hardActual}</p>
                </div>
                <p className="text-gray-600">Hard</p>
                <div className="w-full bg-red-600/20 rounded-full h-2.5">
                    <div
                        className="bg-red-600 h-2.5 rounded-full"
                        style={{ width: `${(100*hardQuestions)/hardActual}%`}}
                    ></div>
                </div>
            </div>
            
        </div>
    );
};

export default TotalSolved;