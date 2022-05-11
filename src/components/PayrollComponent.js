import React from 'react';
import {Card,CardTitle,CardText,Col,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoadingComponent} from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';



function RenderListPayrollOfStaffs({staff}){

    const basicSalary = 3000000;
    const overTimeSalary = 200000;
    const salary = (parseFloat(staff.salaryScale) * basicSalary) + (parseFloat(staff.overTime) * overTimeSalary);

    return(
    <FadeTransform in transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
        <Card key={staff.id}>
            <CardTitle>{staff.name}</CardTitle>
            <CardText>Mã nhân viên: {staff.id}</CardText>
            <CardText>Hệ số lương: {staff.salaryScale}</CardText>
            <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
            <input type={"text"} disabled value={"Lương: " + salary.toFixed(0)}/>  

        </Card>
    </FadeTransform>
    );
}

export default function PayrollComponent(props) {
    console.log( "payroll : ",props.payroll);

    const payrollOfStaffs = props.payroll.map((payroll) =>{

        return(
            <Col className="col-12 col-md-6 col-lg-4 mt-3">
                <RenderListPayrollOfStaffs staff={payroll}/>
            </Col>
        );

    });


    if(props.salaryLoading){
        return(
            <div className="container">
                <div className="row">
                    <LoadingComponent/>
                </div>
            </div>
        );
    }
    else if(props.salaryErrMess){
        return(
            <div className="container">
                <div className="row">
                     <h4>{props.salaryErrMess}</h4>
                </div>
            </div>
        );
    }
    
  return(
      <div className='container mt-3'>
        <div className="col-12">
            <h3>Bảng Lương</h3>
            <hr/>
        </div>
        <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/nhanvien'>Nhân Viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
        <div className='row mb-3'>
            {payrollOfStaffs}
        </div>
      </div>
  );
}
