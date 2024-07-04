import React from 'react';
// import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Search, Inject } from '@syncfusion/ej2-react-grids';
import {Header} from "../components";
import {useStateContext} from "../contexts/ContextProvider";
import {employeesData, employeesGrid} from "../data/dummy";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

export const Employees = () => {
  const {currentColor, activeMenu} = useStateContext();
  const employeesCol = employeesGrid.map((eachHeader,index)=>({
    key: index,
    field: eachHeader.field,
    headerName: eachHeader.headerText,
    width: parseInt(eachHeader.width),
    editable: true,
    headerAlign: (eachHeader.textAlign).toLowerCase(),
    align: 'center',
    renderCell: eachHeader.field==="Employee"? (params) => (
      <img src={params.value} alt="Employee" 
      style={{ width: '40px', height: '40', borderRadius:'50%',  display: 'flex', margin: '0 auto', marginTop: '5px'}} />): null
  }));

  const employeesRow = employeesData.map((eachData, index)=>({
    key: (parseInt(eachData.EmployeeID)+index*2),
    id: parseInt(eachData.EmployeeID)+index*2,
    Name: eachData.Name,
    Title: eachData.Title,
    HireDate: eachData.HireDate,
    Country: eachData.Country,
    ReportsTo: eachData.ReportsTo,
    Employee: eachData.EmployeeImage
  }));

  return (
      <div className={`m-2 ${activeMenu? 'max-w-4xl':'max-5xl'} md:m-10 mt-24 bg-white rounded-xl overflow-hidden`}>
        <Header category='Page' title='Employees'/>
        <Box sx={{ height: 650, width: '100%'}}>
          <DataGrid
            columns={employeesCol}
            rows={employeesRow}
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




// export const Employees = () => {
//     return (
//         <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-hidden">
//           <Header category="Page" title="Employees" />
//           <GridComponent
//             className="overflow-hidden"
//             id="gridcomp"
//             dataSource={employeesData}
//             allowPaging
//             allowSorting
//             toolbar={['Search']}
//             width="auto"
//           >
//             <ColumnsDirective className="border-2 border-red">
//               {/* eslint-disable-next-line react/jsx-props-no-spreading */}
//               {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
//             </ColumnsDirective>
//             <Inject services={[Page, Search, Toolbar]} />
//           </GridComponent>
//         </div>
//       );
// }
