import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../apiUrl';

function Payments() {
    const [learners, setLearners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10); // Adjust page size as needed

    const getLearners = async () => {
        try {
            const fetchlearners = await axios.get(`${API_URL}/payment`);
            let filteredPayment =fetchlearners.data.getPayments.filter((payment) => payment.paymentStatus === 'success');
            console.log(fetchlearners.data.getPayments)
            setLearners(filteredPayment);
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
            <h2>List of Payments {(learners.length)}</h2>
            <table className="table-auto border-separate border-spacing-2 border border-slate-500">
            <thead>
                    <tr >
                        <th className="border p-2">SN</th>
                        <th className="border p-2">Full Name</th>
                        <th className="border p-2">Phone</th>
                        <th className="border p-2">Amount</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">UserId</th>
                        <th className="border p-2">Reg Date</th>
                        <th className="border p-2">MomoNum</th>
                        <th className="border p-2">Payment Ref</th>
                        <th className="border p-2">Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedLearners.map((learner, index) => (
                       <tr key={index}>
                       <td className="border p-2">{index + 1}</td>
                       <td className="border p-2">{learner.user.firstname} {learner.user.middlename} {learner.user.lastname}</td>
                       <td className="border p-2"><a href={`tel:${learner.user.phone}`}>{learner.user.phone}</a></td>
                       <td className="border p-2 text-xl font-bold">{learner.amount} gh</td>
                       <td className="border p-2">{learner.amount > 65 ? 'Full Paid' : 'Half Paid'}</td>
                       <td className="border p-2">{learner.userNo}</td>
                       <td className="border p-2">{new Date(learner?.createdAt).toLocaleDateString()}</td>

                       <td className="border p-2">{learner.momoNum}</td>
                       <td className="border p-2">{learner.paymentRef}</td>
                       <td className={`border p-2 capitalize font-bold ${learner.paymentStatus == 'success' ? 'text-green-600' : 'text-red-500'}`}>{learner.paymentStatus}</td>
                   </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="pagination flex gap-10 my-5">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className='bg-gray-200 p-3'>Previous</button>
                <span className='bg-gray-200 p-3'>{currentPage}</span>
                <button className='bg-gray-200 p-3' onClick={handleNextPage} disabled={currentPage == learners.length ? true : false}>Next</button>
            </div>
        </div>
    )
}

export default Payments;
