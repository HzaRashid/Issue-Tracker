export const theme = {
    typography: {
     "fontFamily": `"Lato", sans-serif`,
     "fontSize": 14.5,
     "fontWeightLight": 400,
     "fontWeightRegular": 300,
     "fontWeightMedium": 400
    },
    palette: {
      primary: {
        main: '#7895B3',
          },
        role: {
          main: '#00000020',
          contrastText: '#000000',
        },
        projects: {
            main: '#00000020',
            contrastText: '#000000',
          },
      },
  
    components: {
      MuiDataGrid: {
          styleOverrides: {
              root: {
                  border: 'none'
              }
          }
      }
  }
  
  }