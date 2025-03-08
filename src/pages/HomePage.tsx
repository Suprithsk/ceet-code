import CompaniesFilter from "../components/CompaniesFilter"
import Header from "../components/Header"
import Pagination from "../components/Pagination"
import QuestionsTable from "../components/QuestionsTable"
import TopBar from "../components/TopBar"
import TotalSolved from "../components/TotalSolved"
import { useEffect, useState } from "react"
import questions from "../assets/questions.json"
import { Question } from "../types/types"
import companies from "../assets/companies.json"

const HomePage = () => {
  const [paginatedData, setPaginatedData] = useState<Question[]>([])
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [solvedQuestions, setSolvedQuestions] = useState<number[]>([])
  const [difficulty, setDifficulty] = useState("all")
  
  const resetAll = () => {
    setSearchTerm("")
    setDebouncedSearchTerm("")
    setSelectedCompanies([])
    setDifficulty("all")
    setPage(1)
  }
  const refreshSolved = () => {
    const savedSolvedQuestions = JSON.parse(localStorage.getItem("solvedQuestions") || "[]");
    setSolvedQuestions(savedSolvedQuestions);
  }
  useEffect(() => {
    refreshSolved()
  }, []);
  useEffect(() => {
      const newQuestionsList= questions.filter((question: Question) => {
          const companiesCount=question.asked_by.filter((company: string) => selectedCompanies.includes(company)).length
          return (debouncedSearchTerm !== '' ? question.Title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) : true) && (difficulty !== 'all' ? question.Difficulty.toLowerCase() === difficulty.toLowerCase() : true) && (selectedCompanies.length > 0 ? companiesCount=== selectedCompanies.length : true)
      })
      console.log('new',newQuestionsList)
      console.log(itemsPerPage, (page-1)*itemsPerPage, page*itemsPerPage)
      console.log('sl;i',newQuestionsList.slice((page-1)*itemsPerPage, page*itemsPerPage))
      // setFilteredData(newQuestionsList)
      setPaginatedData(newQuestionsList.slice((page-1)*itemsPerPage, page*itemsPerPage))
      setTotalPages(Math.ceil(newQuestionsList.length / itemsPerPage))
  }, [itemsPerPage, debouncedSearchTerm, selectedCompanies, difficulty, page])
  // useEffect(()=>{
  //   console.log('cal;led')
  //   const newPaginatedData= filteredData.slice((page-1)*itemsPerPage, page*itemsPerPage)
  //   console.log('newPaginatedData', newPaginatedData)
  //   setPaginatedData(newPaginatedData)
  // }, [page])
  return (
    <div >
        <Header />
        <div className="w-[90%] lg:w-[80%] md:w-[80%] mx-auto">
            <TotalSolved solvedQuestions={solvedQuestions}/>
            <TopBar resetAll={resetAll} setPage={setPage} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setDebouncedSearchTerm={setDebouncedSearchTerm} difficulty={difficulty} setDifficulty={setDifficulty}/>
            <CompaniesFilter companies={companies} propSetSelectedCompanies={setSelectedCompanies} selectedCompanies={selectedCompanies}/>
            <QuestionsTable refreshSolved={refreshSolved} paginatedData={paginatedData} />
            <Pagination itemsPerPage={itemsPerPage} setPage={setPage} page={page} setItemsPerPage={setItemsPerPage} totalPages={totalPages}/>
        </div>
    </div>
  )
}

export default HomePage