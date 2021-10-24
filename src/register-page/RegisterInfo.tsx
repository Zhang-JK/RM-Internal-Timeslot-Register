import React from 'react';
import {Calendar} from 'antd';

export default class RegisterInfo extends React.Component {
    render() {
        return (
            <div className='m-2 d-flex flex-column'>
                <h3 className="m-auto">Timetable</h3>
                <Calendar />
            </div>
        )
    }
}