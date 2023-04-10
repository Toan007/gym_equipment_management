import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { search } from 'ka-table/actionCreators';
import DatePicker from '../date-picker/date-picker.component';

import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';
import moment from 'moment';

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
      className: `page-item btn-group ${(isActive ? 'active' : '')}`
    }),
    content: ({ text }) => <div className='page-link btn-group'>{text}</div>
  },
  pagingPages: {
    elementAttributes: () => ({
      className: 'pagination'
    }),
  }
}

const RecordTable = ({ records }) => {
  // console.log('record 2', records)
  const now = new Date()
  const [fDate, setDate] = useState({ start: '', end:  new Date().toString()})
  const handleChange = event => {
    const { value, name } = event.target;

    setDate({ ...fDate, [name]: value });
  }

  const startTime = fDate.start === '' ? 0 : Number(new Date(fDate.start).getTime()) 
  const endTime =  Number(new Date(fDate.end).getTime())
  // console.log("recoerd", records)
  // console.log(Number(new Date(records[0]?.date).getTime()))
  const data =  records.filter((x) => {
    // console.log(Number(new Date(x?.date).getTime()) >= startTime && Number(new Date(x?.date).getTime()) <= endTime)
    return (Number(new Date(x?.date).getTime()) >= startTime && Number(new Date(x?.date).getTime()) <= endTime)
  })
  // console.log(data)
  const dataArray = data.map(
    (x, index) => ({
      order: `${index + 1}`,
      staffName: `${x.staffFirstName} ${x.staffLastName}`,
      staffId: x.accountId,
      act: x.action,
      date: moment(x.date).format("DD-MM-yyyy HH:mm:ss"),
      id: x.id,
    })
  );

  const tablePropsInit = {
    columns: [
      { key: 'order', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'staffName', title: 'TÊN NHÂN VIÊN', dataType: DataType.String, style: {width: 200} },
      { key: 'staffId', title: 'MÃ TÀI KHOẢN', dataType: DataType.String, style: {width: 150} },
      { key: 'act', title: 'HÀNH ĐỘNG', dataType: DataType.String, style: {width: 150} },
      { key: 'date', title: 'NGÀY', dataType: DataType.String, style: {width: 200} }
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
    format: ({ column, value }) => {
      if (column.dataType === DataType.Date){
        return value && value.toLocaleString('en-GB');
      }
    },
  };
  
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  useEffect(() => {
    changeTableProps({
      ...tableProps,
      data: dataArray,
      loading: true
    })   
    // console.log('tableProps', tableProps)
  }, [records, fDate])
  const dispatch = action => {
    changeTableProps(prevState => kaReducer(prevState, action));
  };

  return (
    <div>
      <div className="search-filter">
        <DatePicker value={fDate} name="start" handleChange={handleChange} />
        <input type='search' defaultValue={tableProps.searchText} onChange={(event) => {
          dispatch(search(event.currentTarget.value));
        }} className='search' placeholder="tìm kiếm"/>
      </div>
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={{
          ...bootstrapChildComponents,
          noDataRow: {
            content: () => 'No Data Found'
          },
          tableWrapper: {
            elementAttributes: () => ({ style: { maxHeight: 500 }})
          }
        }}
      />
    </div>
  );
};

const mapStateToProps =({ user }) => ({
  user: user.currentUser
})

export default withRouter(connect(mapStateToProps)(RecordTable));