import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'


export default function User() {
 
  return (
    <Dropdown trigger={<Icon name='user' size='large' />} pointing='top left' icon={null}>
      <Dropdown.Menu>
        <Dropdown.Item text='Profile' icon='user' />
        <Dropdown.Item text='Logout' icon='power' />
      </Dropdown.Menu>
    </Dropdown>
  )

}
