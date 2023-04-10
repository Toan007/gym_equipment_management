import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { deleteEquipmentGroup } from '../../redux/equipment-group/equipment-group.actions';

import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';

import { RiDeleteBin2Fill } from 'react-icons/ri';
import "ka-table/style.css";

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

const DeleteButton = ({ rowData, deleteEG }) => {
  return (
   <div className='edit-cell-button'>
     <RiDeleteBin2Fill
      alt='Delete Row'
      title='Delete Row'
      onClick={() => deleteEG(rowData.id)}
    />
   </div>
  );
};
const CustomEditor = ({ column, rowKeyValue, dispatch, value, }) => {
  const [editorValue, setValue] = useState(value);
  // console.log(value)
  return (
    <div className='custom-editor'>
      <input
        className='form-control'
        type='text'
        value={editorValue}
        onChange={(event) => setValue(event.currentTarget.value)}/>
      {/* <button className='custom-editor-button custom-editor-button-save'
        onClick={() => {
          dispatch(updateCellValue(rowKeyValue, column.key, editorValue));
          close();
        }}>Save</button>
      <button className='custom-editor-button custom-editor-button-cancel' onClick={close}>Cancel</button> */}
    </div>
  );
};

const DeviceTable = ({ devices, deleteEG, match }) => {
  const dataArray = devices.map(
    (x, index) => ({
      order: `${index + 1}`,
      name: x.name,
      unit: x.unit,
      quantity: x.quantity,
      price: x.price,
      total: x.quantity*x.price,
      id: index,
    })
  );

  const tablePropsInit = {
    columns: [
      { key: 'order', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      //{ key: 'column2', title: 'MÃ TB', dataType: DataType.String, style: {width: 70} },
      { key: 'name', title: 'TÊN TB', dataType: DataType.String, style: {width: 200} },
      { key: 'unit', title: 'ĐVT', dataType: DataType.String, style: {width: 50} },
      { key: 'quantity', title: 'SỐ LƯỢNG', dataType: DataType.String, style: {width: 100} },
      { key: 'price', title: 'ĐƠN GIÁ', dataType: DataType.Number, style: {width: 100} },
      { key: 'total', title: 'THÀNH TIỀN', dataType: DataType.Number, style: {width: 100} },
      { key: 'deleteColumn', title: '',  style: {width: 50, cursor: "pointer"}}
    ],
    loading: {
      enabled: false
    },
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 5, 
      position: PagingPosition.Bottom
    },
    data: dataArray,
    editableCells: [{
      columnKey: 'name',
      rowKeyValue: 'id',
    }],
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
  }, [devices])
  const dispatch = async (action) => {
    changeTableProps((prevState) => kaReducer(prevState, action));
  }
  return (
    <Table
      {...tableProps}
      childComponents={{
        ...bootstrapChildComponents,
        cellText: {
          content: (props) => {
            if (props.column.key === 'deleteColumn' && match.path == '/receipt/adddevice'){
              return <DeleteButton {...props} deleteEG={deleteEG} />
            }
          }
        },
        tableWrapper: {
          elementAttributes: () => ({ style: { maxHeight: 500 }})
        },
        noDataRow: {
          content: () => 'Trống'
        }
      }}
      dispatch={dispatch}
    />
  );
};


const mapDispatchToProps = dispatch => ({
  deleteEG: id => dispatch(deleteEquipmentGroup(id))
})

export default withRouter(connect(null, mapDispatchToProps)(DeviceTable));