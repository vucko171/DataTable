import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import "./styles.css"
function DataTable({ tableStyle, data, columns }) {
    const [sortOrder, setSortOrder] = useState([])
    const [sortDirection, setSortDirection] = useState([])
    const [rows, setRows] = useState([])
    if (rows.length === 0) {
        console.log("###")
        setRows([...data])
    }
    function onSort(event) {
        let tempRows = [...data]
        let tempOrder = sortOrder
        let tempDirection = sortDirection
        if (event.currentTarget.id) {
            let index = tempOrder.indexOf(event.currentTarget.id)
            if (index === -1) {
                tempOrder.push(event.currentTarget.id)
                tempDirection.push(1)
            }
            else if (tempDirection[index] === 1) {
                tempOrder.splice(index, 1)
                tempOrder.push(event.currentTarget.id)
                tempDirection.splice(index, 1)
                tempDirection.push(-1)
            }
            else if (tempDirection[index] === -1) {
                tempOrder.splice(index, 1)
                tempDirection.splice(index, 1)
            }
            tempRows.sort(
                (a, b) => {
                    let temp;
                    for (let i = 0; i < tempOrder.length; i++) {
                        let sortKey = tempOrder[i]
                        if (typeof a[sortKey] === "number") {
                            temp = a[sortKey]
                                .toString()
                                .localeCompare(b[sortKey].toString(), "en-US", {
                                    numeric: "true",
                                }) * tempDirection[i]
                            if (temp !== 0) {
                                return temp
                            }
                        } else {
                            temp = a[sortKey].localeCompare(b[sortKey]) * tempDirection[i]
                            if (temp !== 0) {
                                return temp
                            }
                        }
                    }
                    return 0
                }
            )
            console.log(tempRows)
            setRows([...tempRows])
            setSortOrder([...tempOrder])
            setSortDirection([...tempDirection])
        }
    }
    const tableStyleDefault = {
        backgroundColor: "rgb(255,255,204)",
        border: "rgb(0,0,0) solid 2px"
    }
    console.log(rows)
    return (
        <table cellSpacing="0" cellPadding="5px" width="100%" border="0" style={tableStyle || tableStyleDefault}>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.header}
                            id={column.dataID}
                            className={column.className || "search-result-heading"}
                            width={column.width}
                            style={{ textAlign: column.align || "left" }}
                            onClick={(column.sortable) ? onSort : () => { }}
                        >
                            <div title={column.helper || ""}
                                style={{ color: "white", ...column.headerStyle } || { color: "white" }}>
                                {column.header}{(column.sortable) &&
                                    (sortOrder.indexOf(column.dataID) === -1 ?
                                        <FaSort />
                                        : (sortDirection[sortOrder.indexOf(column.dataID)] === 1 ?
                                            <FaSortDown />
                                            : <FaSortUp />))}
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((dataItem, index) => (
                    <tr key={index}>
                        {columns.map(column => (
                            <td key={column.header} style={{ textAlign: column.align || "left" }}>
                                <div style={{ color: "black", ...column.cellStyle } || { color: "black" }}>
                                    <span className={(column.isLink) ? "tableLink" : ""} onClick={() => { column.clickCallback(dataItem) }}>{((column.dataID) ? dataItem[column.dataID] : column.customCell)}</span>
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table >
    )
}
DataTable.propTypes = {
    tableStyle: PropTypes.object,
    data: PropTypes.array.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
        header: PropTypes.string.isRequired,
        dataID: PropTypes.string,
        width: PropTypes.string,
        align: PropTypes.string,
        headerStyle: PropTypes.object,
        cellStyle: PropTypes.object,
        sortable: PropTypes.bool,
        customCell: PropTypes.object,
        customClassName: PropTypes.string,
        helper: PropTypes.string,
        isLink: PropTypes.bool,
        clickCallback: PropTypes.function,
    })).isRequired
}
export default DataTable;
