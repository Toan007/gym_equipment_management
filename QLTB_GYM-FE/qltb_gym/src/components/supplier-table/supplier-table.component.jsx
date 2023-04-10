import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchSuppliers } from '../../redux/supplier/supplier.actions';
import { search } from 'ka-table/actionCreators';
import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';

import { deleteSupplier } from '../../redux/supplier/supplier.actions';

import { RiEdit2Fill, RiDeleteBin2Fill } from 'react-icons/ri';

import "ka-table/style.css";
import { Button, Modal } from 'react-bootstrap';
import { deleteSuppliers, getAllSuppliers } from '../../api/SuppliersApi';


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

const handleDel = async (id, delSupplier, accountId) => {
  try {
    const response = await deleteSuppliers(id, accountId)

    delSupplier(id)

  } catch (error) {
    alert(error);
  }
}
const EditButton = ({ rowData, history, match }) => {
  console.log("row", rowData)
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


const SupplierTable = ({ suppliers, setSuppliers, history, match, delSupplier, user }) => {
  const [show, setShow] = useState(false);
  const [dataTemp, setDataTemp] = useState([]);

  const dataArray = suppliers.map(
    (x, index) => ({
      order: `${index + 1}`,
      id: x.id,
      name: x.name,
      taxId: x.taxId,
      address: x.address,
      // des: 'không có',
      // passed: true,

    })
  );
  const DeleteButton = ({ rowData, delSupplier, user }) => {
    return (
      <div className='edit-cell-button'>
        <RiDeleteBin2Fill
          alt='Delete Row'
          title='Delete Row'
          onClick={() => {
            setShow(true);
            setDataTemp([rowData.id, delSupplier, user.id])
            //handleDel(rowData.id, delSupplier, user.id)
          }}
        />
      </div>
    );
  };

  const tablePropsInit = {
    columns: [
      { key: 'order', title: 'STT', dataType: DataType.Number, style: { width: 50 } },
      { key: 'name', title: 'TÊN NHÀ CUNG CẤP', dataType: DataType.String, style: { width: 300 } },
      { key: 'taxId', title: 'MÃ SỐ THUẾ', dataType: DataType.String, style: { width: 100 } },
      { key: 'address', title: 'ĐỊA CHỈ', dataType: DataType.String, style: { width: 300 } },
      //{ key: 'des', title: 'THÔNG TIN', dataType: DataType.String, style: {width: 200} },
      { key: 'editColumn', title: '', style: { width: 50, cursor: "pointer" } },
      { key: 'deleteColumn', title: '', style: { width: 50, cursor: "pointer" } },
    ],
    loading: {
      enabled: false
    },
    paging: {
      enabled: true,
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
  }, [suppliers])
  const handleClose = () => {
    setShow(false)
  }
  const dispatch = action => {
    changeTableProps(prevState => kaReducer(prevState, action));
  };
  const handleSetSuppliers = (id)=>{
    const newSup = suppliers.filter((sup)=>sup.id !== id)
    setSuppliers(newSup)
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa nhà cung cấp?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Xác nhận xóa nhà cung cấp!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            handleDel(dataTemp[0], dataTemp[1], dataTemp[2]);
            setShow(false);
            handleSetSuppliers(dataTemp[0])
          }}>
            OK
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <input type='search' defaultValue={tableProps.searchText} onChange={(event) => {
        dispatch(search(event.currentTarget.value));
      }} className='search' placeholder="tìm kiếm" style={{ marginBottom: 10 }} />
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
                return <DeleteButton {...props} delSupplier={delSupplier} user={user} />
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
  delSupplier: id => dispatch(deleteSupplier(id))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupplierTable));