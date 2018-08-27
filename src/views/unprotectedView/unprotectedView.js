import React, { Component } from 'react';
import {
    Notification, Delete, Container, CardHeaderTitle, CardContent, Select,
    CardHeader, Card, Columns, Column, Button, Field, Label, Control,
    Icon, Input, Help, Title, Box, Media, MediaContent, Subtitle, MediaRight, Image,
} from 'bloomer'
// import { getUserData } from '../../libraries/authentication'
import withRouter from '../../../node_modules/react-router-dom/withRouter';
import $ from 'jquery'

class UnprotectedView extends Component {
    // export default class UnprotectedView extends Component {
    state = {
        productName: '',
        userPageDatas: [],
        username: null,
        email: null,
        businessName: null,
        thisUser: null,
        stock: '',
        type: '',
        details: '',
        userProducts: [],
        // creatorId: getUserData().id,
        // postedBy: getUserData().username,
        // thisUser: getUserData().id,
        selectedFile: null,
        hideNewProductForm: false,
        selectedProduct: null,
        notificationVisible: false,
        error: ''
    }

    myReload = () => {
        const { profileUserID } = this.props.location.state
        // console.log('l ' + this.props.location.state)
        console.log('v ' + profileUserID)
        fetch('https://bushel44.herokuapp.com/api/users/' + profileUserID)
            .then(response => response.json())
            .then(data => {
                console.log('data: ' + JSON.stringify(data));
                console.log(this.state.userID);                
                this.setState({
                    ...this.state,
                    userPageDatas: JSON.stringify(data)
                    // username: data.username,
                    // firstName: data.first_name,
                    // lastName: data.last_name,
                    // businessName: data.business_name,
                    // email: data.email,
                    // userID: profileUserID
                })
                console.log('ud ' + this.state.userPageDatas);   
                // console.log(this.state.userPageDatas)
                // console.log(this.state.products[0].creatorId)
            })
            .catch(err => {
                this.setState({
                    ...this.state,
                    notificationVisible: false,
                    error: err
                })
            })

        $.ajax({
            method: "POST",
            url: "https://bushel44.herokuapp.com/api/myProducts",
            data:
                JSON.stringify({
                    thisUser: profileUserID
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((data) => {
                this.state.userProducts = data
                this.setState({ ...this.state, loading: false })
                this.setState({ ...this.state, hideResult: false })
            })
            .catch(err => {
                console.log('fail1')
                this.setState({
                    ...this.state,
                    loading: false,
                    error: err.message,
                    notificationVisible: true,
                    hideResult: false
                })
            })
    };

    componentDidMount() { 
        // const { profileUserID } = this.props.location.state
        // console.log('wtf ' + this.props.location.state)
        this.myReload()
    }


    hideNotification = () => {
        this.setState({ ...this.state, notificationVisible: false })
    }

    render() {
        if (!this.state.hideNewProductForm) {
            return (
                <Container>
                    <Columns isCentered>

                        <Notification isColor='danger' isHidden={!this.state.notificationVisible}>
                            {this.state.error}
                            <Delete onClick={this.hideNotification} />
                        </Notification>
                        <Column isSize={6}>
                        {this.state.userProducts.map((userProduct) => {
                            <Card>
                                <CardContent>
                                    {/* {this.state.userPageDatas.map(userPageData => {
                                        return (
                                            <Media>
                                                {/* key={thisUserPageData.toString()} */}
                                    <Title isSize={4}>{this.state.username}</Title>
                                    <Label>

                                        {/* <li>Details: <a>{this.state.username}</h\   > </li> */}
                                        <Subtitle isSize={6}><b>Email:</b> {this.state.email} <br />
                                            <b>Business:</b> {this.state.businessName} </Subtitle>
                                    </Label>
                                </CardContent>
                            </Card>
                                    })}
                        </Column>

                    </Columns>
               
                    <Columns isCentered>
                        <Column isSize={6}>
                        <Title isSize={6}>{this.state.username}'s Products</Title>
                            <Card>
                                <CardContent>
                                    {this.state.userProducts.map((userProduct) => {
                                        return (
                                            <Media key={userProduct.toString()}>
                                                <MediaContent>
                                                    <Title isSize={4}>{`${userProduct.productName}`}</Title>
                                                    <Label>
                                                        <ul>
                                                            <li>Quantity:{userProduct.stock} </li>
                                                            <li>Type: {userProduct.type} </li>
                                                            <li>User: {userProduct.id} </li>
                                                            <li>Details: {userProduct.details} </li>
                                                        </ul>
                                                    </Label>
                                                </MediaContent>
                                                <MediaRight>
                                                    <Image isSize='300x150' src='http://via.placeholder.com/350x150' />
                                                </MediaRight>

                                                {/* <Delete  isLoading={this.state.loading} onClick={e => this.onItemsSelect(myProduct)}/> */}
                                            </Media>
                                        )
                                    })}

                                </CardContent>
                            </Card>
                        </Column>

                    </Columns>
                </Container>
            )
        } else {
            return (
                <Container>
                    <Box>
                        <Title>Product Posted!</Title>
                    </Box>
                </Container>
            )
        }
    }
}

export default withRouter(UnprotectedView)