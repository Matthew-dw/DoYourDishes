import React from 'react'
import Typography from '@material-ui/core/Typography'

const DrawerHouse = props => {
    const house = props.house;
    return (
        <div>
            <Typography>{house.name}</Typography>
        </div>
    )
}
export default DrawerHouse;