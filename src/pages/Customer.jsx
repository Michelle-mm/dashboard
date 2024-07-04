import React from 'react';
// import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {useStateContext} from "../contexts/ContextProvider";


export const Customer = () => {
  const {currentColor} = useStateContext();
  const customersCol = customersGrid.map((eachHeader, index)=>({
    key: index,
    field: eachHeader.field,
    headerName: eachHeader.headerText,
    width: parseInt(eachHeader.width),
    editable: true,
    headerAlign: eachHeader.textAlign?(eachHeader.textAlign).toLowerCase():null,
    format: eachHeader.format? eachHeader.format: null,
    align: 'center',
    renderCell: eachHeader.field==="CustomerImage"? (params) => (
      <img src={params.value} alt="CustomerImage" 
      style={{ width: '40px', height: '40', borderRadius:'50%',  display: 'flex', margin: '0 auto', marginTop: '5px'}} />): null
  }));

  const customersRow = customersData.map((eachData, index)=>({
    key:(parseInt(eachData.CustomerID)+index*2),
    id: eachData.CustomerID,
    Name: eachData.CustomerName,
    CustomerImage: eachData.CustomerImage,
    CustomerEmail: eachData.CustomerEmail,
    ProjectName: eachData.ProjectName,
    Status: eachData.Status,
    Weeks: eachData.Weeks,
    Budget: eachData.Budget,
    Location: eachData.Location
  }));


  return (
      <div className="m-2 md:m-10 mt-24 bg-white rounded-xl overflow-hidden">
        <Header category='Page' title='Customers'/>
        <Box sx={{ height: 650, width: '100%', maxWidth: 900}}>
          <DataGrid
            columns={customersCol}
            rows={customersRow}
            sx={{boxShadow: 2,
                border: 2,  
                borderColor: currentColor
            }}
            autoPageSize
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    );
}
