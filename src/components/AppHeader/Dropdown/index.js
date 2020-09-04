import React from 'react'
import styled from 'styled-components'
import data from './health-data-icon.png'
import schedule from './schedule-icon.png'
import setting from './setting-icon.png'

const DropDownMenu = styled.div`
display:none;
background-color: #789fec;
border-bottom-right-radius:8px;
padding: 4px;

.navigation-menu li{
    display:flex;
    flex-direction:row;
    align-items: center;
    padding: 8px;
}

.navigation-menu li *{
    display: block;
}

.navigation-menu li:not(:last-child){
    border-bottom: 0.5px solid #96c2f1;
}

.navigation-menu a{
    color: #fff;
    font-size:16px;
    margin-left: 8px;
}

.navigation-menu img{
    width: 20px;
}

`

export default function Dropdown() {
    return (
        <DropDownMenu>
            <ul className="navigation-menu">
                <li><img src={data} alt="data"/><a>health data</a></li>
                <li><img src={schedule} alt="schedule"/><a>schedule</a></li>
                <li><img src={setting} alt="setting"/><a>setting</a></li>
            </ul>
        </DropDownMenu>
    )
}
