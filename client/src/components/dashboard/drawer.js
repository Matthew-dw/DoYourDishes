import React from 'react';
import DrawerHouse from './drawerhouse'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'

const DrawerContent = props => {
    return (
        <div className='drawer'>
            <div className='drawer-top'>
                <div>
                <Icon onClick={props.toggle}>chevron_left </Icon >
                </div>
            </div>
            {props.houses.map((house, i) => {
                return (
                    <DrawerHouse 
                    house={house}
                    />
                )
            })}
        </div>
    )
}
export default DrawerContent;