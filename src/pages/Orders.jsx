import React from 'react';
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import {useStateContext} from "../contexts/ContextProvider";
import { Header } from '../components';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

export const Orders = () => {
  const {currentColor} = useStateContext();
  const ordersCol = ordersGrid.map((eachHeader)=>({
    field: eachHeader.field,
    headerName: eachHeader.headerText,
    width: parseInt(eachHeader.width),
    editable: true,
    headerClassName: 'app-theme--header',
    headerAlign: (eachHeader.textAlign).toLowerCase(),
    align: 'center',
    renderCell: eachHeader.field==="ProductImage"? (params) => (
      <img src={params.value} alt="ProductImage" 
      style={{ width: '40px', height: '40', borderRadius:'50%',  display: 'flex', margin: '0 auto', marginTop: '5px'}} />): null
  })); 

  const ordersRow = ordersData.map((eachData, index)=>({
    id: (parseInt(eachData.OrderID)+index*2),
    CustomerName: eachData.CustomerName,
    TotalAmount: eachData.TotalAmount,
    OrderItems: eachData.OrderItems,
    Location: eachData.Location,
    Status: eachData.Status,
    OrderItems: eachData.OrderItems,
    ProductImage: eachData.ProductImage
  }));


  return (
      <div className={`m-2 md:m-10 mt-24 max-w-4xl bg-white rounded-xl overflow-hidden dark:bg-[#42464D]`}>
        <Header category='Page' title='Orders'/>
        <Box sx={{ height: 650, width: '100%'}}>
          <DataGrid
            columns={ordersCol}
            rows={ordersRow}
            autoPageSize
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: currentColor,
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
                '& .app-theme.pending': {
                  backgroundColor: 'rgba(157, 255, 118, 0.49)',
                  color: '#FB9678',
                  fontWeight: '600',
                },
                '& .app-theme.complete': {
                  backgroundColor: '#8BE78B',
                  color: 'white',
                  fontWeight: '600',
                },
                '& .app-theme.canceled': {
                  backgroundColor: '#FF5C8E',
                  color: '#1a3e72',
                  fontWeight: '600',
                },
                '& .app-theme.rejected': {
                  backgroundColor: 'red',
                  color: '#1a3e72',
                  fontWeight: '600',
                },
                '& .app-theme.active': {
                  backgroundColor: '#03C9D7',
                  color: '#1a3e72',
                  fontWeight: '600',
                },
              }}
          />
        </Box>
      </div>
    );
  
};
// export default Orders;


//sync
// const editing = { allowDeleting: true, allowEditing: true };
//   return (
//     <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-hidden">
//       <Header category="Page" title="Orders" />
//       <GridComponent
//         className="overflow-hidden"
//         id="gridcomp"
//         dataSource={ordersData}
//         allowPaging
//         allowSorting
//         allowExcelExport
//         allowPdfExport
//         // contextMenuItems={contextMenuItems}
//         editSettings={editing}
//       >
//         <ColumnsDirective className="border-2 border-red">
//           {/* eslint-disable-next-line react/jsx-props-no-spreading */}
//           {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
//         </ColumnsDirective>
//         <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
//       </GridComponent>
//     </div>
//   );