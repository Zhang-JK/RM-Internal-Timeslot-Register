import React from 'react';
import {Button, DatePicker, Select, Space} from 'antd';
import nameJSON from "../assets/name.json";

interface State {
    groupNum: number
}

const { Option } = Select;
const array = [16, 17, 18, 19, 20, 21]
const groups = ['Group 1', 'Group 2', 'Group 3', 'Group 4'];

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
                <h3 className="m-auto">Register</h3>
                <Space className="m-3 d-flex flex-column">
                    <DatePicker style={{ width: 250 }} />
                    {/*<TimePicker.RangePicker disabledHours={()=>{return [16, 17, 18, 19, 20]}} format={'HH:mm'} hourStep={1} minuteStep={30} onChange={onChange} onOk={onOk}/>*/}
                    <Select placeholder={'select a time slot'} style={{ width: 250 }} >
                        {array.map( (value, index) => {
                            return (<Option value={index}>{value+' to '+(value+1)}</Option>)
                        })}
                    </Select>
                    <Select style={{ width: 200 }} onChange={(value:number) => this.setState({groupNum: value})} >
                        {groups.map((item, index) => (
                            <Option value={index}>{item}</Option>
                        ))}
                    </Select>
                    <Select style={{ width: 200 }}>
                        {/* eslint-disable-next-line array-callback-return */}
                        {this.state.groupNum !== -1 && nameJSON.names[this.state.groupNum].map(item =>
                                <Option value={item.itsc}>{item.name}</Option>
                        )}
                    </Select>
                    <Button className="m-3" type='primary'>Submit</Button>
                </Space>
            </div>
        )
    }
}