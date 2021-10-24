import React from 'react';
import {Button, DatePicker, Select, Space} from 'antd';
import nameJSON from "../assets/name.json";

interface State {
    groupNum: number
}

const { Option } = Select;
const array = [16, 17, 18, 19, 20, 21]
const groups = ['Group 1', 'Group 2', 'Group 3', 'Group 4'];

function onChange(value: any, dateString: any) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
}

function onOk(value: any) {
    console.log('onOk: ', value);
}

export default class Register extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            groupNum: -1
        }
    }

    render() {
        return (
            <div className='m-2 d-flex flex-column'>
                <div>Register Info</div>
                <Space>
                    <DatePicker onChange={onChange} onOk={onOk}/>
                    {/*<TimePicker.RangePicker disabledHours={()=>{return [16, 17, 18, 19, 20]}} format={'HH:mm'} hourStep={1} minuteStep={30} onChange={onChange} onOk={onOk}/>*/}
                    <Select placeholder={'select a time slot'} style={{ width: 200 }} >
                        {array.map( (value, index) => {
                            return (<Option value={index}>{value+' to '+(value+1)}</Option>)
                        })}
                    </Select>
                </Space>
                <Space>
                    <Select style={{ width: 120 }} onChange={(value:number) => this.setState({groupNum: value})} >
                        {groups.map((item, index) => (
                            <Option value={index}>{item}</Option>
                        ))}
                    </Select>
                    <Select style={{ width: 120 }}>
                        {/* eslint-disable-next-line array-callback-return */}
                        {nameJSON.names.map(item => {
                            if (this.state.groupNum !== -1)
                                return <Option
                                    value={item[this.state.groupNum].itsc}>{item[this.state.groupNum].name}</Option>
                        })}
                    </Select>
                </Space>
                <Space>
                    <Button type='primary'>Submit</Button>
                </Space>
            </div>
        )
    }
}