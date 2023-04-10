import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import moment from 'moment';
import { deleteEquip } from '../../redux/equipment/equipment.actions';
import DatePicker from '../date-picker/date-picker.component';

import { Table, kaReducer } from 'ka-table';
import { search } from 'ka-table/actionCreators';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';

import { RiEdit2Fill, RiDeleteBin2Fill } from 'react-icons/ri';
import "ka-table/style.css";
import { Button, Modal } from 'react-bootstrap';
import { deleteEquipment } from '../../api/EquipmentApi';

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


const handleDel = async (id, userId, delEquip,setLoadData) => {
  // console.log(id, userId, delEquip)
  try {
    console.log("id",id," user",userId)
    await deleteEquipment(id, userId)
    delEquip(id)
    setLoadData(value=> ++value)

  } catch (error) {
    alert(error);
  }
}

const EditButton = ({ rowData, history, match }) => {
  console.log("url",rowData)
  return (
    <div className='edit-cell-button'>
      <RiEdit2Fill
        alt='Edit Row'
        title='Edit Row'
        onClick={() => history.push(`${match.url}/${rowData.id}`)}
      />
    </div>
  );
};



const EquipTable = ({ equips,setLoadData, history, match, delEquip, userId }) => {
  const now = new Date()
  // console.log("loaddata",setLoadData)
  const [show, setShow] = useState(false);
  const [dataTemp, setDataTemp] = useState([]);
  const [fDate, setDate] = useState({ start: '', end:  new Date().toString()})
  const handleChange = event => {
    const { value, name } = event.target;

    setDate({ ...fDate, [name]: value });
  }

  const startTime = fDate.start === '' ? 0 : Number(new Date(fDate.start).getTime()) 
  const endTime =  Number(new Date(fDate.end).getTime())

  // console.log("startTime", startTime)
  // console.log("endTime", endTime)

  // console.log("receiptDate",equips)
  
  // console.log("now",Number(new Date(equips[0]?.receiptDate).getTime()))
  const data =  equips.filter((x) => {
    // console.log(Number(new Date(x?.date).getTime()) >= startTime && Number(new Date(x?.date).getTime()) <= endTime)
    return (Number(new Date(x?.receiptDate).getTime()) >= startTime && Number(new Date(x?.receiptDate).getTime()) <= endTime)
  })
  // console.log(data)
  const dataArray = data.map(
    (x, index) => ({
      order: `${index + 1}`,
      receiptDate: moment(x.receiptDate).format("DD-MM-yyyy"),
      equipmentName: x.equipmentName,
      name: x.name,
      description: x.description,
      stateDescription: x.stateDescription,
      id: x.equipmentId,
    })
  );
  const DeleteButton = ({ rowData, userId, delEquip }) => {
    return (
      <div className='edit-cell-button'>
        <RiDeleteBin2Fill
          alt='Delete Row'
          title='Delete Row'
          onClick={() => {
            setShow(true);
            setDataTemp([rowData.id, userId, delEquip])
            // handleDel(rowData.id, userId, delEquip)
          }
          }
        />
      </div>
    );
  };

  const tablePropsInit = {
    columns: [
      // { key: 'id', title: 'ID', dataType: DataType.String, style: { width: 50 } },
      { key: 'order', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'equipmentName', title: 'TÊN', dataType: DataType.String, style: { width: 150 } },
      { key: 'receiptDate', title: 'NGÀY NHẬP', dataType: DataType.String, style: { width: 150 } },
      { key: 'name', title: 'NHÀ CUNG CẤP', dataType: DataType.String, style: { width: 150 } },
      { key: 'description', title: 'MÔ TẢ', dataType: DataType.String, style: { width: 200 } },
      { key: 'stateDescription', title: 'TÌNH TRẠNG', dataType: DataType.String, style: { width: 150 } },
      { key: 'editColumn', title: '', style: { width: 50, cursor: "pointer" } },
      { key: 'deleteColumn', title: '', style: { width: 50, cursor: "pointer" } },
    ],
    loading: {
      enabled: false
    },
    format: ({ column, value }) => {
      if (column.dataType === DataType.Date) {
        return value && value.toLocaleDateString('en-GB', { month: '2-digit', day: '2-digit', year: 'numeric' });
      }
    },
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 10,
      position: PagingPosition.Bottom
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
  }, [equips, fDate])
  const dispatch = async (action) => {
    changeTableProps((prevState) => kaReducer(prevState, action));
  }
  const handleClose = () => {
    setShow(false)
  }
  const componentRef = useRef(dataArray);

  return (

    <div>
      <div className="search-filter">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Xóa thiết bị?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Xác nhận xóa thiết bị!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              handleDel(dataTemp[0], dataTemp[1], dataTemp[2],setLoadData);
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
      {/* <button onClick={() => window.print()}>PRINT</button> */}
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={{
          ...bootstrapChildComponents,
          cellText: {
            content: (props) => {
              if (props.column.key === 'editColumn') {
                {console.log("props.column.key",match,history)}
                return <EditButton {...props} history={history} match={match} />
              }
              if (props.column.key === 'deleteColumn') {
                return <DeleteButton {...props} delEquip={delEquip} userId={userId} />
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
      />
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  userId: user.currentUser.id
})

const mapDispatchToProps = dispatch => ({
  delEquip: id => dispatch(deleteEquip(id))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EquipTable));