import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class CustomerServer {
    constructor() { }

    /**
     * Get first page of customers.
     */
    getCustomers() {
        const url = '${API_URL}/api/customers';
        return axios.get(url).then(response => response.data);
    }

    /**
     * Get customers by URL.
     * @param {link} link such as /api/customers/?page=2.
     */
    getCustomersByUrl(link) {
        const url = '${API_URL}${link}';
        return axios.get(url).then(response => response.data);
    }

    /**
     * Get a customer by primary key.
     * @param {pk} customer primary key.
     */
    getCustomer(pk) {
        const url = '${API_URL}/api/customers/${pk}'
        return axios.get(url).then(response => response.data);
    }

    /**
     * Delete a customer.
     * @param {customer} customer.
     */
    deleteCustomer(customer) {
        const url = '${API_URL}/api/customers/${customer.pk}';
        return axios.delete(url);
    }

    /**
     * Create a customer.
     * @param {customer} customer.
     */
    createCustomer(customer) {
        const url = '${API_URL}/api/customers/';
        return axios.post(url, customer);
    }

    /**
     * Update a customer.
     * @param {customer} customer.
     */
    updateCustomer(customer) {
        const url = '${API_URL}/api/customers/${customer.pk}';
        return axios.put(url, customer);
    }

}