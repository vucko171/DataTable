import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import './styles.css';

function DataTable({
  tableStyle,
  headerStyle,
  customClassName,
  data,
  columns,
}) {
  const [sortOrder, setSortOrder] = useState([]);
  const [sortDirection, setSortDirection] = useState([]);
  const [rows, setRows] = useState([]);

  if (rows.length === 0) {
    setRows([...data]);
  }

  function onSort(event) {
    const tempRows = [...data];
    const tempOrder = sortOrder;
    const tempDirection = sortDirection;
    if (event.currentTarget.id) {
      const index = tempOrder.indexOf(event.currentTarget.id);
      if (index === -1) {
        tempOrder.push(event.currentTarget.id);
        tempDirection.push(1);
      } else if (tempDirection[index] === 1) {
        tempOrder.splice(index, 1);
        tempOrder.push(event.currentTarget.id);
        tempDirection.splice(index, 1);
        tempDirection.push(-1);
      } else if (tempDirection[index] === -1) {
        tempOrder.splice(index, 1);
        tempDirection.splice(index, 1);
      }
      tempRows.sort((a, b) => {
        let temp;
        for (let i = 0; i < tempOrder.length; i += 1) {
          const sortKey = tempOrder[i];
          if (typeof a[sortKey] === 'number') {
            temp =
              a[sortKey]
                .toString()
                .localeCompare(b[sortKey].toString(), 'en-US', {
                  numeric: 'true',
                }) * tempDirection[i];
            if (temp !== 0) {
              return temp;
            }
          } else {
            temp = a[sortKey].localeCompare(b[sortKey]) * tempDirection[i];
            if (temp !== 0) {
              return temp;
            }
          }
        }
        return 0;
      });

      setRows([...tempRows]);
      setSortOrder([...tempOrder]);
      setSortDirection([...tempDirection]);
    }
  }

  return (
    <table
      cellSpacing="0"
      cellPadding="5px"
      width="100%"
      border="0"
      style={tableStyle}
      id="datatable"
    >
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.header}
              id={column.dataID}
              className={customClassName}
              width={column.width}
              style={{ textAlign: column.align || 'left' }}
              onClick={column.sortable ? onSort : () => {}}
            >
              <div title={column.helper || ''} style={{ ...headerStyle }}>
                {column.header}
                {column.sortable &&
                  (sortOrder.indexOf(column.dataID) === -1 ? (
                    <FaSort />
                  ) : sortDirection[sortOrder.indexOf(column.dataID)] === 1 ? (
                    <FaSortDown />
                  ) : (
                    <FaSortUp />
                  ))}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((dataItem, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td
                key={column.header}
                style={{ textAlign: column.align || 'left' }}
              >
                <div
                  style={
                    { color: 'black', ...column.columnStyle } || {
                      color: 'black',
                    }
                  }
                >
                  <span
                    className={column.isLink ? 'tableLink' : ''}
                    onClick={() => {
                      column.clickCallback(dataItem);
                    }}
                  >
                    {column.dataID
                      ? dataItem[column.dataID]
                      : column.customCell}
                  </span>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

DataTable.propTypes = {
  tableStyle: PropTypes.shape(PropTypes.object),
  headerStyle: PropTypes.shape(PropTypes.object),
  customClassName: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      dataID: PropTypes.string,
      width: PropTypes.string,
      align: PropTypes.string,
      sortable: PropTypes.bool,
      customCell: PropTypes.object,
      helper: PropTypes.string,
      isLink: PropTypes.bool,
      clickCallback: PropTypes.function,
    })
  ).isRequired,
};

DataTable.defaultProps = {
  tableStyle: {
    backgroundColor: 'rgb(255,255,204)',
    border: 'rgb(0,0,0) solid 2px',
  },
  headerStyle: {},
  customClassName: '',
};

export default DataTable;
