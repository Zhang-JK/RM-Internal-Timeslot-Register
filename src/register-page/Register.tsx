import React from 'react';
import {Button, Form, InputNumber, Select, Space} from 'antd';
import {requestPost} from "../server/request";

interface Prop {
    data: []
    loading: boolean
    availableDays: string[]
    personId: number
    group: number
}

interface State {
    groupNum: number
    selectedDate: string
}

const { Option } = Select;
const groups = ['Group 1', 'Group 2', 'Group 3', 'Group 4'];

export default class Register extends React.Component<Prop, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            groupNum: -1,
            selectedDate: ""
        }
    }

    submit = (value: any) => {
        console.log(value)
        requestPost("register", {
            timeId: value.id,
            numJoin: value.num,
            groupNum: value.group,
            regId:1
        }).then(res => {
            console.log(res)
        })
    }

    dateChange = (value: string) => {
        this.setState({selectedDate: value})
    }

    render() {
        return (
            <div className='m-2 d-flex flex-column'>
                <h3 className="m-auto">Register</h3>
                {!this.props.loading &&
                <Form onFinish={this.submit}>
                    <Space className="m-3 d-flex flex-column">
                        <Form.Item name="date" label="Date">
                            <Select className="m-auto" placeholder="select date first" style={{width: 250}} onChange={this.dateChange}>
                                {this.props.availableDays.map(item => <Option value={item}> {item} </Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name="id" label="Time and Room">
                            <Select placeholder={'select time and room'} style={{ width: 250 }} >
                                {this.props.data.filter((item: any) => item.date === this.state.selectedDate).map((item: any) =>
                                    <Option value={item.id}>{`@${item.location} from ${item.startTime.substring(0, item.startTime.length-3)} to ${item.endTime.substring(0, item.startTime.length-3)}`}</Option>
                                )}
                            </Select>
                        </Form.Item>
                        <Form.Item name="group" label="Group">
                            <Select placeholder='select your group' style={{ width: 200 }} onChange={(value:number) => this.setState({groupNum: value})} >
                                {groups.map((item, index) => (
                                    <Option disabled={!(index+1===this.props.group)} value={index+1}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="num" label="Num of People">
                            <InputNumber style={{ width: 140 }} />
                        </Form.Item>
                        <Button className="m-3" htmlType="submit" type='primary'>Submit</Button>
                    </Space>
                </Form>
                }
            </div>
        )
    }
}