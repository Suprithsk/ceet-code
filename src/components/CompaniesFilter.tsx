import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
interface CompaniesFilterProps {
    propSetSelectedCompanies: React.Dispatch<React.SetStateAction<string[]>>;
    selectedCompanies: string[];
    companies: string[];
}

const CompaniesFilter = ({propSetSelectedCompanies, selectedCompanies, companies}: CompaniesFilterProps ) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [companiesLocal, setCompaniesLocal] = useState<string[]>(companies)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
    const [totalPages, setTotalPages] = useState(companies.length / 25)
    const [currentCompanies, setCurrentCompanies] = useState<string[]>(companies.slice(0, 25))

    useEffect(() => {
        setCurrentPage(1);
        const filteredCompanies = companies.filter((company) => company.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
        setCompaniesLocal(filteredCompanies);
        setTotalPages(Math.ceil(filteredCompanies.length / 25)); 
        setCurrentCompanies(filteredCompanies.slice(0, 25));
    }, [debouncedSearchTerm]);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 600);
        return () => {
            clearTimeout(timer);
        };
    }, [ searchTerm]);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * 25;
        const endIndex = startIndex + 25;
        setCurrentCompanies(companiesLocal.slice(startIndex, endIndex));
    }
    const handleSelect = (companyName: string) => {
        if(selectedCompanies.includes(companyName)){
            propSetSelectedCompanies(selectedCompanies.filter((company) => company !== companyName))
        }else{
            propSetSelectedCompanies([...selectedCompanies, companyName])
        }
    };
    return (
        <div className="bg-gray-500 p-5 rounded-lg mt-4">
                <div className="flex items-center w-2/5 mb-4">
                    <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder="Search for companies" className="w-full p-2 border border-gray-300 rounded bg-white" />
                </div>
                <div className="w-11/12 my-5 flex flex-wrap justify-start">
                    {companiesLocal.length > 0 ? currentCompanies.map((company, index) => (
                        <div key={index} onClick={()=>{handleSelect(company)}} className={`flex whitespace-nowrap gap-1 justify-between items-center ${selectedCompanies.includes(company)?"bg-blue-300":'bg-gray-200'}  py-2 px-4 rounded-full mr-2 mb-2 cursor-pointer`}>
                            <p>{company}</p> {selectedCompanies.includes(company) && <X />}
                        </div>
                    )): <p className="text-white font-medium text-lg">No companies found</p>}
                </div>
                <div className="flex flex-wrap justify-start my-5">
                    {selectedCompanies.length >0 && <p className="text-white font-medium text-lg">Selected companies: {selectedCompanies.join(', ')}</p>}
                </div>
                <div className="flex justify-center items-center mt-5">
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-1 bg-blue-500 text-white rounded transition hover:bg-blue-600 disabled:opacity-50" disabled={currentPage===1}  onClick={()=>{
                            handlePageChange(1)
                        }}>First</button>
                        <button className="px-4 py-1 bg-blue-500 text-white rounded transition hover:bg-blue-600 disabled:opacity-50" disabled={currentPage===1} onClick={()=>{
                            handlePageChange(currentPage-1)
                        }} >Previous</button>
                        <p className="text-white font-medium text-lg">{currentPage}/{totalPages}</p>
                        <button className="px-4 py-1 bg-blue-500 text-white rounded transition hover:bg-blue-600" disabled={currentPage===totalPages} onClick={()=>{
                            handlePageChange(currentPage+1)
                        }}>Next</button>
                        <button className="px-4 py-1 bg-blue-500 text-white rounded transition hover:bg-blue-600" disabled={currentPage===totalPages} onClick={()=>{
                            handlePageChange(totalPages)
                        }}>Last</button>
                    </div>
                </div>
            </div>
    )
}

export default CompaniesFilter