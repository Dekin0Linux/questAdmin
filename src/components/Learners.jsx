import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../apiUrl';

function Learners() {
    const [learners, setLearners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10); // Adjust page size as needed

    const getLearners = async () => {
        try {
            const fetchlearners = await axios.get(`${API_URL}/user`);
            let filteredLearners = fetchlearners.data.filter((learner) => learner.role === 'learner');
            setLearners(filteredLearners);
        } catch (error) {
            console.error('Error fetching learners:', error);
        }
    }

    useEffect(() => {
        getLearners();
    }, []);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Paginate learners on the client side
    const paginatedLearners = learners.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div>
            <h2>List of Learners ({learners.length})</h2>
            <table className="table-auto border-separate border-spacing-2 border border-slate-500">
            <thead>
                    <tr >
                        <th className="border p-2">SN</th>
                        <th className="border p-2">Full Name</th>
                        <th className="border p-2">D.O.B</th>
                        <th className="border p-2">Phone</th>
                        <th className="border p-2">Gender</th>
                        <th className="border p-2">UserId</th>
                        <th className="border p-2">Region</th>
                        <th className="border p-2">District</th>
                        <th className="border p-2">School</th>
                        <th className="border p-2">Reg Date</th>
                        <th className="border p-2">Has License</th>
                        <th className="border p-2">License No.</th>
                        <th className="border p-2">Has Laptop</th>
                        <th className="border p-2">Laptop Condition</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedLearners.map((learner, index) => (
                       <tr key={index}>
                        <td className="border p-2">{index + 1}</td>
                       <td className="border p-2">{learner.firstname} {learner.middlename} {learner.lastname}</td>
                       <td className="border p-2">{learner.dob}</td>
                       <td className="border p-2"><a href={`tel:${learner.phone}`}>{learner.phone}</a></td>
                       <td className="border p-2">{learner.gender}</td>
                       <td className="border p-2">{learner.userNo}</td>
                       <td className="border p-2 capitalize">{learner.region}</td>
                       <td className="border p-2">{learner.district}</td>
                       <td className="border p-2">{learner.school}</td>
                       <td className="border p-2">{new Date(learner?.createdAt).toLocaleDateString()}</td>
                       <td className="border p-2">{learner.isLincesed}</td>
                       <td className="border p-2">{learner.lincenseNumber}</td>
                       <td className="border p-2">{learner.laptopNeeded}</td>
                       <td className="border p-2">{learner.isGoodCondition}</td>
                   </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="pagination flex gap-10 my-5">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className='bg-gray-200 p-3'>Previous</button>
                <span className='bg-gray-200 p-3'>{currentPage}</span>
                <button className='bg-gray-200 p-3' onClick={handleNextPage} disabled={currentPage == 1}>Next</button>
            </div>
        </div>
    )
}

export default Learners;
