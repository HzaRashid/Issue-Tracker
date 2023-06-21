
  
function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 4) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 12)) & 0xff;
      color += `00${value.toString(10)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name, width, height, fontSize) {
    return {
      sx: {
        bgcolor:    stringToColor(name),
        fontSize:   fontSize,
        color:      '#f0f0f0',
        width:      width, 
        height:     height,
        
  
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

export default stringAvatar