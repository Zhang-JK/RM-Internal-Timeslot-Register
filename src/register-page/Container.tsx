import {Card, PageHeader, Typography} from 'antd';
import React from 'react';
import Register from "./Register";
import logo from "../assets/logo.png"
import RegisterInfo from "./RegisterInfo";

export default class Container extends React.Component {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props)

    }

    render() {
        return (
            <div style={{background: '#66BAB7'}}>
                <PageHeader>
                    <Card>
                        <Typography.Title level={2} style={{textAlign: 'center'}}>
                            <div className="d-flex flex-column justify-content-center">
                                <img className="m-auto" src={logo} width={189} height={141} alt="logo"/>
                                <h2>HKUST RoboMaster Team</h2>
                                <h5 className="m-1">Internal development register</h5>
                            </div>
                        </Typography.Title>
                    </Card>
                </PageHeader>

                <Card className="m-3">
                    <RegisterInfo />
                </Card>

                <Card className="m-3">
                    <Register/>
                </Card>
            </div>
        )
    }
}