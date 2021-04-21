import React from 'react'
import Card from '../../components/Card'
import CardContent from '../../components/CardContent'
import CardTitle from '../../components/CardTitle'
// import MainContainer from '../../components/MainContainer'
// import MinHeight from '../../components/MinHeight'
import BridgePage from './Bridge'
function Bridge() {
  return (
    // // <MainContainer>
    //   <Card>
    //     {/* <MinHeight> */}

    //     {/* </MinHeight> */}
    //   </Card>
    // // </MainContainer>
    <CardContent>
      <CardTitle text="Bridge" />
      <BridgePage />
    </CardContent>
  )
}

export default Bridge
