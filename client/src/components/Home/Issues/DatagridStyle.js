export const DatagridStyle = { 
    overflow:'scroll',
    borderBottom: 'none',
    zIndex:'0',
mx: 4, 
bgcolor: 'transparent', 
'& .MuiDataGrid-cell:hover': {
color: '#588B63',
},
'& .MuiDataGrid-cell:focus': {
  color: '#588B63',
  outline: 'none',
  },

'& .MuiDataGrid-columnHeaderTitle': {
  color: '#909090',
  fontWeight: 'light'
},
'& .MuiDataGrid-columnSeparator': {
    visibility: 'hidden'
},
'& .MuiDataGrid-cell': {
    overflow: 'scroll',
    border: 'none',
    outline: 'none',
    fontWeight: '400'
},

'& .MuiMenuItem-root': {
    backgroundColor: '#505050'
},
'& .MuiFormControl-root': {
    fontSize: '1.5em'
},
'& .css-o8va6p-MuiFormControl-root-MuiTextField-root-MuiDataGrid-toolbarQuickFilter .MuiSvgIcon-root': {
    color: '#808080'
},

'& .MuiDataGrid-footerContainer': {
  color: 'transparent',
  background: 'transparent',
  border: 'none'
}

}