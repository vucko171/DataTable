import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import './styles.css';
import spinner from './images/spinner.gif';

function DataTable({
  tableTitle,
  isLoading,
  tableStyle,
  headerStyle,
  customClassName,
  noDataMessage,
  data,
  columns,
}) {
  const [sortOrder, setSortOrder] = useState([]);
  const [sortDirection, setSortDirection] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data.length !== 0) {
      console.log(data);
      setRows([...data]);
    }
  }, [data]);

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
    <div
      style={
        JSON.stringify(tableStyle) ===
        JSON.stringify({ backgroundColor: 'rgb(255,255,204)' })
          ? { backgroundColor: 'Black', padding: '2px' }
          : null
      }
    >
      <table
        cellSpacing="0"
        cellPadding="0"
        width="100%"
        style={tableStyle}
        id="datatable"
      >
        <thead>
          {tableTitle ? (
            <>
              <tr className="Title">
                <td colSpan="1000" style={{ padding: '2px' }}>
                  <b>{tableTitle}</b>
                </td>
              </tr>
              <tr style={{ height: 0 }} />
            </>
          ) : null}
          <tr>
            {columns.map((column) =>
              column.isVisible !== false ? (
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
                      ) : sortDirection[sortOrder.indexOf(column.dataID)] ===
                        1 ? (
                        <FaSortDown />
                      ) : (
                        <FaSortUp />
                      ))}
                  </div>
                </th>
              ) : null
            )}
          </tr>
        </thead>
        <tbody>
          {!isLoading ? (
            rows.length !== 0 ? (
              rows.map((dataItem, index) => (
                <tr key={index}>
                  {columns.map((column) =>
                    column.isVisible !== false ? (
                      <td
                        key={column.header}
                        style={{ textAlign: column.align || 'left' }}
                      >
                        <div
                          style={
                            { color: 'black', ...column.cellStyle } || {
                              color: 'black',
                            }
                          }
                        >
                          <span
                            className={column.isLink ? 'tableLink' : ''}
                            onClick={
                              column.clickCallback
                                ? () => {
                                    column.clickCallback(dataItem);
                                  }
                                : () => {}
                            }
                          >
                            {column.dataID
                              ? dataItem[column.dataID]
                              : column.customCell
                              ? column.customCell
                              : parse(column.customCellString, {
                                  replace(domNode) {
                                    if (domNode.type === 'tag') {
                                      for (const key of Object.keys(
                                        domNode.attribs
                                      )) {
                                        if (
                                          domNode.attribs[key].indexOf('{') !==
                                          -1
                                        ) {
                                          const indB = [
                                            domNode.attribs[key].indexOf('{'),
                                            domNode.attribs[key].indexOf('}'),
                                          ];
                                          domNode.attribs[key] =
                                            domNode.attribs[key].slice(
                                              0,
                                              indB[0]
                                            ) +
                                            eval(
                                              domNode.attribs[key].slice(
                                                indB[0] + 1,
                                                indB[1]
                                              )
                                            ) +
                                            domNode.attribs[key].slice(
                                              indB[1] + 1
                                            );
                                        }
                                      }
                                    }
                                    if (
                                      domNode.type === 'text' &&
                                      domNode.data.indexOf('dataItem') !== -1
                                    ) {
                                      while (domNode.data.indexOf('{') !== -1) {
                                        const indB = [
                                          domNode.data.indexOf('{'),
                                          domNode.data.indexOf('}'),
                                        ];
                                        domNode.data =
                                          domNode.data.slice(0, indB[0]) +
                                          eval(
                                            domNode.data.slice(
                                              indB[0] + 1,
                                              indB[1]
                                            )
                                          ) +
                                          domNode.data.slice(indB[1] + 1);
                                      }
                                    }
                                  },
                                })}
                          </span>
                        </div>
                      </td>
                    ) : null
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="1000" style={{ textAlign: 'center' }}>
                  {noDataMessage}
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan="1000" style={{ textAlign: 'center' }}>
                <img src={spinner} style={{ width: '20px' }} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

DataTable.propTypes = {
  tableTitle: PropTypes.string,
  isLoading: PropTypes.bool,
  tableStyle: PropTypes.objectOf(PropTypes.string),
  headerStyle: PropTypes.objectOf(PropTypes.string),
  customClassName: PropTypes.string,
  noDataMessage: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      dataID: PropTypes.string,
      width: PropTypes.string,
      align: PropTypes.string,
      sortable: PropTypes.bool,
      customCell: PropTypes.object,
      customCellString: PropTypes.string,
      helper: PropTypes.string,
      isLink: PropTypes.bool,
      isVisible: PropTypes.bool,
      clickCallback: PropTypes.function,
    })
  ).isRequired,
};

DataTable.defaultProps = {
  tableStyle: {
    backgroundColor: 'rgb(255,255,204)',
  },
  headerStyle: {},
  customClassName: '',
  noDataMessage: 'No data',
  tableTitle: undefined,
  isLoading: false,
};

export default DataTable;
