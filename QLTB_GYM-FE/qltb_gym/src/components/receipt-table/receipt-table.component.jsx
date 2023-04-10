import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { deleteReceipt } from '../../redux/receipt/receipt.actions';
import DatePicker from '../date-picker/date-picker.component';
import moment from 'moment';

import { search } from 'ka-table/actionCreators';
import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';

import { RiEdit2Fill, RiDeleteBin2Fill } from 'react-icons/ri';
import "ka-table/style.css";
import { Button, Modal } from 'react-bootstrap';
import { getInfoReceipt } from '../../api/ReceiptApi';

const bootstrapChildComponents = {
  table: {
    elementAttributes: () => ({
      className: 'table table-striped table-hover table-bordered'
    })
  },
  tableHead: {
    elementAttributes: () => ({
      className: 'thead-dark'
    })
  },
  pagingIndex: {
    elementAttributes: ({ isActive }) => ({
      className: `page-item ${(isActive ? 'active' : '')}`
    }),
    content: ({ text }) => <div className='page-link'>{text}</div>
  },
  pagingPages: {
    elementAttributes: () => ({
      className: 'pagination'
    }),
  }
}

const handleDel = async (receiptId, delReceipt, accountId) => {
  try {
    const response = await deleteReceipt(receiptId, accountId)

      delReceipt(receiptId)

  } catch (error) {
    alert("Không xóa được hóa đơn");
  }
}

const EditButton = ({ rowData, history, match }) => {

  
  console.log("rowData", rowData)
  return (
    <div className='edit-cell-button'>
      <RiEdit2Fill
        alt='Edit Row'
        title='Edit Row'
        onClick={() => history.push(`${match.url}/${rowData.receiptId}`)}
      />
    </div>
  );
};


const ReceiptTable = ({ receipts, history, match, delReceipt, user }) => {
  const now = new Date()
  const [show, setShow] = useState(false);
  const [dataTemp, setDataTemp] = useState([]);
  const [fDate, setDate] = useState({ start: '', end: new Date().toString() })
  const handleChange = event => {
    const { value, name } = event.target;
    setDate({ ...fDate, [name]: value });
  }
  const startTime = fDate.start === '' ? 0 : Number(new Date(fDate.start).getTime())
  const endTime = Number(new Date(fDate.end).getTime())

  // console.log(startTime,'   ',endTime)
  // console.log(Number(new Date(receipts[0]?.date).getTime()))
  const data = receipts.filter((x) => {
    // console.log(Number(new Date(x?.date).getTime()) >= startTime && Number(new Date(x?.date).getTime()) <= endTime)
    return (Number(new Date(x?.date).getTime()) >= startTime && Number(new Date(x?.date).getTime()) <= endTime)
  })
  // console.log("data", data)
  const dataArray = data.map(
    (x, index) => ({
      column1: `${index + 1}`,
      receiptId: x.receiptId,
      date: moment(x.date).format("DD-MM-yyyy"),
      suppName: x.suppName,
      total: x.total,
    })
  );
  const DeleteButton = ({ rowData, delReceipt, user }) => {
    return (
      <div className='edit-cell-button'>
        <RiDeleteBin2Fill
          alt='Delete Row'
          title='Delete Row'
          onClick={() => {
            setShow(true);
            setDataTemp([rowData.rcp_code, delReceipt, user.id])
            //handleDel(rowData.rcp_code, delReceipt, user.id)
          }}
        />
      </div>
    );
  };
  // initial value of the *props
  const tablePropsInit = {
    columns: [
      { key: 'column1', title: 'STT', dataType: DataType.Number, style: { width: 50 } },
      { key: 'receiptId', title: 'MÃ PHIẾU', dataType: DataType.String, style: { width: 150 } },
      { key: 'date', title: 'NGÀY NHẬP', dataType: DataType.String, style: { width: 100 } },
      { key: 'suppName', title: 'NHÀ CUNG CẤP', dataType: DataType.String, style: { width: 300 } },
      { key: 'total', title: 'TỔNG TIỀN', dataType: DataType.String, style: { width: 200 } },
      { key: 'editColumn', title: '', style: { width: 50, cursor: "pointer" } },
      { key: 'deleteColumn', title: '', style: { width: 50, cursor: "pointer" } },
    ],
    loading: {
      enabled: false
    },
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 10,
      position: PagingPosition.Bottom
    },
    format: ({ column, value }) => {
      if (column.dataType === DataType.Date) {
        return value && value.toLocaleDateString('en-GB', { month: '2-digit', day: '2-digit', year: 'numeric' });
      }
    },
    data: dataArray,
    editingMode: EditingMode.None,
    rowKeyField: 'id',
    singleAction: loadData(),
    sortingMode: SortingMode.None,
  };

  const [tableProps, changeTableProps] = useState(tablePropsInit);
  useEffect(() => {
    changeTableProps({
      ...tableProps,
      data: dataArray,
      loading: true
    })
  }, [receipts, fDate])
  const dispatch = async (action) => {
    changeTableProps((prevState) => kaReducer(prevState, action));

  }
  const handleClose = () => {
    setShow(false)
  }
  return (
    <div>
      <div className="search-filter">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Xóa hóa đơn?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Xác nhận xóa hóa đơn!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              handleDel(dataTemp[0], dataTemp[1], dataTemp[2]);
              setShow(false)
            }}>
              OK
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <DatePicker value={fDate} name="start" handleChange={handleChange} />
        <input type='search' defaultValue={tableProps.searchText} onChange={(event) => {
          dispatch(search(event.currentTarget.value));
        }} className='search' placeholder="tìm kiếm" />
      </div>
      <Table
        {...tableProps}
        childComponents={{
          ...bootstrapChildComponents,
          cellText: {
            content: (props) => {
              if (props.column.key === 'editColumn') {
                return <EditButton {...props} history={history} match={match} />
              }
              if (props.column.key === 'deleteColumn') {
                return <DeleteButton {...props} delReceipt={delReceipt} user={user} />
              }
            }
          },
          noDataRow: {
            content: () => 'No Data Found'
          },
          tableWrapper: {
            elementAttributes: () => ({ style: { maxHeight: 500 } })
          }
        }}
        dispatch={dispatch}
      />
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user: user.currentUser
})


const mapDispatchToProps = dispatch => ({
  delReceipt: id => dispatch(deleteReceipt(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReceiptTable));