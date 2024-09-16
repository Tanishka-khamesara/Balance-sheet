import React, { useState, useRef, useEffect } from 'react';

function Main() {
    
    const [revenueRows, setRevenueRows] = useState([
        { id: 1, category: 'Passenger', date2022: 4357, date2024: 15213 },
        { id: 2, category: 'Cargo', date2022: 35814, date2024: 29312 },
    ]);

    const [revenueOthers, setRevenueOthers] = useState([
        {
            id: 1, date2022: 5416,
            date2024: 5236,
            name: "Catering Workers and ..."
        }]);

    const [expenseRows, setExpenseRows] = useState([
        { id: 1, category: 'Fuel', date2022: 4357, date2024: 14333 },
        { id: 2, category: 'Labour', date2022: 35814, date2024: 35544 },
    ]);

    const [expenseOthers, setExpenseOthers] = useState([
        {
            id: 1,
            date2022: 385,
            date2024: 0,
            name: "Restructuring Costs"
        }]);

    const handleInputChange = (e, id, field, section, type) => {
        const updateSection = section === 'revenue' ? (type === 'main' ? revenueRows : revenueOthers) : (type === 'main' ? expenseRows : expenseOthers);
        const updatedRows = updateSection.map(row =>
            row.id === id ? { ...row, [field]: e.target.value } : row
        );

        if (section === 'revenue') {
            type === 'main' ? setRevenueRows(updatedRows) : setRevenueOthers(updatedRows);
        } else {
            type === 'main' ? setExpenseRows(updatedRows) : setExpenseOthers(updatedRows);
        }
    };

    const addRow = (section) => {
        const newRow = { id: (section === 'revenue' ? revenueOthers.length : expenseOthers.length) + 1, date2022: 0, date2024: 0 };
        if (section === 'revenue') {
            setRevenueOthers([...revenueOthers, newRow]);
        } else {
            setExpenseOthers([...expenseOthers, newRow]);
        }
    };

    const getTotal = (rows, field) => {
        return rows.reduce((acc, row) => acc + Number(row[field] || 0), 0);
    };

    return (
        <div className="table-container">
            <h1>Financial Statements</h1>

            <table className="financial-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>31-12-2022</th>
                        <th>31-12-2024</th>
                        <th>Variance</th>
                        <th>Variance %</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="section-header">
                        <td colSpan="5">Revenue</td>
                    </tr>
                    {revenueRows.map((row) => {
                        const variance = row.date2024 - row.date2022;
                        const variancePercent = row.date2022 ? ((variance / row.date2022) * 100).toFixed(2) : 0;

                        return (
                            <tr key={row.id}>
                                <td>{row.category}</td>
                                <td>{row.date2022}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.date2024}
                                        className='date24'
                                        onChange={(e) => handleInputChange(e, row.id, 'date2024', 'revenue', 'main')}
                                    />
                                </td>
                                <td>{variance}</td>
                                <td>{variancePercent}%</td>
                            </tr>
                        );
                    })}

                    <tr className="section-header">
                        <td>Others <button onClick={() => addRow('revenue')}>+</button></td>
                        <td colSpan="4"></td>
                    </tr>
                    {revenueOthers.map((row) => {
                        const variance = row.date2024 - row.date2022;
                        const variancePercent = row.date2022 ? ((variance / row.date2022) * 100).toFixed(2) : 0;

                        return (
                            <tr key={row.id} className='other_inp'>
                                <td>{row.name ? row.name : <input type="text" style={{ border: "none", outline: "none" }} className='other_inp' />}</td>
                                <td>{row.date2022}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.date2024}
                                        onChange={(e) => handleInputChange(e, row.id, 'date2024', 'revenue', 'others')}
                                    />
                                </td>
                                <td>{variance}</td>
                                <td>{variancePercent}%</td>
                            </tr>
                        );
                    })}


                    <tr className="total-row">
                        <td>Total</td>
                        <td>{getTotal(revenueRows, 'date2022') + getTotal(revenueOthers, 'date2022')}</td>
                        <td>{getTotal(revenueRows, 'date2024') + getTotal(revenueOthers, 'date2024')}</td>
                        <td>
                            {(getTotal(revenueRows, 'date2024') + getTotal(revenueOthers, 'date2024')) -
                                (getTotal(revenueRows, 'date2022') + getTotal(revenueOthers, 'date2022'))}
                        </td>
                        <td>
                            {(((getTotal(revenueRows, 'date2024') + getTotal(revenueOthers, 'date2024')) -
                                (getTotal(revenueRows, 'date2022') + getTotal(revenueOthers, 'date2022'))) /
                                (getTotal(revenueRows, 'date2022') + getTotal(revenueOthers, 'date2022')) * 100).toFixed(2)}%
                        </td>
                    </tr>

                    <tr className="section-header">
                        <td colSpan="5">Operating Expenses</td>
                    </tr>
                    {expenseRows.map((row) => {
                        const variance = row.date2024 - row.date2022;
                        const variancePercent = row.date2022 ? ((variance / row.date2022) * 100).toFixed(2) : 0;

                        return (
                            <tr key={row.id}>
                                <td>{row.category}</td>
                                <td>{row.date2022}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.date2024}
                                        onChange={(e) => handleInputChange(e, row.id, 'date2024', 'expense', 'main')}
                                    />
                                </td>
                                <td>{variance}</td>
                                <td>{variancePercent}%</td>
                            </tr>
                        );
                    })}

                    <tr className="section-header">
                        <td>Others <button onClick={() => addRow('expense')} style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>+</button></td>
                        <td colSpan="4"></td>
                    </tr>
                    {expenseOthers.map((row) => {
                        const variance = row.date2024 - row.date2022;
                        const variancePercent = row.date2022 ? ((variance / row.date2022) * 100).toFixed(2) : 0;

                        return (
                            <tr key={row.id} className='other_inp'>
                                <td >{row.name ? row.name : <input type="text" style={{ outline: "none" }} />}</td>
                                <td>{row.date2022}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.date2024}
                                        onChange={(e) => handleInputChange(e, row.id, 'date2024', 'expense', 'others')}
                                    />
                                </td>
                                <td>{variance}</td>
                                <td>{variancePercent}%</td>
                            </tr>
                        );
                    })}


                    <tr className="total-row">
                        <td>Total</td>
                        <td>{getTotal(expenseRows, 'date2022') + getTotal(expenseOthers, 'date2022')}</td>
                        <td>{getTotal(expenseRows, 'date2024') + getTotal(expenseOthers, 'date2024')}</td>
                        <td>
                            {(getTotal(expenseRows, 'date2024') + getTotal(expenseOthers, 'date2024')) -
                                (getTotal(expenseRows, 'date2022') + getTotal(expenseOthers, 'date2022'))}
                        </td>
                        <td>
                            {(((getTotal(expenseRows, 'date2024') + getTotal(expenseOthers, 'date2024')) -
                                (getTotal(expenseRows, 'date2022') + getTotal(expenseOthers, 'date2022'))) /
                                (getTotal(expenseRows, 'date2022') + getTotal(expenseOthers, 'date2022')) * 100).toFixed(2)}%
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Main;