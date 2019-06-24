import React from 'react'
import axios from 'axios'
import c from './../../../../Constants'
import Toast from 'react-native-simple-toast'

import ServiceAssign from './ServiceAssign'

class ServiceAssignContainer extends React.Component {

    constructor(props) {
        super(props)
        let id = '', serviceID = '', executiveInfo = {}, serviceStatus = {}, remark = '', appointmentTime ='';

        //if formtype is update then you need to pass the product
        if (props.service) {
            id = props.service.id
            serviceID = props.service.serviceID,
            executiveInfo = props.service.executiveInfo,
            serviceStatus = props.service.serviceStatus,
            remark = props.service.remark,
            appointmentTime = props.service.appointmentTime
        }

        this.state = {
            //executiveInfo has array object of all executive
            //serviceStatus has array object of services
            id , serviceID , executiveInfo , serviceStatus , remark , appointmentTime ,
            state: -1, // 0 or 1 (1 means success, 0 means error)
        }
    }

    componentDidMount() {
        this.getExecutivesDetails()
        this.getStatuses()
    }

    onChange = (name, value) => {
        this.setState({ [name]: value })
    }

    getExecutivesDetails = async () => {
        try {
            const res =  await axios.post(`${C.API}/users/get`,{role_id:C.EXECUTIVE_ROLE_ID});
            if (res.data.success) { this.setState({ executiveInfo: res.data.data })}
        } catch (e) {}
    }
    getStatuses = async () => {
        try {
            const res =  await axios.post(`${C.API}/service_status/get`);
            if (res.data.success) { this.setState({ serviceStatus: res.data.data })}
        } catch (e) {}
    }

    /**
     * Service assign related functions
     */
    assignService = async () => {
        const service = {
            service_id: this.state.serviceID,
            assigned_to: this.state.executiveInfo.id,
            admin_remark: this.state.remark,
            appointment_time: this.state.appointmentTime,
            job_status: this.state.serviceStatus.id
        }
        try {
            const res = await axios.post(`${c.API}/service_details`, service)
            if (res.data.success) this.setState({ id = '', serviceID = '', executiveInfo = {}, serviceStatus = {}, remark = '', appointmentTime ='', state: 1})
            else Toast.show("Service Assigned Successfully!")
        } catch (e) {
            console.warn(e)
            Toast.show("Something went wrong!")
        }
    }

    //to be done
    updateProduct = async () => {
        const product = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            type_id: this.state.type.id
        }
        try {
            const res = await axios.post(`${c.API}/products/update`, product)
            if (res.data.success){
                Toast.show("Product Updated")
                this.setState({ message: 'Product updates successfully', state: 1})
            }
            else{
                this.setState({ message: res.data.message, state: 0})
            }
        } catch (e) {
            this.setState({ message: 'something went wrong', state: 0})
        }
    }

    render() {
        return <EditProduct
            formtype={this.props.formtype}

            //product fields
            name={this.state.name}
            description={this.state.description}
            type={this.state.type}

            types={this.state.types}
            
            //form message
            message={this.state.message}
            state={this.state.state}

            //functions
            onChange={this.onChange}
            assignService={this.assignService}
            updateProduct={this.updateProduct}
        />
    }
}

export default EditProductContainer