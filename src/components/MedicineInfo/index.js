import React from 'react'
import styled from 'styled-components'
import close from './images/close.png'
import medicine from './images/medicine.png'
import body from './images/body-outline.png'
import lung from './images/lung.png'
import medicine1 from './images/medicine1.jpg'
import medicine2 from './images/medicine2.jpg'
import clock from './images/clock.png'
import rashes from './images/rashes.png'
import dizziness from './images/dizziness.png'
import smoke from './images/smoke.png'
import children from './images/children.png'

const MediInfo = styled.div`
border:1px solid #c4c4c4;
border-bottom-left-radius:4px;
border-bottom-right-radius:4px;
width:96%;
margin: 20px 2%;
font-size:20px;

.medicine-infomation{
    background-color: #B2B2B2;
    padding: 20px 2.2%;
    width:96%;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    color: #fff;
    box-shadow:0px 2px 5px -2px #000;
}

.medicine-infomation div{
    margin-left:5%;
}

.medicine-infomation img{
    width: 20px;
    margin-right:5%;
}
`

const InfoCard = styled.div`
    margin: 10px 2%;
    padding: 10px 2%;
    width:91%;
    border:1px solid #c4c4c4;
    box-shadow:0px 1px 3px -1px #000;
    font-size:16px;

.intro-name{
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    margin-bottom:12px;
}

.intro-name>div{
    margin-left:12px;
}

.medi-name div:first-child{
    font-size:18px;
    margin-bottom:4px;
    margin-left:4px;
}

.medi-name div:last-child{
    font-size:14px;
    margin-left:4px;
}

.intro-name img{
    width: 40px;
    margin-right:2px;
}

.intro-img{
    margin-bottom: 8px;
}

.intro-img img{
    width:49.5%;
    height:120px;
}

.intro-img>img:first-child{
    margin-right:1%;
}
`

const InfoCardHori = styled.div`
/* background-color: #c4c4c4; */
margin: 10px 0% 10px 2%;
width: 98%;
font-size:16px;
display:flex;
flex-direction:row;
justify-content:flex-start;
align-items:center;

.hori-card{
    width: 47%;
    height:220px;
    margin-right:2%;
    border:1px solid #c4c4c4;
    box-shadow:0px 1px 3px -1px #000;
}

.hori-card>div:first-child{
    margin: 12px;
    border-bottom: 0.5px solid #d3d3d3;
    box-shadow:0px 1px 1px -1px #ccc;
}

.hori-card>div:last-child{
    /* background-color:#f00; */
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
}

.body-outline{
    width:70px;
}

.effect-position{
    width:20px;
    position:relative;
    top:-150px;
}
`

export default function MedicineInfo() {
    return (
        <MediInfo>
            <div className="medicine-infomation">
                <div>medicine infomation</div>
                <img src={close} alt="close" />
            </div>
            <InfoCard>
                <div className="intro-name">
                    <div><img src={medicine} alt="medicine icon" /></div>
                    <div className="medi-name">
                        <div>Medicine name</div>
                        <div>brief intro</div>
                    </div>
                </div>
                <div className="intro-img">
                    <img src={medicine1} alt="medicine1" />
                    <img src={medicine2} alt="medicine2" />
                </div>
                <div>introduction.Lorem ipsum dolor sit amet, mei albucius iracundia et.</div>
            </InfoCard>
            <InfoCardHori>
                <div className="hori-card">
                    <div>Time to take</div>
                    <div><img src={clock} alt="clock" /></div>
                </div>
                <div className="hori-card">
                    <div>Effect</div>
                    <div><img className="body-outline" src={body} alt="body" /><img className="effect-position" src={lung} alt="lung" /></div>
                </div>
            </InfoCardHori>
            <InfoCard>
                <div>Warning</div>
                <div><img src={smoke} alt="smoke" /></div>
                <div><img src={children} alt="children" /></div>
            </InfoCard>
            <InfoCard>
                <div>Side Effect</div>
                <div><img src={rashes} alt="rashes" /></div>
                <div><img src={dizziness} alt="dizziness" /></div>
            </InfoCard>
        </MediInfo>
    )
}

