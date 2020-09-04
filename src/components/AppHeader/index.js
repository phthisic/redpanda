import React from 'react'
import styled from 'styled-components'
import Dropdown from './Dropdown'
import navigation from './burger.png'
import scan from './scan-icon.png'

const SectionTitle = styled.div`
width: 100%;
background-color: #789fec;
padding: 8px 0;
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
box-shadow:0px 5px 10px -5px #000;

.nav-icon{
    width:24px;
    margin-left:5%;
}

.nav-icon:hover+div{
    display:block;
    position: absolute;
    top: 40px;
    left:0px;
}

.scan-icon{
    width:24px;
    margin-right:5%;
}

.section-title{
    font-size: 20px;
    color:white;
}

.scan-icon img,.nav-icon img{
    width:100%;
}
    `

export default function AppHeader() {
    return (
        <div>
            <SectionTitle>
                <a className="nav-icon">
                    <img src={navigation} alt="navigation" />
                </a>
                <Dropdown />
                <div className="section-title">SectionTitle</div>
                <div className="scan-icon">
                    <img src={scan} alt="scan" />
                </div>
            </SectionTitle>
        </div>

    )
}

