import React, { Component } from 'react';
import CustomerService from './CustomerService';

const customerService = new CustomerService();

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            nextPageUrl: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        var self = this;
        customerService.getCustomers().then(function (result) {
            console.log('server result:', result);
            self.setState({ customers: result.data, nextPageUrl: result.nextlink })
        });
    }

    handleDelete(e, pk) {
        var self = this;
        customerService.deleteCustomer({ pk: pk }).then(() => {
            console.log('delete customer key:', pk);

            var newArr = self.state.customers.filter(function (obj) {
                return obj.pk != pk;
            });
            self.setState({ customers: newArr })
        });
    }

    nextPage() {
        var self = this;
        customerService.getCustomersByUrl(this.state.nextPageUrl).then((result) => {
            self.setState({ customers: result.data, nextPageUrl: result.nextlink })
        });
    }

    render() {
        return (
            <div className="customer-list">
                <table className="table">
                    <thead key="thead">
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Desciption</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customers.map(customer =>
                            <tr key={customer.pk}>
                                <td>{customer.pk} </td>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.email}</td>
                                <td>{customer.address}</td>
                                <td>{customer.description}</td>
                                <td>
                                    <button onClick={(e) => this.handleDelete(e, customer.pk)}>Delete</button>
                                    <a href={"/customer/" + customer.pk}>Update</a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={this.nextPage}>Next</button>
            </div>
        )
    }
}

export default CustomerList;
