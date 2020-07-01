import React from 'react'
import SideSection from './Side'
import MainSection from './Main'

function View(props) {
    return (
        <div className="display">
            <SideSection events={props.list} isAct={props.isAct} />
            <MainSection />
        </div>
    )
}

export default View
