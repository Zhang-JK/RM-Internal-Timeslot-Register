import {Button, Form, Input } from 'antd';
import React from 'react';
import {request} from "../server/request";

interface Prop {
    successCallback: Function
}

declare const ValidateStatuses: ["success", "warning", "error", "validating", ""];
export declare type ValidateStatus = typeof ValidateStatuses[number];

interface State {
    username: string
    password: string
    // 0 not input -> 1 register -> 2 input password
    state: number
    validateStatus: ValidateStatus
    help: string
}

export default class Login extends React.Component<Prop, State> {
    constructor(prop: any) {
        super(prop);
        this.state = {
            username: "",
            password: "",
            state: 0,
            validateStatus: "",
            help: ""
        }
    }

    itscCheck = (values: any) => {
        this.setState({validateStatus: "validating"})
        if(this.state.state===0)
            request("login", {username: values["itsc"]})
                .then((res: any) => {
                    // console.log(res)
                    if(res['errorCode'] === "0000")
                        this.setState({state: 2, validateStatus: "", help: "", username: values["itsc"]})
                    else if(res['errorCode'] === "0103")
                        this.setState({state: 1, validateStatus: "", help: "At least 6 digits", username: values["itsc"]})
                    else if(res['errorCode'] === "0104")
                        this.setState({validateStatus: "error", help: "Your ITSC is NOT recorded in our database"})

                })
        else if(this.state.state===1) {
            const password = values["password"].split(" ").join("")
            if(password.length < 6) {
                this.setState({validateStatus: "error", help: "At least 6 digits"})
                return ;
            }
            request("signup", {username: this.state.username, password: password})
                .then((res: any) => {
                    // console.log(res)
                    if(res['errorCode'] === "0000")
                        this.props.successCallback(this.state.username, res.data.id)
                    else if(res['errorCode'] === "0101")
                        this.setState({state: 1, validateStatus: "error", help: "Already sign up"})
                })
        }
        else if(this.state.state===2) {
            const password = values["password"].split(" ").join("")
            request("passwordVerify", {username: this.state.username, password: password})
                .then((res: any) => {
                    console.log(res)
                    if(res['errorCode'] === "0000")
                        this.props.successCallback(this.state.username, res.data.id)
                    else if(res['errorCode'] === "0102")
                        this.setState({state: 1, validateStatus: "", help: "Wrong Password"})
                })
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.state===1?"Set your password":"Login"}</h2>
                <Form
                    name="form"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 5 }}
                    initialValues={{ remember: true }}
                    onFinish={this.itscCheck}
                    autoComplete="off"
                >
                    {this.state.state===0 &&
                    <Form.Item
                        validateStatus={this.state.validateStatus}
                        help={this.state.help}
                        hasFeedback
                        label="ITSC Email (with @connect.ust.hk)"
                        name="itsc"
                        rules={[{ required: true, message: 'Please input your ITSC!' }]}
                    >
                        <Input />
                    </Form.Item>
                    }

                    {this.state.state===1 &&
                    <Form.Item
                        validateStatus={this.state.validateStatus}
                        help={this.state.help}
                        hasFeedback
                        label="New Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    }

                    {this.state.state===2 &&
                    <Form.Item
                        validateStatus={this.state.validateStatus}
                        help={this.state.help}
                        hasFeedback
                        label="password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    }

                    <Form.Item style={{marginLeft: "78%"}}>
                        <Button type="primary" htmlType="submit">
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}