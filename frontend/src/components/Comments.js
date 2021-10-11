import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


function Comments(props) {
    const { firstName, lastName, content } = props
    return ( 
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} style={{}}>
                <ListItem style={{backgroundColor: 'rgba(59, 130, 242, .1)', width: '151%', marginBottom: '10px'}}>
                <ListItemAvatar>
                  <Avatar>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${firstName} ${lastName}`} secondary={
                  <React.Fragment>
                    <Typography>
                     {content}
                    </Typography>
                  </React.Fragment>
                } />
              </ListItem> 
        </List>
        </>
     );
}

export default Comments;
